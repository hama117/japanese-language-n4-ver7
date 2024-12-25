import React from 'react';
import { Brain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2 p-4">
      <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
      <div className="text-blue-600 animate-pulse">Thinking...</div>
    </div>
  );
};