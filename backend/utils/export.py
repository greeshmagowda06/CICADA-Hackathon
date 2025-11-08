from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from openpyxl import Workbook
from config import Config
import os

def export_to_pdf(timetable):
    """Export timetable to PDF format"""
    file_path = 'timetable.pdf'
    doc = SimpleDocTemplate(file_path, pagesize=landscape(A4))
    elements = []
    
    styles = getSampleStyleSheet()
    title = Paragraph("<b>Academic Timetable - NEP 2020</b>", styles['Title'])
    elements.append(title)
    
    # Organize data by day and slot
    schedule_grid = {}
    for entry in timetable:
        day = entry['day']
        slot = entry['slot']
        key = (day, slot)
        
        if key not in schedule_grid:
            schedule_grid[key] = []
        
        schedule_grid[key].append(
            f"{entry['course_code']}\n{entry['faculty_name']}\n{entry['room_name']}"
        )
    
    # Create table
    data = [['Time Slot'] + Config.DAYS]
    
    for slot in Config.TIME_SLOTS:
        row = [slot]
        for day in Config.DAYS:
            cell_content = '\n---\n'.join(schedule_grid.get((day, slot), ['-']))
            row.append(cell_content)
        data.append(row)
    
    table = Table(data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
    ]))
    
    elements.append(table)
    doc.build(elements)
    
    return file_path

def export_to_excel(timetable):
    """Export timetable to Excel format"""
    file_path = 'timetable.xlsx'
    wb = Workbook()
    ws = wb.active
    ws.title = "Timetable"
    
    # Header
    ws.append(['Day', 'Time Slot', 'Course Code', 'Course Name', 'Faculty', 'Room'])
    
    # Data
    for entry in timetable:
        ws.append([
            entry['day'],
            entry['slot'],
            entry['course_code'],
            entry['course_name'],
            entry['faculty_name'],
            entry['room_name']
        ])
    
    wb.save(file_path)
    return file_path
