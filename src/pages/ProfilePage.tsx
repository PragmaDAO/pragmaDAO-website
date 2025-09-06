import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { token } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

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
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Username</label>
            <p className="text-white">{userProfile.username}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
            <p className="text-white">{userProfile.email}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2">Member Since</label>
            <p className="text-white">{new Date(userProfile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
