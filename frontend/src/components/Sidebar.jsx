import React from 'react';
import { Home, Users, BookOpen, DoorOpen, Calendar, LogOut } from 'lucide-react';

function Sidebar({ currentPage, setCurrentPage, onLogout }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'faculty', name: 'Faculty', icon: Users },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'rooms', name: 'Rooms', icon: DoorOpen },
    { id: 'timetable', name: 'Timetable', icon: Calendar },
  ];

  return (
    <div className="w-64 bg-dark-card h-full flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-accent-primary">📚 TimetableAI</h2>
        <p className="text-xs text-gray-400 mt-1">NEP 2020 System</p>
      </div>
      
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                currentPage === item.id
                  ? 'bg-accent-primary text-white'
                  : 'text-gray-300 hover:bg-dark-hover'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
