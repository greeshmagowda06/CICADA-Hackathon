import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

function FacultyManager({ token }) {
  const [faculty, setFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    max_hours: 20,
    expertise: ''
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

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
      const availability = {
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true
      };

      if (formData.id) {
        await axios.put(`http://localhost:5000/api/faculty/${formData.id}`, 
          { ...formData, availability }, { headers });
      } else {
        await axios.post('http://localhost:5000/api/faculty', 
          { ...formData, availability }, { headers });
      }
      
      setShowForm(false);
      setFormData({ id: null, name: '', max_hours: 20, expertise: '' });
      fetchFaculty();
    } catch (err) {
      console.error('Error saving faculty:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      max_hours: item.max_hours,
      expertise: item.expertise
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this faculty member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/faculty/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchFaculty();
      } catch (err) {
        console.error('Error deleting faculty:', err);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Faculty Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} />
          Add Faculty
        </button>
      </div>

      {showForm && (
        <div className="bg-dark-card p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">{formData.id ? 'Edit' : 'Add'} Faculty</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Max Hours/Week</label>
                <input
                  type="number"
                  value={formData.max_hours}
                  onChange={(e) => setFormData({...formData, max_hours: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Expertise</label>
              <input
                type="text"
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                placeholder="e.g., AI/ML, Data Science"
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-accent-primary hover:bg-accent-secondary px-6 py-2 rounded-lg">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ id: null, name: '', max_hours: 20, expertise: '' });
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
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Max Hours/Week</th>
              <th className="px-6 py-3 text-left">Expertise</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.max_hours}</td>
                <td className="px-6 py-4">{item.expertise}</td>
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

export default FacultyManager;
