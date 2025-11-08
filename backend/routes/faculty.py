from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Database, Faculty
import json

faculty_bp = Blueprint('faculty', __name__)

@faculty_bp.route('/faculty', methods=['GET'])
@jwt_required()
def get_faculty():
    db = Database()
    faculty_list = Faculty.get_all(db)
    db.close()
    return jsonify({'success': True, 'data': faculty_list}), 200

@faculty_bp.route('/faculty/<int:faculty_id>', methods=['GET'])
@jwt_required()
def get_faculty_by_id(faculty_id):
    db = Database()
    faculty = Faculty.get_by_id(db, faculty_id)
    db.close()
    if faculty:
        return jsonify({'success': True, 'data': faculty}), 200
    return jsonify({'success': False, 'message': 'Faculty not found'}), 404

@faculty_bp.route('/faculty', methods=['POST'])
@jwt_required()
def create_faculty():
    data = request.get_json()
    db = Database()
    
    availability = json.dumps(data.get('availability', {}))
    faculty_id = Faculty.create(
        db, 
        data['name'], 
        availability,
        data.get('max_hours', 20),
        data.get('expertise', '')
    )
    db.close()
    
    if faculty_id:
        return jsonify({'success': True, 'id': faculty_id}), 201
    return jsonify({'success': False, 'message': 'Failed to create faculty'}), 500

@faculty_bp.route('/faculty/<int:faculty_id>', methods=['PUT'])
@jwt_required()
def update_faculty(faculty_id):
    data = request.get_json()
    db = Database()
    
    availability = json.dumps(data.get('availability', {}))
    success = Faculty.update(
        db,
        faculty_id,
        data['name'],
        availability,
        data.get('max_hours', 20),
        data.get('expertise', '')
    )
    db.close()
    
    if success:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Failed to update faculty'}), 500

@faculty_bp.route('/faculty/<int:faculty_id>', methods=['DELETE'])
@jwt_required()
def delete_faculty(faculty_id):
    db = Database()
    success = Faculty.delete(db, faculty_id)
    db.close()
    
    if success:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Failed to delete faculty'}), 500
