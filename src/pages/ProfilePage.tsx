import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { token, user, updateUser } = useAuth(); // Get updateUser function
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editableUsername, setEditableUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3003/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

        const data: UserProfile = await response.json();
        setUserProfile(data);
        setEditableUsername(data.username); // Initialize editable username
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
    setUpdateMessage(null); // Clear any previous messages
  };

  const handleSave = async () => {
    if (!token || !userProfile) return;

    try {
      const response = await fetch('http://localhost:3003/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username: editableUsername }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedData: UserProfile = await response.json();
      setUserProfile(updatedData);
      // Update the user context with the new username
      updateUser({ username: updatedData.username }); // Use updateUser
      setUpdateMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
      setUpdateMessage(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-12 text-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-12 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-12 text-center">
        <p className="text-white">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pt-24 pb-12">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center text-white mb-6">User Profile</h2>
          {updateMessage && <p className="text-green-500 text-center mb-4">{updateMessage}</p>}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={editableUsername}
                onChange={(e) => setEditableUsername(e.target.value)}
              />
            ) : (
              <p className="text-white">{userProfile.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
            <p className="text-white">{userProfile.email}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2">Member Since</label>
            <p className="text-white">{new Date(userProfile.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
