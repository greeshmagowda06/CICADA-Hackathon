import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-hackathon-2025')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-hackathon')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

    # SQLite Configuration (easier for Windows)
    DB_TYPE = 'sqlite'
    DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'database', 'timetable.db')

    # Timetable Configuration
    DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    TIME_SLOTS = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00',
                  '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00']
