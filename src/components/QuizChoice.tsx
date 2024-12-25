import React from 'react';

interface Props {
  choice: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export const QuizChoice: React.FC<Props> = ({
  choice,
  index,
  isSelected,
  isCorrect,
  showResult,
  onSelect,
  disabled
}) => {
  let buttonStyle = 'bg-gray-50 hover:bg-gray-100';
  if (showResult && isSelected) {
    buttonStyle = isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
  } else if (showResult && isCorrect) {
    buttonStyle = 'bg-green-100 border-green-500';
  }

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full p-3 text-left rounded transition-colors ${buttonStyle} border`}
    >
      {choice}
    </button>
  );
};