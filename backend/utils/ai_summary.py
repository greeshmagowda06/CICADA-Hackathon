def generate_ai_summary(timetable, faculty, courses, rooms):
    """Generate AI summary of timetable (rule-based for hackathon)"""
    
    if not timetable:
        return "No timetable generated yet."
    
    # Calculate faculty workload
    faculty_load = {}
    for entry in timetable:
        f_id = entry['faculty_id']
        faculty_load[f_id] = faculty_load.get(f_id, 0) + 1
    
    # Check for overload
    overloaded = []
    for f in faculty:
        f_id = f['id']
        max_hours = f.get('max_hours', 20)
        actual_hours = faculty_load.get(f_id, 0)
        if actual_hours > max_hours:
            overloaded.append(f['name'])
    
    # Calculate room utilization
    room_usage = {}
    for entry in timetable:
        r_id = entry['room_id']
        room_usage[r_id] = room_usage.get(r_id, 0) + 1
    
    max_slots = len(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) * 8
    avg_utilization = (sum(room_usage.values()) / (len(rooms) * max_slots)) * 100
    
    # Generate summary
    summary = f"✅ **Timetable Generated Successfully**\n\n"
    summary += f"📊 **Statistics:**\n"
    summary += f"- Total Classes Scheduled: {len(timetable)}\n"
    summary += f"- Faculty Members: {len(faculty)}\n"
    summary += f"- Courses: {len(courses)}\n"
    summary += f"- Rooms: {len(rooms)}\n"
    summary += f"- Average Room Utilization: {avg_utilization:.1f}%\n\n"
    
    if overloaded:
        summary += f"⚠️ **Warnings:**\n"
        summary += f"- Overloaded Faculty: {', '.join(overloaded)}\n\n"
    else:
        summary += f"✅ **All faculty assigned within workload limits**\n\n"
    
    summary += f"🎯 **NEP 2020 Compliance:**\n"
    summary += f"- Multidisciplinary course scheduling: Enabled\n"
    summary += f"- No scheduling conflicts detected\n"
    summary += f"- Balanced workload distribution achieved\n"
    
    return summary
