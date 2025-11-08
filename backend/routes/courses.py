from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Database, Course

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/courses', methods=['GET'])
@jwt_required()
def get_courses():
    db = Database()
    courses = Course.get_all(db)
    db.close()
    return jsonify({'success': True, 'data': courses}), 200

@courses_bp.route('/courses', methods=['POST'])
@jwt_required()
def create_course():
    data = request.get_json()
    db = Database()
    
    course_id = Course.create(
        db,
        data['code'],
        data['name'],
        data['credits'],
        data['type'],
        data['faculty_id'],
        data.get('hours_per_week', data['credits'])
    )
    db.close()
    
    if course_id:
        return jsonify({'success': True, 'id': course_id}), 201
    return jsonify({'success': False, 'message': 'Failed to create course'}), 500

@courses_bp.route('/courses/<int:course_id>', methods=['PUT'])
@jwt_required()
def update_course(course_id):
    data = request.get_json()
    db = Database()
    
    success = Course.update(
        db,
        course_id,
        data['code'],
        data['name'],
        data['credits'],
        data['type'],
        data['faculty_id'],
        data.get('hours_per_week', data['credits'])
    )
    db.close()
    
    if success:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Failed to update course'}), 500

@courses_bp.route('/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_course(course_id):
    db = Database()
    success = Course.delete(db, course_id)
    db.close()
    
    if success:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Failed to delete course'}), 500
