-- SQLite Schema for AI Timetable Generation System

-- Faculty Table
CREATE TABLE faculty (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    availability TEXT DEFAULT '{}',
    max_hours INTEGER DEFAULT 20,
    expertise TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table (NEP 2020 Compliant)
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    credits INTEGER NOT NULL,
    type TEXT NOT NULL, -- Major, Minor, Multidisciplinary, Ability Enhancement, Skill Enhancement, Value-added
    faculty_id INTEGER REFERENCES faculty(id) ON DELETE SET NULL,
    hours_per_week INTEGER DEFAULT 3,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rooms Table
CREATE TABLE rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    type TEXT DEFAULT 'Classroom', -- Classroom, Lab, Auditorium
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Timetable Table
CREATE TABLE timetable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    faculty_id INTEGER REFERENCES faculty(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    slot TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data for Testing
INSERT INTO faculty (name, availability, max_hours, expertise) VALUES
('Dr. Rajesh Kumar', '{"Monday": true, "Tuesday": true, "Wednesday": true, "Thursday": true, "Friday": true}', 20, 'Computer Science, AI/ML'),
('Dr. Priya Sharma', '{"Monday": true, "Tuesday": true, "Wednesday": true, "Thursday": true, "Friday": true}', 18, 'Mathematics, Data Science');

INSERT INTO rooms (name, capacity, type) VALUES
('Room 101', 60, 'Classroom'),
('Lab 201', 40, 'Lab'),
('Room 102', 50, 'Classroom');

INSERT INTO courses (code, name, credits, type, faculty_id, hours_per_week) VALUES
('CS301', 'Machine Learning', 4, 'Major', 1, 4),
('MATH201', 'Linear Algebra', 3, 'Multidisciplinary', 2, 3),
('CS401', 'Deep Learning', 4, 'Major', 1, 4);
