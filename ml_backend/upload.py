from flask import Blueprint, request, jsonify
from PIL import Image
from io import BytesIO
import base64
import numpy as np

from model import get_model_and_transform

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/api/v1/upload_image', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image part in the request'}), 400

        file = request.files['image']
        img = Image.open(file.stream).convert('RGB')

        model, transform = get_model_and_transform()
        img_tensor = transform(img).unsqueeze(0)

        import torch
        with torch.no_grad():
            features = model(img_tensor).squeeze().numpy()

        buffer = BytesIO()
        img.save(buffer, format="JPEG")
        img_base64 = base64.b64encode(buffer.getvalue()).decode()

        return jsonify({
            'vector': features.tolist(),
            'preview': f"data:image/jpeg;base64,{img_base64}"
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
