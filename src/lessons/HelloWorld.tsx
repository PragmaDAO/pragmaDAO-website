import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const { user, token } = useAuth(); // Get user and token from AuthContext
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const testResultsContainerRef = useRef<HTMLDivElement>(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false); // New state for completion
  const [canMarkComplete, setCanMarkComplete] = useState(false); // New state for test pass status

  const handleToggleLessonCompletion = useCallback(async (completed: boolean) => {
    if (!user || !token) {
      setCurrentPage('login');
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
      console.log('Updating lesson completion:', lessonId, 'to:', completed);
      const response = await fetch(`${backendUrl}/api/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId: lessonId, completed: completed }), // Use lessonId prop
      });

      if (response.ok) {
        console.log('Successfully updated lesson completion in backend');
        setIsLessonCompleted(completed); // Update local state on success
        
      } else {
        const errorData = await response.json();
        console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
        alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating lesson status:", error);
      alert("An error occurred while updating the lesson status.");
    }
  }, [user, token, lessonId, setCurrentPage]);

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
  }, [testResults, canMarkComplete]);

  useEffect(() => {
    // Automatically mark lesson complete if all tests pass and it's not already completed
    if (canMarkComplete && !isLessonCompleted) {
      handleToggleLessonCompletion(true);
    }
  }, [canMarkComplete, isLessonCompleted, handleToggleLessonCompletion]);

  const handleScroll = () => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
      setShowScrollIndicator(!isAtBottom);
    }
  };

  useEffect(() => {
    const fetchLessonStatus = async () => {
      if (user && token) {
        try {
          const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
          console.log('Fetching lesson status for:', lessonId, 'from:', `${backendUrl}/api/progress`);
          const response = await fetch(`${backendUrl}/api/progress`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const progressData = await response.json();
            console.log('Progress data received:', progressData);
            const completed = progressData.some((p: any) => p.lessonId === lessonId && p.completed);
            console.log('Lesson completed status:', completed, 'for lessonId:', lessonId);
            setIsLessonCompleted(completed);
          } else {
            console.error('Failed to fetch progress:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      } else {
        setIsLessonCompleted(false); // Not completed if no user
        console.log('No user or token, setting lesson as incomplete');
      }
    };

    fetchLessonStatus();
  }, [user, token, lessonId]); // Re-fetch when user or lessonId changes

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
            {/* Status circle */}
            <div
              onClick={() => {
                if (isLessonCompleted) {
                  // If currently completed, allow uncompleting (turn red)
                  handleToggleLessonCompletion(false);
                } else if (canMarkComplete) {
                  // Only allow marking complete if tests have passed
                  handleToggleLessonCompletion(true);
                } else {
                  // Tests haven't passed, show alert
                  alert("All tests must pass before marking the lesson as complete.");
                }
              }}
              className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                isLessonCompleted 
                  ? 'bg-green-500' 
                  : canMarkComplete 
                    ? 'bg-green-300 hover:bg-green-400'
                    : 'bg-red-500'
              }`}
              title={
                isLessonCompleted
                  ? 'Lesson completed - click to unmark'
                  : canMarkComplete
                    ? 'Tests passed - click to mark complete'
                    : 'Tests not passed - run tests first'
              }
            />
            <button
              onClick={handleGoToPreviousLesson}
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-2xl"
            >
              &lt;
            </button>
            <button
              onClick={handleGoToNextLesson}
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-2xl"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="lesson-container">
          <Lesson markdownPath="/lessons/markdown/hello-world.md" />
          <div className="flex flex-col gap-4 h-[700px]">
            <SolidityEditor
              onCompile={setCompiledResult}
              solidityFilePath="/pragmaDAO-website/lessons/solidity/HelloWorld.sol"
              lessonId={lessonId} // Use lessonId prop
              onTestResults={setTestResults}
              onAllTestsPassed={(passed: boolean) => setCanMarkComplete(passed)} // New prop
            />
            {/* Removed Mark as Complete button */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;
