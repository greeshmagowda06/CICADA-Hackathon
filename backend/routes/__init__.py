from flask import Blueprint

def register_routes(app):
    from .auth import auth_bp
    from .faculty import faculty_bp
    from .courses import courses_bp
    from .rooms import rooms_bp
    from .timetable import timetable_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(faculty_bp, url_prefix='/api')
    app.register_blueprint(courses_bp, url_prefix='/api')
    app.register_blueprint(rooms_bp, url_prefix='/api')
    app.register_blueprint(timetable_bp, url_prefix='/api')
