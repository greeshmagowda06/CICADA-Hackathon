import sqlite3
import json
from config import Config

class Database:
    def __init__(self):
        self.conn = None
        self.connect()

    def connect(self):
        try:
            self.conn = sqlite3.connect(Config.DB_PATH)
            self.conn.row_factory = sqlite3.Row  # Enable column access by name
        except Exception as e:
            print(f"Database connection error: {e}")

    def execute_query(self, query, params=None, fetch=True):
        try:
            cursor = self.conn.cursor()
            cursor.execute(query, params or ())
            if fetch:
                rows = cursor.fetchall()
                # Convert to dict-like objects
                return [dict(row) for row in rows]
            self.conn.commit()
            return True
        except Exception as e:
            self.conn.rollback()
            print(f"Query execution error: {e}")
            return None

    def close(self):
        if self.conn:
            self.conn.close()

class Faculty:
    @staticmethod
    def get_all(db):
        query = "SELECT * FROM faculty ORDER BY id"
        return db.execute_query(query)
    
    @staticmethod
    def get_by_id(db, faculty_id):
        query = "SELECT * FROM faculty WHERE id = ?"
        result = db.execute_query(query, (faculty_id,))
        return result[0] if result else None
    
    @staticmethod
    def create(db, name, availability, max_hours, expertise):
        query = """
            INSERT INTO faculty (name, availability, max_hours, expertise)
            VALUES (?, ?, ?, ?)
        """
        db.execute_query(query, (name, availability, max_hours, expertise), fetch=False)
        # Get the last inserted row id
        result = db.execute_query("SELECT last_insert_rowid() as id")
        return result[0]['id'] if result else None
    
    @staticmethod
    def update(db, faculty_id, name, availability, max_hours, expertise):
        query = """
            UPDATE faculty
            SET name = ?, availability = ?, max_hours = ?, expertise = ?
            WHERE id = ?
        """
        return db.execute_query(query, (name, availability, max_hours, expertise, faculty_id), fetch=False)

    @staticmethod
    def delete(db, faculty_id):
        query = "DELETE FROM faculty WHERE id = ?"
        return db.execute_query(query, (faculty_id,), fetch=False)

class Course:
    @staticmethod
    def get_all(db):
        query = """
            SELECT c.*, f.name as faculty_name 
            FROM courses c
            LEFT JOIN faculty f ON c.faculty_id = f.id
            ORDER BY c.id
        """
        return db.execute_query(query)
    
    @staticmethod
    def create(db, code, name, credits, course_type, faculty_id, hours_per_week):
        query = """
            INSERT INTO courses (code, name, credits, type, faculty_id, hours_per_week)
            VALUES (?, ?, ?, ?, ?, ?)
        """
        db.execute_query(query, (code, name, credits, course_type, faculty_id, hours_per_week), fetch=False)
        # Get the last inserted row id
        result = db.execute_query("SELECT last_insert_rowid() as id")
        return result[0]['id'] if result else None

    @staticmethod
    def update(db, course_id, code, name, credits, course_type, faculty_id, hours_per_week):
        query = """
            UPDATE courses
            SET code = ?, name = ?, credits = ?, type = ?, faculty_id = ?, hours_per_week = ?
            WHERE id = ?
        """
        return db.execute_query(query, (code, name, credits, course_type, faculty_id, hours_per_week, course_id), fetch=False)

    @staticmethod
    def delete(db, course_id):
        query = "DELETE FROM courses WHERE id = ?"
        return db.execute_query(query, (course_id,), fetch=False)

class Room:
    @staticmethod
    def get_all(db):
        query = "SELECT * FROM rooms ORDER BY id"
        return db.execute_query(query)
    
    @staticmethod
    def create(db, name, capacity, room_type):
        query = """
            INSERT INTO rooms (name, capacity, type)
            VALUES (?, ?, ?)
        """
        db.execute_query(query, (name, capacity, room_type), fetch=False)
        # Get the last inserted row id
        result = db.execute_query("SELECT last_insert_rowid() as id")
        return result[0]['id'] if result else None

    @staticmethod
    def update(db, room_id, name, capacity, room_type):
        query = """
            UPDATE rooms
            SET name = ?, capacity = ?, type = ?
            WHERE id = ?
        """
        return db.execute_query(query, (name, capacity, room_type, room_id), fetch=False)

    @staticmethod
    def delete(db, room_id):
        query = "DELETE FROM rooms WHERE id = ?"
        return db.execute_query(query, (room_id,), fetch=False)

class Timetable:
    @staticmethod
    def get_all(db):
        query = """
            SELECT t.*, c.code as course_code, c.name as course_name,
                   f.name as faculty_name, r.name as room_name
            FROM timetable t
            JOIN courses c ON t.course_id = c.id
            JOIN faculty f ON t.faculty_id = f.id
            JOIN rooms r ON t.room_id = r.id
            ORDER BY 
                CASE t.day
                    WHEN 'Monday' THEN 1
                    WHEN 'Tuesday' THEN 2
                    WHEN 'Wednesday' THEN 3
                    WHEN 'Thursday' THEN 4
                    WHEN 'Friday' THEN 5
                END, t.slot
        """
        return db.execute_query(query)
    
    @staticmethod
    def clear_all(db):
        query = "DELETE FROM timetable"
        return db.execute_query(query, fetch=False)
    
    @staticmethod
    def bulk_insert(db, timetable_data):
        query = "INSERT INTO timetable (course_id, faculty_id, room_id, day, slot) VALUES (?, ?, ?, ?, ?)"
        try:
            cursor = db.conn.cursor()
            cursor.executemany(query, timetable_data)
            db.conn.commit()
            cursor.close()  # Close cursor after use
            return True
        except Exception as e:
            db.conn.rollback()
            print(f"Bulk insert error: {e}")
            return False
