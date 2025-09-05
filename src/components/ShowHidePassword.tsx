import React from 'react';

interface ShowHidePasswordProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const ShowHidePassword: React.FC<ShowHidePasswordProps> = ({ showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-2 top-[59%] -translate-y-1/2 h-10 w-10 flex items-center justify-center"
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ) : (
        <svg
          fill="#9CA3AF"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12,4.5C7,4.5,2.73,7.61,1,12c1.73,4.39,6,7.5,11,7.5s9.27-3.11,11-7.5c-1.73-4.39-6-7.5-11-7.5zM12,17 c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5S14.76,17,12,17z" />
          <path d="M2.92,2.92l18.16,18.16l1.41-1.41L2.92,1.51L1.51,2.92z" />
        </svg>
      )}
    </button>
  );
};

export default ShowHidePassword;