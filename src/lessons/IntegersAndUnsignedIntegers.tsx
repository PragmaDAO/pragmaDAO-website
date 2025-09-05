import React, { useState, useRef, useEffect } from "react";
import SolidityEditor from "../components/SolidityEditor";
import { CompiledOutput, TestCase } from "../types";
import Lesson from "../components/Lesson";
import ScrollIndicator from "../components/ScrollIndicator";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const IntegersAndUnsignedIntegers: React.FC<{
  setCurrentPage: (page: string) => void;
}> = ({ setCurrentPage }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const testResultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isNowScrollable = container.scrollHeight > container.clientHeight;
      setIsScrollable(isNowScrollable);
      setShowScrollIndicator(isNowScrollable);
    }
  }, [testResults]);

  const handleScroll = () => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
      setShowScrollIndicator(!isAtBottom);
    }
  };

  const handleMarkComplete = async () => {
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
        body: JSON.stringify({ lessonId: "IntegersAndUnsignedIntegers", completed: true }),
      });

      if (response.ok) {
        alert("Lesson marked as complete!");
        // Optionally, re-fetch progress for LessonsPage or update local state
      } else {
        const errorData = await response.json();
        alert(`Failed to mark lesson complete: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error marking lesson complete:", error);
      alert("An error occurred while marking the lesson complete.");
    }
  };

  return (
    <main className="pt-32 pb-20 flex-grow">
      <section className="container mx-auto px-6">
        <button
          onClick={() => setCurrentPage("lessons")}
          className="text-indigo-400 hover:text-indigo-300 font-semibold mb-8"
        >
          &larr; Back to Lessons
        </button>
        <div className="lesson-container">
          <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/integers-and-unsigned-integers.md" />
          <div className="flex flex-col gap-4 h-[700px]">
            <SolidityEditor
              onCompile={setCompiledResult}
              solidityFilePath="/pragmaDAO-website/lessons/solidity/IntegersAndUnsignedIntegers.sol"
              lessonId="IntegersAndUnsignedIntegers"
            />
            <button
              onClick={handleMarkComplete}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IntegersAndUnsignedIntegers;
