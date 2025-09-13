import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ShowHidePassword from '../components/ShowHidePassword';

const RegisterPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to register');
      }

      // Log in the user automatically after registration
      const loginResponse = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        const data = await loginResponse.json();
        throw new Error(data.message || 'Failed to login after registration');
      }

      const { token } = await loginResponse.json();
      login(token);
      setTimeout(() => {
        setCurrentPage('profile');
      }, 0);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-6 pt-40 pb-12 h-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Register</h2>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute top-[55%] right-2 flex items-center px-3">
              <ShowHidePassword showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="******************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-2 flex items-center px-3">
              <ShowHidePassword showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-500"
              href="#"
              onClick={() => setCurrentPage('login')}
            >
              Already have an account?
            </a>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-4">Or register with:</p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  console.log('Google button clicked');
                  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
                  window.open(`${backendUrl}/api/auth/google`, '_self');
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                onClick={() => {
                  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
                  window.open(`${backendUrl}/api/auth/github`, '_self');
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-5 h-5 mr-2" />
                GitHub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
