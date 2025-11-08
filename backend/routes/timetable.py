from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required
from models import Database, Timetable, Course, Faculty, Room
from scheduler import TimetableScheduler
from utils.export import export_to_pdf, export_to_excel
from utils.ai_summary import generate_ai_summary

timetable_bp = Blueprint('timetable', __name__)

@timetable_bp.route('/timetable', methods=['GET'])
@jwt_required()
def get_timetable():
    db = Database()
    timetable = Timetable.get_all(db)
    db.close()
    return jsonify({'success': True, 'data': timetable}), 200

@timetable_bp.route('/generate-timetable', methods=['POST'])
@jwt_required()
def generate_timetable():
    db = Database()
    
    # Fetch all data
    courses = Course.get_all(db)
    faculty = Faculty.get_all(db)
    rooms = Room.get_all(db)
    
    if not courses or not faculty or not rooms:
        db.close()
        return jsonify({
            'success': False, 
            'message': 'Insufficient data. Add courses, faculty, and rooms first.'
        }), 400
    
    # Generate timetable using AI scheduler
    scheduler = TimetableScheduler(courses, faculty, rooms)
    timetable = scheduler.generate_timetable()
    
    if not timetable:
        db.close()
        return jsonify({
            'success': False,
            'message': 'Could not generate feasible timetable. Check constraints.'
        }), 400
    
    # Clear existing timetable and insert new one
    Timetable.clear_all(db)
    
    timetable_data = [
        (entry['course_id'], entry['faculty_id'], entry['room_id'], 
         entry['day'], entry['slot'])
        for entry in timetable
    ]
    
    success = Timetable.bulk_insert(db, timetable_data)
    stats = scheduler.get_statistics(timetable)
    
    db.close()
    
    if success:
        return jsonify({
            'success': True,
            'data': timetable,
            'statistics': stats
        }), 200
    
    return jsonify({'success': False, 'message': 'Failed to save timetable'}), 500

@timetable_bp.route('/export', methods=['GET'])
@jwt_required()
def export_timetable():
    format_type = request.args.get('format', 'pdf')
    
    db = Database()
    timetable = Timetable.get_all(db)
    db.close()
    
    if not timetable:
        return jsonify({'success': False, 'message': 'No timetable to export'}), 400
    
    if format_type == 'pdf':
        file_path = export_to_pdf(timetable)
        return send_file(file_path, as_attachment=True, download_name='timetable.pdf')
    elif format_type == 'excel':
        file_path = export_to_excel(timetable)
        return send_file(file_path, as_attachment=True, download_name='timetable.xlsx')
    
    return jsonify({'success': False, 'message': 'Invalid format'}), 400

@timetable_bp.route('/ai-summary', methods=['GET'])
@jwt_required()
def get_ai_summary():
    db = Database()
    timetable = Timetable.get_all(db)
    faculty = Faculty.get_all(db)
    courses = Course.get_all(db)
    rooms = Room.get_all(db)
    db.close()
    
    summary = generate_ai_summary(timetable, faculty, courses, rooms)
    
    return jsonify({'success': True, 'summary': summary}), 200
