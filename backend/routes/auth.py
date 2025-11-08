from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Simple authentication (enhance with database in production)
    if username == 'admin' and password == 'admin123':
        access_token = create_access_token(identity=username)
        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': {'username': username, 'role': 'admin'}
        }), 200
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
