from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes import register_routes

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
jwt = JWTManager(app)

register_routes(app)

@app.route('/')
def index():
    return {'message': 'AI Timetable Generation API - NEP 2020', 'status': 'running'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
