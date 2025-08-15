import torch
from flask import Blueprint, request, jsonify
from PIL import Image
import faiss
import pickle
import numpy as np
import os

from model import get_model_and_transform

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(BASE_DIR, "embeddings", "index.faiss")
OPEN_PATH = os.path.join(BASE_DIR, "embeddings", "ids.pkl")

search_bp = Blueprint('search', __name__)



# Force CPU
device = torch.device("cpu")

# Load model + transform
model, transform = get_model_and_transform()
model = model.to(device)
model.eval()

# Load FAISS index + product IDs
index = faiss.read_index(INDEX_PATH)
with open(OPEN_PATH, "rb") as f:
    product_ids = pickle.load(f)

@search_bp.route("/search-image", methods=["POST"])
def search_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    img = Image.open(file.stream).convert("RGB")

    input_tensor = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        vector_tensor = model(input_tensor).squeeze().cpu()

    vector = vector_tensor.numpy().astype('float32')

    expected_dim = index.d  # get dimension from index dynamically

    if vector.shape != (expected_dim,):
        return jsonify({"error": f"Invalid query vector shape, expected {(expected_dim,)}"}), 400

    if vector.dtype != np.float32:
        return jsonify({"error": "Invalid query vector dtype, expected float32"}), 400

    try:
        D, I = index.search(np.expand_dims(vector, axis=0), 1)  # search top 1 result
    except AssertionError as e:
        return jsonify({"error": "Search vector dimension mismatch"}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error during search"}), 500

    result = product_ids[I[0][0]] if I.size > 0 else None


    return jsonify({"result": result})
