import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { LessonRowProps } from '../types';
import { lessons } from '../lessons';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import ProgressBar from '../components/ProgressBar'; // Import the new component

interface LessonRowPropsWithCompletion extends LessonRowProps {
    isCompleted: boolean;
}

const LessonRow: React.FC<LessonRowPropsWithCompletion> = ({ index, title, description, difficulty, onClick, isCompleted }) => (
    <div className="lesson-row grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-1 text-2xl font-bold text-gray-500">{String(index + 1).padStart(2, '0')}</div>
        <div className="md:col-span-8">
            <h3 className={`text-xl font-bold text-white mb-2 ${isCompleted ? 'line-through' : ''}`}>{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
        <div className="md:col-span-1 flex justify-start md:justify-center">
            <span className={`difficulty-badge difficulty-${difficulty}`}>{difficulty}</span>
        </div>
        <div className="md:col-span-2 flex justify-end">
            <button onClick={onClick} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Start</button>
        </div>
    </div>
);

const LessonsPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    const { user } = useAuth(); // Get user from AuthContext
    const [completedLessons, setCompletedLessons] = useState<string[]>([]); // State to store completed lesson IDs

    useEffect(() => {
        const fetchProgress = async () => {
            if (user) {
                try {
                    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
                    const response = await fetch(`${backendUrl}/api/progress`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Send JWT for authentication
                        }
                    });
                    if (response.ok) {
                        const progressData = await response.json();
                        // Extract lessonIds from progressData
                        const completedIds = progressData.filter((p: any) => p.completed).map((p: any) => p.lessonId);
                        setCompletedLessons(completedIds);
                    } else {
                        console.error('Failed to fetch progress:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching progress:', error);
                }
            } else {
                setCompletedLessons([]); // Clear progress if user logs out
            }
        };

        fetchProgress();
    }, [user]); // Re-fetch when user changes

    return (
        <main className="pt-32 pb-20">
            <section id="lessons" className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">PragmaDAO Lessons</h2>
                <p className="text-lg md:text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">Browse our collection of hands-on lessons to build practical Web3 development skills.</p>
                
                {/* Add the progress bar here */}
                {user && (
                    <ProgressBar
                        completed={completedLessons.length}
                        total={lessons.length}
                    />
                )}

                <div className="bg-gray-800/50 rounded-lg border border-gray-700">
                    {lessons.map((lesson, index) => (
                        <LessonRow
                            key={lesson.title}
                            index={index}
                            {...lesson}
                            onClick={() => setCurrentPage(lesson.id)}
                            isCompleted={completedLessons.includes(lesson.id)} // Pass isCompleted prop
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default LessonsPage;