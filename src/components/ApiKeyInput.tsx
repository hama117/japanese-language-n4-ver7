import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useStore();
  const [key, setKey] = useState(apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(key);
  };

  const handleClear = () => {
    setApiKey('');
    setKey('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Key className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">OpenAI API Key</h2>
        </div>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Set API Key
          </button>
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
};