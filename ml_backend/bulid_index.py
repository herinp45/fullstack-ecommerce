
import os
import faiss
import pickle
import torch
import numpy as np
from PIL import Image
from model import model, transform

product_dir = "static"
image_paths = [os.path.join(product_dir, f) for f in os.listdir(product_dir) if f.endswith('.jpg')]

vectors = []
ids = []

for path in image_paths:
    img = Image.open(path).convert("RGB")
    input_tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        vec = model(input_tensor).squeeze().numpy()
    vectors.append(vec)
    ids.append(path)

# Convert to float32 (required by FAISS)
vectors_np = np.vstack(vectors).astype('float32')

# Build FAISS index
index = faiss.IndexFlatL2(2048)
index.add(vectors_np)

# Save index and ID map
os.makedirs("embeddings", exist_ok=True)
faiss.write_index(index, "embeddings/index.faiss")
with open("embeddings/ids.pkl", "wb") as f:
    pickle.dump(ids, f)


