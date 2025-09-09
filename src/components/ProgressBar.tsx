import React from 'react';

interface ProgressBarProps {
    completed: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white">Your Progress</h3>
                <p className="text-gray-400">{completed} / {total} Lessons Completed</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                    className="bg-indigo-600 h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-right text-gray-400 mt-1">{Math.round(percentage)}%</p>
        </div>
    );
};

export default ProgressBar;
