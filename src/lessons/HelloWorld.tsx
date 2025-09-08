import React, { useState, useRef, useEffect } from "react";
import SolidityEditor from "../components/SolidityEditor";
import { CompiledOutput, TestCase } from "../types";
import Lesson from "../components/Lesson";
import ScrollIndicator from "../components/ScrollIndicator";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { lessons } from "../lessons"; // Import lessons array

const HelloWorld: React.FC<{
  setCurrentPage: (page: string) => void;
  lessonId: string; // Add lessonId as a prop
}> = ({ setCurrentPage, lessonId }) => { // Destructure lessonId
  const { user } = useAuth(); // Get user from AuthContext
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const testResultsContainerRef = useRef<HTMLDivElement>(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false); // New state for completion
  const [canMarkComplete, setCanMarkComplete] = useState(false); // New state for test pass status

  useEffect(() => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isNowScrollable = container.scrollHeight > container.clientHeight;
      setIsScrollable(isNowScrollable);
      setShowScrollIndicator(isNowScrollable);
    }
  }, [testResults]);

  useEffect(() => {
    console.log("testResults updated:", testResults); // Log testResults
    if (testResults.length > 0) {
      const allTestsPassed = testResults.every(test => test.passed);
      console.log("allTestsPassed:", allTestsPassed); // Log allTestsPassed
      setCanMarkComplete(allTestsPassed);
    } else {
      setCanMarkComplete(false); // No tests run yet or no tests defined
    }
    console.log("canMarkComplete (after update):", canMarkComplete); // Log canMarkComplete
  }, [testResults]);

  const handleScroll = () => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
      setShowScrollIndicator(!isAtBottom);
    }
  };

  useEffect(() => {
    const fetchLessonStatus = async () => {
      if (user) {
        try {
          const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
          const response = await fetch(`${backendUrl}/api/progress`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.ok) {
            const progressData = await response.json();
            const completed = progressData.some((p: any) => p.lessonId === lessonId && p.completed);
            setIsLessonCompleted(completed);
          } else {
            console.error('Failed to fetch progress:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      } else {
        setIsLessonCompleted(false); // Not completed if no user
      }
    };

    fetchLessonStatus();
  }, [user, lessonId]); // Re-fetch when user or lessonId changes

  const handleToggleLessonCompletion = async (completed: boolean) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ lessonId: lessonId, completed: completed }), // Use lessonId prop
      });

      if (response.ok) {
        setIsLessonCompleted(completed); // Update local state on success
        alert(`Lesson marked as ${completed ? 'complete' : 'incomplete'}!`);
      } else {
        const errorData = await response.json();
        alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating lesson status:", error);
      alert("An error occurred while updating the lesson status.");
    }
  };

  const handleGoToPreviousLesson = () => {
    const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId); // Use lessonId prop
    const previousLessonIndex = currentLessonIndex - 1;

    if (previousLessonIndex >= 0) {
      const previousLesson = lessons[previousLessonIndex];
      setCurrentPage(previousLesson.id);
    } else {
      alert("This is the first lesson!");
    }
  };

  const handleGoToNextLesson = () => {
    const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId); // Use lessonId prop
    const nextLessonIndex = currentLessonIndex + 1;

    if (nextLessonIndex < lessons.length) {
      const nextLesson = lessons[nextLessonIndex];
      setCurrentPage(nextLesson.id);
    } else {
      alert("You have completed all lessons!");
      setCurrentPage("lessons"); // Go back to lessons list
    }
  };

  return (
    <main className="pt-32 pb-20 flex-grow">
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentPage("lessons")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            &larr; Back to Lessons
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoToPreviousLesson}
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-2xl"
            >
              &lt;
            </button>
            {/* Checkbox for completion */}
            <input
              type="checkbox"
              checked={isLessonCompleted}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked && !canMarkComplete) {
                  alert("All tests must pass before marking the lesson as complete.");
                } else {
                  handleToggleLessonCompletion(checked);
                }
              }}
              disabled={!canMarkComplete && !isLessonCompleted} // Disable if not all tests passed AND not already completed
              className={`form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out ${isLessonCompleted ? 'lesson-completed-checkbox' : ''}`}
            />
            <button
              onClick={handleGoToNextLesson}
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-2xl"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="lesson-container">
          <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/hello-world.md" />
          <div className="flex flex-col gap-4 h-[700px]">
            <SolidityEditor
              onCompile={setCompiledResult}
              solidityFilePath="/pragmaDAO-website/lessons/solidity/HelloWorld.sol"
              lessonId={lessonId} // Use lessonId prop
              onTestResults={setTestResults}
            />
            {/* Removed Mark as Complete button */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;
