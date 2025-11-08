import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Download, Sparkles } from 'lucide-react';

function TimetableView({ token }) {
  const [timetable, setTimetable] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const slots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', 
                 '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'];

  useEffect(() => {
    fetchTimetable();
    fetchAISummary();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/timetable', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTimetable(response.data.data);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    }
  };

  const fetchAISummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ai-summary', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAiSummary(response.data.summary);
    } catch (err) {
      console.error('Error fetching AI summary:', err);
    }
  };

  const generateTimetable = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-timetable', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTimetable(response.data.data);
        setStats(response.data.statistics);
        fetchAISummary();
        alert('Timetable generated successfully!');
      }
    } catch (err) {
      alert('Error generating timetable: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const exportTimetable = async (format) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/export?format=${format}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `timetable.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error exporting timetable');
    }
  };

  const getClassForSlot = (day, slot) => {
    return timetable.filter(entry => entry.day === day && entry.slot === slot);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI-Generated Timetable</h1>
        <div className="flex gap-4">
          <button
            onClick={generateTimetable}
            disabled={loading}
            className="flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'Generating...' : 'Generate Timetable'}
          </button>
          <button
            onClick={() => exportTimetable('pdf')}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
          >
            <Download size={20} />
            Export PDF
          </button>
          <button
            onClick={() => exportTimetable('excel')}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
          >
            <Download size={20} />
            Export Excel
          </button>
        </div>
      </div>

      {aiSummary && (
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold">AI Insights</h2>
          </div>
          <pre className="text-sm whitespace-pre-wrap text-gray-300">{aiSummary}</pre>
        </div>
      )}

      {timetable.length === 0 ? (
        <div className="bg-dark-card p-12 rounded-lg text-center">
          <p className="text-xl text-gray-400 mb-4">No timetable generated yet</p>
          <p className="text-sm text-gray-500">
            Click "Generate Timetable" to create an optimized schedule
          </p>
        </div>
      ) : (
        <div className="bg-dark-card rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-dark-hover">
                <th className="border border-gray-700 px-4 py-3 sticky left-0 bg-dark-hover z-10">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="border border-gray-700 px-4 py-3 min-w-[180px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map(slot => (
                <tr key={slot}>
                  <td className="border border-gray-700 px-4 py-3 font-bold sticky left-0 bg-dark-card z-10">
                    {slot}
                  </td>
                  {days.map(day => {
                    const classes = getClassForSlot(day, slot);
                    return (
                      <td key={`${day}-${slot}`} className="border border-gray-700 px-2 py-2">
                        {classes.map((cls, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-3 rounded mb-1 last:mb-0"
                          >
                            <div className="font-bold text-sm text-blue-300">{cls.course_code}</div>
                            <div className="text-xs text-gray-400 mt-1">{cls.faculty_name}</div>
                            <div className="text-xs text-gray-500">{cls.room_name}</div>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TimetableView;
