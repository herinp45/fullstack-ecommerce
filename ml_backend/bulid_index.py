
import faiss
import pickle
import torch
import numpy as np
from PIL import Image
import os
from model import get_model_and_transform

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # path to current file
product_dir = os.path.join(BASE_DIR, 'static')

image_paths = [os.path.join(product_dir, f) for f in os.listdir(product_dir) if f.endswith('.jpg')]

vectors = []
ids = []

model, transform = get_model_and_transform()  # Get the model and transform once

for path in image_paths:
    img = Image.open(path).convert("RGB")
    input_tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        vec = model(input_tensor).squeeze().numpy()
    vectors.append(vec)
    ids.append(path)

vectors_np = np.vstack(vectors).astype('float32')

index = faiss.IndexFlatL2(vectors_np.shape[1])  # dimension from data
index.add(vectors_np)

os.makedirs("embeddings", exist_ok=True)
faiss.write_index(index, "embeddings/index.faiss")

with open("embeddings/ids.pkl", "wb") as f:
    pickle.dump(ids, f)

print("✅ FAISS index built and saved.")