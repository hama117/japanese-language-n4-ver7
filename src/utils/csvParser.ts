import { Question } from '../types';

export const parseCSVData = (data: any[]): Question[] => {
  return data
    .filter((row: any[]) => row.length >= 7)
    .map((row: string[]) => ({
      type: row[0],
      question: row[1],
      context: row[2],
      choices: [row[3], row[4], row[5], row[6]],
      correctAnswer: parseInt(row[7], 10) || 1
    }))
    .filter(q => !isNaN(q.correctAnswer) && q.correctAnswer >= 1 && q.correctAnswer <= 4);
};