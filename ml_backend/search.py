# search.py

from flask import Blueprint, request, jsonify
from PIL import Image
from io import BytesIO
import torch
import faiss
import pickle
import numpy as np

from model import model, transform
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(BASE_DIR, "embeddings", "index.faiss")
OPEN_PATH = os.path.join(BASE_DIR, "embeddings", "ids.pkl")


search_bp = Blueprint('search', __name__)

# Load FAISS index and product paths
index = faiss.read_index(INDEX_PATH)
with open(OPEN_PATH, "rb") as f:
    product_ids = pickle.load(f)

@search_bp.route("/search-image", methods=["POST"])
def search_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    img = Image.open(file.stream).convert("RGB")

    input_tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        vector = model(input_tensor).squeeze().numpy().astype('float32')

    # Run FAISS search
    D, I = index.search(np.expand_dims(vector, axis=0), k=5)
    results = [product_ids[i] for i in I[0]]

    return jsonify({"results": results})
