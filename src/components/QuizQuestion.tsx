import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { QuizChoice } from './QuizChoice';
import { ExplanationDisplay } from './ExplanationDisplay';
import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  question: Question;
  onAnswer: (answer: number) => void;
  explanation: ExplanationResponse | null;
}

export const QuizQuestion: React.FC<Props> = ({ question, onAnswer, explanation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsThinking(false);
  }, [question]);

  const handleAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setIsThinking(true);
    await onAnswer(index);
    setIsThinking(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{question.type}</h3>
        <p className="whitespace-pre-line">{question.question}</p>
        <p className="text-lg font-medium">{question.context}</p>
      </div>

      <div className="space-y-3">
        {question.choices.map((choice, index) => {
          const choiceNumber = index + 1;
          return (
            <QuizChoice
              key={index}
              choice={choice}
              index={index}
              isSelected={selectedAnswer === choiceNumber}
              isCorrect={question.correctAnswer === choiceNumber}
              showResult={selectedAnswer !== null}
              onSelect={() => handleAnswer(choiceNumber)}
              disabled={selectedAnswer !== null}
            />
          );
        })}
      </div>

      {isThinking && <LoadingSpinner />}
      {explanation && <ExplanationDisplay explanation={explanation} />}
    </div>
  );
};