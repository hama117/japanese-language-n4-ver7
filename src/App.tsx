import React, { useState, useCallback } from 'react';
import { GraduationCap } from 'lucide-react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { LanguageSelector } from './components/LanguageSelector';
import { FileUpload } from './components/FileUpload';
import { QuizQuestion } from './components/QuizQuestion';
import { ScoreModal } from './components/ScoreModal';
import { Question, ExplanationResponse } from './types';
import { useStore } from './store/useStore';
import { useQuizScore } from './hooks/useQuizScore';
import { getExplanation } from './services/openai';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const { apiKey, explanationLanguage } = useStore();
  const { score, updateScore } = useQuizScore();

  const handleQuestionsLoad = useCallback((loadedQuestions: Question[]) => {
    setQuestions(loadedQuestions);
    const randomIndex = Math.floor(Math.random() * loadedQuestions.length);
    setCurrentQuestion(loadedQuestions[randomIndex]);
    setExplanation(null);
  }, []);

  const handleAnswer = async (answer: number) => {
    if (!currentQuestion || !apiKey) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    updateScore(isCorrect);

    try {
      const explanationResponse = await getExplanation(
        currentQuestion.type,
        currentQuestion.question,
        currentQuestion.context,
        answer,
        currentQuestion.correctAnswer,
        explanationLanguage,
        apiKey
      );
      setExplanation(explanationResponse);

      // 10問終わったらモーダルを表示
      if (score.total === 9) {
        setShowScoreModal(true);
      }
    } catch (error) {
      console.error('Error getting explanation:', error);
      alert('説明の取得中にエラーが発生しました。APIキーを確認してください。');
    }
  };

  const nextQuestion = () => {
    const remainingQuestions = questions.filter(q => q !== currentQuestion);
    if (remainingQuestions.length === 0) {
      alert('全ての問題が終了しました。新しいCSVファイルをアップロードしてください。');
      setCurrentQuestion(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    setCurrentQuestion(remainingQuestions[randomIndex]);
    setExplanation(null);
  };

  const handleModalClose = () => {
    setShowScoreModal(false);
    nextQuestion();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">日本語能力検定N4</h1>
          </div>
          <p className="mt-2 text-gray-600">日本語能力を測定するクイズ</p>
        </div>

        {!apiKey && <ApiKeyInput />}

        {apiKey && !currentQuestion && (
          <div className="space-y-6">
            <LanguageSelector />
            <FileUpload onQuestionsLoad={handleQuestionsLoad} />
          </div>
        )}

        {currentQuestion && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <span className="text-sm text-gray-600">
                  問題: {score.total + 1}/10
                </span>
              </div>
              <button
                onClick={nextQuestion}
                disabled={!explanation}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                次の問題
              </button>
            </div>
            <QuizQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
              explanation={explanation}
            />
          </div>
        )}

        {showScoreModal && (
          <ScoreModal
            score={score.correct}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}

export default App;