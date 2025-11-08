import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

function CourseManager({ token }) {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    code: '',
    name: '',
    credits: 3,
    type: 'Major',
    faculty_id: '',
    hours_per_week: 3
  });

  const courseTypes = ['Major', 'Minor', 'Multidisciplinary', 'Ability Enhancement', 
                       'Skill Enhancement', 'Value-added'];

  useEffect(() => {
    fetchCourses();
    fetchFaculty();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faculty', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaculty(response.data.data);
    } catch (err) {
      console.error('Error fetching faculty:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const data = {
        ...formData,
        faculty_id: parseInt(formData.faculty_id)
      };

      if (formData.id) {
        await axios.put(`http://localhost:5000/api/courses/${formData.id}`, data, { headers });
      } else {
        await axios.post('http://localhost:5000/api/courses', data, { headers });
      }
      
      setShowForm(false);
      setFormData({ id: null, code: '', name: '', credits: 3, type: 'Major', 
                    faculty_id: '', hours_per_week: 3 });
      fetchCourses();
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      code: item.code,
      name: item.name,
      credits: item.credits,
      type: item.type,
      faculty_id: item.faculty_id,
      hours_per_week: item.hours_per_week
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCourses();
      } catch (err) {
        console.error('Error deleting course:', err);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Course Management (NEP 2020)</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      {showForm && (
        <div className="bg-dark-card p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">{formData.id ? 'Edit' : 'Add'} Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Course Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Course Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Credits</label>
                <input
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Type (NEP 2020)</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                >
                  {courseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Hours/Week</label>
                <input
                  type="number"
                  value={formData.hours_per_week}
                  onChange={(e) => setFormData({...formData, hours_per_week: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Assign Faculty</label>
              <select
                value={formData.faculty_id}
                onChange={(e) => setFormData({...formData, faculty_id: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                required
              >
                <option value="">Select Faculty</option>
                {faculty.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-accent-primary hover:bg-accent-secondary px-6 py-2 rounded-lg">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ id: null, code: '', name: '', credits: 3, type: 'Major', 
                               faculty_id: '', hours_per_week: 3 });
                }}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-dark-card rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-hover">
            <tr>
              <th className="px-6 py-3 text-left">Code</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Credits</th>
              <th className="px-6 py-3 text-left">Faculty</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-6 py-4 font-mono">{item.code}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs">
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">{item.credits}</td>
                <td className="px-6 py-4">{item.faculty_name}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 hover:text-blue-300 mr-4"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseManager;
