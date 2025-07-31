from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return "Welcome to the ML Backend API!"

if __name__ == '__main__':
    app.run(debug=True)