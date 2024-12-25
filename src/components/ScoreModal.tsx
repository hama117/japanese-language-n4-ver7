import React from 'react';
import { Trophy } from 'lucide-react';

interface Props {
  score: number;
  onClose: () => void;
}

export const ScoreModal: React.FC<Props> = ({ score, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold">10問完了！</h2>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-4xl font-bold text-blue-600">{score} / 10</p>
          <p className="text-gray-600">正解数</p>
        </div>
        
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            次のセクションへ
          </button>
        </div>
      </div>
    </div>
  );
};