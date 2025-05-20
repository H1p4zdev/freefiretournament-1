import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MainContent() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Your Project
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            This is a clean Vite + React + Tailwind CSS starter template
          </p>
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleClick}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Click Me
            </Button>
          </div>
          {clickCount > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              Button clicked {clickCount} time{clickCount !== 1 ? 's' : ''}
            </p>
          )}
          <div className="mt-6">
            <p className="text-sm text-gray-500">Ready for you to customize</p>
          </div>
        </div>
      </div>
    </main>
  );
}
