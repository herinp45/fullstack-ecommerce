from flask import Blueprint, request, jsonify
from PIL import Image
from io import BytesIO
import numpy as np
import base64
import torch

from model import model, transform

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('api/v1/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400
    file = request.files['image']
    img = Image.open(file.stream).convert('RGB')

    #Extract features
    img_tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        features = model(img_tensor).squeeze().numpy()

    #Convert to base64
    buffer = BytesIO()
    img.save(buffer, format="JPEG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode()
    return jsonify({
        'vector': features.tolist(),
        'preview': f"data:image/jpeg;base64,{img_base64}"
    }), 200

