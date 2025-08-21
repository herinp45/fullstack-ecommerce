from flask import Flask
from flask_cors import CORS

from upload import upload_bp
from search import search_bp

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(upload_bp)
app.register_blueprint(search_bp, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)