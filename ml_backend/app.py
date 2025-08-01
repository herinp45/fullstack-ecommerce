from flask import Flask
from flask_cors import CORS

from upload import upload_bp

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(upload_bp)

if __name__ == '__main__':
    app.run(debug=True)