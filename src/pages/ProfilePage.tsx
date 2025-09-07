import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ShowHidePassword from '../components/ShowHidePassword';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  hasPassword?: boolean; // Add hasPassword property
}

const ProfilePage: React.FC = () => {
  const { token, user, updateUser } = useAuth(); // Get updateUser function
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editableUsername, setEditableUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<string | null>(null);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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

        const data: UserProfile & { hasPassword: boolean } = await response.json();
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

  const handleChangePassword = async () => {
    setPasswordChangeMessage(null);
    setPasswordChangeError(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeError('All password fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New password and confirmation do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordChangeError('New password must be at least 8 characters long');
      return;
    }

    // Add more password complexity rules if needed
    // if (!/\d/.test(newPassword)) {
    //   setPasswordChangeError('New password must contain a number');
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:3003/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      setPasswordChangeMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      setPasswordChangeError(err.message);
    }
  };

  const handleDownloadAllCode = async () => {
    if (!token) {
      alert('You must be logged in to download code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/api/code/download', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download code.');
      }

      // Get the blob from the response
      const blob = await response.blob();
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'all_user_code.zip'; // Suggested filename
      document.body.appendChild(a);
      a.click(); // Programmatically click the link to trigger the download
      a.remove(); // Clean up the temporary link
      window.URL.revokeObjectURL(url); // Revoke the object URL

    } catch (err: any) {
      alert(`Error downloading code: ${err.message}`);
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
            <button
              className="ml-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDownloadAllCode}
            >
              Download All Code
            </button>
          </div>
        </div>

        {/* Password Change Section */}
        {userProfile.hasPassword && (
          <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Change Password</h2>
            {passwordChangeMessage && <p className="text-green-500 text-center mb-4">{passwordChangeMessage}</p>}
            {passwordChangeError && <p className="text-red-500 text-center mb-4">{passwordChangeError}</p>}

            <div className="mb-4 relative">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="current-password">
                Current Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="current-password"
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="******************"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <div className="absolute top-[68%] -translate-y-1/2 right-2 flex items-center px-3">
                <ShowHidePassword showPassword={showCurrentPassword} setShowPassword={setShowCurrentPassword} />
              </div>
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="new-password">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="******************"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="absolute top-[68%] -translate-y-1/2 right-2 flex items-center px-3">
                <ShowHidePassword showPassword={showNewPassword} setShowPassword={setShowNewPassword} />
              </div>
            </div>

            <div className="mb-6 relative">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="confirm-new-password">
                Confirm New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-new-password"
                type={showConfirmNewPassword ? 'text' : 'password'}
                placeholder="******************"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <div className="absolute  top-[67%] -translate-y-1/2 right-2 flex items-center px-3">
                <ShowHidePassword showPassword={showConfirmNewPassword} setShowPassword={setShowConfirmNewPassword} />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
