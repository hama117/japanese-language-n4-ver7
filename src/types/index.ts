export type Question = {
  type: string;
  question: string;
  context: string;
  choices: string[];
  correctAnswer: number;
};

export type Language = 'ja' | 'en' | 'zh' | 'vi' | 'id' | 'th';

export type ExplanationResponse = {
  isCorrect: boolean;
  explanation: string;
};