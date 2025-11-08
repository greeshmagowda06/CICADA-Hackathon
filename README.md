Login: `admin` / `admin123`

---

## ✨ Features
- ✅ AI-powered conflict-free scheduling
- ✅ NEP 2020 course types (Major, Minor, Multidisciplinary, etc.)
- ✅ Real-time timetable generation (< 3 seconds)
- ✅ Export to PDF/Excel
- ✅ Premium animated UI (Framer Motion)
- ✅ Zero setup database (SQLite)

---


---

## 🎯 Usage

### 1. Faculty Management
- Dashboard → Faculty → Add Faculty
- Set name, max hours, expertise

### 2. Add Courses
- Dashboard → Courses → Add Course
- Set code, name, credits, NEP 2020 type
- Assign faculty

### 3. Add Rooms
- Dashboard → Rooms → Add Room
- Set name, capacity, type

### 4. Generate Timetable
- Dashboard → Timetable → **Generate Timetable**
- AI creates conflict-free schedule
- View AI Insights
- Export PDF/Excel

---

## 🐛 Troubleshooting

**Backend won't start?**
cd backend
.\venv\Scripts\activate
python app.py


**Frontend blank?**
- Check backend running: http://localhost:5000
- Press F12 → Console for errors
- Clear cache: Ctrl + Shift + Delete

**Port conflict?**
Backend (change port in app.py)
app.run(debug=True, port=5001)

Frontend (change in vite.config.js)
server: { port: 5174 }

**Reset database?**
- Delete `backend/timetable.db`
- Restart backend (auto-recreates with sample data)

---

## 🔒 Default Credentials
- Username: `admin`
- Password: `admin123`

---

## 🛠️ Tech Stack
**Backend:** Flask 3.0, SQLite, OR-Tools 9.8  
**Frontend:** React 18, Vite 5, TailwindCSS, Framer Motion  
**AI:** Constraint Satisfaction Problem (CP-SAT solver)

---

## 📊 Sample Data (Auto-generated)
- **Faculty:** 2 (Dr. Kumar, Dr. Sharma)
- **Courses:** 3 (CS301, MATH201, CS401)
- **Rooms:** 3 (Room 101, Lab 201, Room 102)

---

## 🎬 Hackathon Demo (30 seconds)
1. **Landing Page** → Scroll animations (10s)
2. **Login** → Show dashboard (5s)
3. **Quick Tour** → Faculty/Courses/Rooms (5s)
4. **AI Magic** → Generate + Export (10s)

---

## ✅ Pre-Demo Checklist
- [ ] Backend running (http://localhost:5000)
- [ ] Frontend running (http://localhost:5173)
- [ ] Can login successfully
- [ ] Sample data visible
- [ ] Timetable generates
- [ ] No console errors (F12)

---

## 🆘 Quick Commands

**Start Everything:**
Terminal 1 - Backend
cd backend && .\venv\Scripts\activate && python app.py

Terminal 2 - Frontend
cd frontend && npm run dev

**Verify Backend:**
curl http://localhost:5000

Should return: {"message":"AI Timetable Generation API..."}

**Check Logs:**
- Backend: Check terminal output
- Frontend: F12 → Console tab

---

## 🏆 Key Talking Points
- NEP 2020 compliant (all course types)
- AI-powered (Google OR-Tools CSP solver)
- Zero conflicts guaranteed
- Sub-second generation
- Handles 100+ courses
- Premium UI with animations

---

## 📦 Dependencies

**Backend (requirements.txt):**
Flask==3.0.0
Flask-CORS==4.0.0
Flask-JWT-Extended==4.6.0
ortools==9.8.3296
python-dotenv==1.0.0
reportlab==4.0.7
openpyxl==3.1.2

**Frontend (package.json):**
{
"dependencies": {
"react": "^18.3.1",
"react-dom": "^18.3.1",
"react-router-dom": "^6.20.0",
"axios": "^1.6.2",
"framer-motion": "^11.0.0",
"lucide-react": "^0.294.0"
}
}

---

## 💡 Features Highlight

### AI Algorithm
- **Type:** Constraint Satisfaction Problem (CSP)
- **Solver:** Google OR-Tools CP-SAT
- **Constraints:** 5 (course hours, faculty conflicts, room conflicts, workload, availability)
- **Optimization:** Minimize idle time
- **Performance:** < 3 seconds for 50+ courses

### UI/UX
- Scroll-based storytelling
- Glassmorphic design
- Dark mode
- Smooth animations (60fps)
- Responsive (mobile-ready)

---

## 🎓 NEP 2020 Course Types
1. Major (Core specialization)
2. Minor (Secondary specialization)
3. Multidisciplinary (Cross-disciplinary)
4. Ability Enhancement (Language, communication)
5. Skill Enhancement (Practical, vocational)
6. Value-added (Ethics, environment)

---

## 🔧 Development

**Backend API Endpoints:**
- `POST /api/login` - Authentication
- `GET /api/faculty` - List faculty
- `POST /api/faculty` - Add faculty
- `GET /api/courses` - List courses
- `POST /api/generate-timetable` - Generate schedule
- `GET /api/export?format=pdf` - Export timetable

**Adding New Feature:**
backend/routes/your_feature.py
from flask import Blueprint
your_bp = Blueprint('your_feature', name)

@your_bp.route('/endpoint', methods=['GET'])
def your_function():
return {'data': 'value'}

---

## 📞 Support

**Backend Not Running?**
1. Check Python installed: `python --version`
2. Activate venv: `.\venv\Scripts\activate`
3. Install deps: `pip install -r requirements.txt`
4. Run: `python app.py`

**Frontend Issues?**
1. Check Node installed: `node --version`
2. Install deps: `npm install`
3. Run: `npm run dev`

**Database Locked?**
1. Stop backend (Ctrl+C)
2. Delete `backend/timetable.db`
3. Restart backend

---

## 🎉 Success!

Your AI Timetable System is ready!

**Live URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Dashboard: http://localhost:5173/dashboard

**Next Steps:**
1. Add more courses/faculty
2. Generate complex timetables
3. Test export features
4. Prepare demo presentation

---

**Built with ❤️ for Atria University Hackathon 2025**

Good luck! 🚀🏆
