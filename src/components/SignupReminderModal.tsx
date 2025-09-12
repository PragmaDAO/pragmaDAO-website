import React from 'react';

interface SignupReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: () => void;
  onLogin: () => void;
}

const SignupReminderModal: React.FC<SignupReminderModalProps> = ({
  isOpen,
  onClose,
  onSignup,
  onLogin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-300 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            {/* Title */}
            <div className="mt-3">
              <h3 className="text-lg font-semibold leading-6 text-white">
                Sign Up to Save Progress
              </h3>
            </div>

            {/* Message */}
            <div className="mt-2">
              <p className="text-sm text-gray-300">
                You need to create an account to save your test results and track your learning progress. 
                Your progress won't be saved if you continue as a guest.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={onSignup}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Create Account
              </button>
              
              <button
                onClick={onLogin}
                className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                I Already Have an Account
              </button>
              
              <button
                onClick={onClose}
                className="w-full text-sm text-gray-400 hover:text-gray-300 underline focus:outline-none"
              >
                Continue as Guest (Progress Won't Save)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupReminderModal;