from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Database, Room

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('/rooms', methods=['GET'])
@jwt_required()
def get_rooms():
    db = Database()
    rooms = Room.get_all(db)
    db.close()
    return jsonify({'success': True, 'data': rooms}), 200

@rooms_bp.route('/rooms', methods=['POST'])
@jwt_required()
def create_room():
    data = request.get_json()
    db = Database()
    
    room_id = Room.create(db, data['name'], data['capacity'], data['type'])
    db.close()
    
    if room_id:
        return jsonify({'success': True, 'id': room_id}), 201
    return jsonify({'success': False, 'message': 'Failed to create room'}), 500

@rooms_bp.route('/rooms/<int:room_id>', methods=['PUT'])
@jwt_required()
def update_room(room_id):
    data = request.get_json()
    db = Database()
    
    success = Room.update(db, room_id, data['name'], data['capacity'], data['type'])
    db.close()
    
    if success:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Failed to update room'}), 500

@rooms_bp.route('/rooms/<int:room_id>', methods=['DELETE'])
@jwt_required()
def delete_room(room_id):
    db = Database()
    success = Room.delete(db, room_id)
    db.close()
    
    if success:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Failed to delete room'}), 500
