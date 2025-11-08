import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

function RoomManager({ token }) {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    capacity: 50,
    type: 'Classroom'
  });

  const roomTypes = ['Classroom', 'Lab', 'Auditorium', 'Seminar Hall'];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(response.data.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (formData.id) {
        await axios.put(`http://localhost:5000/api/rooms/${formData.id}`, formData, { headers });
      } else {
        await axios.post('http://localhost:5000/api/rooms', formData, { headers });
      }
      
      setShowForm(false);
      setFormData({ id: null, name: '', capacity: 50, type: 'Classroom' });
      fetchRooms();
    } catch (err) {
      console.error('Error saving room:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      capacity: item.capacity,
      type: item.type
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this room?')) {
      try {
        await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchRooms();
      } catch (err) {
        console.error('Error deleting room:', err);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {showForm && (
        <div className="bg-dark-card p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">{formData.id ? 'Edit' : 'Add'} Room</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Room Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg"
                >
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-accent-primary hover:bg-accent-secondary px-6 py-2 rounded-lg">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ id: null, name: '', capacity: 50, type: 'Classroom' });
                }}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-dark-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{room.name}</h3>
                <span className="text-sm text-gray-400">{room.type}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="text-2xl font-bold text-accent-primary">
              Capacity: {room.capacity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomManager;
