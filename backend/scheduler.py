from ortools.sat.python import cp_model
from config import Config
import json

class TimetableScheduler:
    def __init__(self, courses, faculty, rooms):
        self.courses = courses
        self.faculty = {f['id']: f for f in faculty}
        self.rooms = {r['id']: r for r in rooms}
        self.days = Config.DAYS
        self.slots = Config.TIME_SLOTS
        self.model = cp_model.CpModel()
        self.solver = cp_model.CpSolver()
        self.schedule = {}
        
    def generate_timetable(self):
        """Main function to generate optimized timetable"""
        
        # Decision variables: x[c, d, s, r] = 1 if course c scheduled on day d, slot s, room r
        x = {}
        for course in self.courses:
            c_id = course['id']
            for d_idx, day in enumerate(self.days):
                for s_idx, slot in enumerate(self.slots):
                    for r_id in self.rooms:
                        var_name = f'c{c_id}_d{d_idx}_s{s_idx}_r{r_id}'
                        x[(c_id, d_idx, s_idx, r_id)] = self.model.NewBoolVar(var_name)
        
        # Constraint 1: Each course must be scheduled for required hours per week
        for course in self.courses:
            c_id = course['id']
            hours_needed = course.get('hours_per_week', course['credits'])
            
            self.model.Add(
                sum(x[(c_id, d, s, r)] 
                    for d in range(len(self.days))
                    for s in range(len(self.slots))
                    for r in self.rooms) == hours_needed
            )
        
        # Constraint 2: No faculty double-booking
        for f_id in self.faculty:
            faculty_courses = [c['id'] for c in self.courses if c['faculty_id'] == f_id]
            for d in range(len(self.days)):
                for s in range(len(self.slots)):
                    self.model.Add(
                        sum(x[(c_id, d, s, r)] 
                            for c_id in faculty_courses
                            for r in self.rooms) <= 1
                    )
        
        # Constraint 3: No room double-booking
        for r_id in self.rooms:
            for d in range(len(self.days)):
                for s in range(len(self.slots)):
                    self.model.Add(
                        sum(x[(c_id, d, s, r_id)] 
                            for c_id in [c['id'] for c in self.courses]
                            for d_temp in [d]
                            for s_temp in [s]) <= 1
                    )
        
        # Constraint 4: Faculty workload limits
        for f_id, faculty_data in self.faculty.items():
            faculty_courses = [c['id'] for c in self.courses if c['faculty_id'] == f_id]
            max_hours = faculty_data.get('max_hours', 20)
            
            self.model.Add(
                sum(x[(c_id, d, s, r)] 
                    for c_id in faculty_courses
                    for d in range(len(self.days))
                    for s in range(len(self.slots))
                    for r in self.rooms) <= max_hours
            )
        
        # Constraint 5: Faculty availability (if specified in JSON)
        for course in self.courses:
            c_id = course['id']
            f_id = course['faculty_id']
            if f_id in self.faculty:
                availability = self.faculty[f_id].get('availability', {})
                if isinstance(availability, str):
                    try:
                        availability = json.loads(availability)
                    except:
                        availability = {}
                
                for d_idx, day in enumerate(self.days):
                    if day in availability and not availability[day]:
                        # Faculty not available on this day
                        for s in range(len(self.slots)):
                            for r in self.rooms:
                                self.model.Add(x[(c_id, d_idx, s, r)] == 0)
        
        # Objective: Minimize idle time (balance schedule)
        # Prefer to schedule classes earlier in the day
        objective_terms = []
        for course in self.courses:
            c_id = course['id']
            for d in range(len(self.days)):
                for s in range(len(self.slots)):
                    for r in self.rooms:
                        # Penalty increases with later time slots
                        objective_terms.append(x[(c_id, d, s, r)] * s)
        
        self.model.Minimize(sum(objective_terms))
        
        # Solve
        status = self.solver.Solve(self.model)
        
        if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
            return self._extract_solution(x)
        else:
            return None
    
    def _extract_solution(self, x):
        """Extract timetable from solved model"""
        timetable = []
        
        for course in self.courses:
            c_id = course['id']
            for d_idx, day in enumerate(self.days):
                for s_idx, slot in enumerate(self.slots):
                    for r_id in self.rooms:
                        if self.solver.Value(x[(c_id, d_idx, s_idx, r_id)]) == 1:
                            timetable.append({
                                'course_id': c_id,
                                'course_code': course['code'],
                                'course_name': course['name'],
                                'faculty_id': course['faculty_id'],
                                'faculty_name': self.faculty[course['faculty_id']]['name'],
                                'room_id': r_id,
                                'room_name': self.rooms[r_id]['name'],
                                'day': day,
                                'slot': slot
                            })
        
        return timetable
    
    def get_statistics(self, timetable):
        """Generate statistics about the timetable"""
        faculty_load = {}
        room_utilization = {}
        
        for entry in timetable:
            f_id = entry['faculty_id']
            r_id = entry['room_id']
            
            faculty_load[f_id] = faculty_load.get(f_id, 0) + 1
            room_utilization[r_id] = room_utilization.get(r_id, 0) + 1
        
        return {
            'faculty_workload': faculty_load,
            'room_usage': room_utilization,
            'total_classes': len(timetable),
            'solver_time': self.solver.WallTime()
        }
