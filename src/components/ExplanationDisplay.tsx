import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ExplanationResponse } from '../types';

interface Props {
  explanation: ExplanationResponse;
}

export const ExplanationDisplay: React.FC<Props> = ({ explanation }) => {
  return (
    <div className={`mt-6 p-4 rounded ${
      explanation.isCorrect ? 'bg-green-50' : 'bg-red-50'
    }`}>
      <TypeAnimation
        sequence={[explanation.explanation]}
        wrapper="p"
        speed={50}  // 速度を150から50に変更（数値が小さいほど速い）
        cursor={false}
        className="whitespace-pre-line"
      />
    </div>
  );
};