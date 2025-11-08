import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, BookOpen, DoorOpen, Calendar } from 'lucide-react';

function Dashboard({ token }) {
  const [stats, setStats] = useState({
    faculty: 0,
    courses: 0,
    rooms: 0,
    timetable: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [faculty, courses, rooms, timetable] = await Promise.all([
        axios.get('http://localhost:5000/api/faculty', { headers }),
        axios.get('http://localhost:5000/api/courses', { headers }),
        axios.get('http://localhost:5000/api/rooms', { headers }),
        axios.get('http://localhost:5000/api/timetable', { headers })
      ]);
      
      setStats({
        faculty: faculty.data.data.length,
        courses: courses.data.data.length,
        rooms: rooms.data.data.length,
        timetable: timetable.data.data.length
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const cards = [
    { title: 'Faculty Members', value: stats.faculty, icon: Users, color: 'blue' },
    { title: 'Courses', value: stats.courses, icon: BookOpen, color: 'green' },
    { title: 'Rooms', value: stats.rooms, icon: DoorOpen, color: 'purple' },
    { title: 'Scheduled Classes', value: stats.timetable, icon: Calendar, color: 'orange' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-400 mb-8">AI-Based Timetable Generation System - NEP 2020</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-dark-card p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`text-${card.color}-500`} size={32} />
                <span className="text-3xl font-bold">{card.value}</span>
              </div>
              <h3 className="text-gray-400 text-sm">{card.title}</h3>
            </div>
          );
        })}
      </div>
      
      <div className="bg-dark-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">🎯 System Features</h2>
        <ul className="space-y-2 text-gray-300">
          <li>✅ Automatic conflict-free timetable generation</li>
          <li>✅ NEP 2020 multidisciplinary course support</li>
          <li>✅ AI-powered workload optimization</li>
          <li>✅ Real-time editing and regeneration</li>
          <li>✅ Export to PDF and Excel</li>
          <li>✅ Faculty availability management</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
