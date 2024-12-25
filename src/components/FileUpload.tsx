import React, { useCallback, useState } from 'react';
import Papa from 'papaparse';
import { Question } from '../types';
import { parseCSVData } from '../utils/csvParser';
import { UploadAnimation } from './UploadAnimation';

interface Props {
  onQuestionsLoad: (questions: Question[]) => void;
}

export const FileUpload: React.FC<Props> = ({ onQuestionsLoad }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    Papa.parse(file, {
      complete: (results) => {
        const questions = parseCSVData(results.data);
        if (questions.length === 0) {
          alert('CSVファイルの形式が正しくありません。\n形式: 問題種類,問題文,問題文脈,選択肢1,選択肢2,選択肢3,選択肢4,解答番号');
          setIsUploading(false);
          return;
        }
        
        // アップロードアニメーションを表示
        setTimeout(() => {
          onQuestionsLoad(questions);
          setIsUploading(false);
        }, 1500);
      },
      error: (error) => {
        alert('CSVファイルの読み込みに失敗しました: ' + error.message);
        setIsUploading(false);
      }
    });
  }, [onQuestionsLoad]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className={`
          w-full flex flex-col items-center px-4 py-6 
          bg-white rounded-lg shadow-lg tracking-wide 
          border-2 cursor-pointer 
          transition-all duration-300
          ${isUploading 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
          }
        `}>
          <UploadAnimation isUploading={isUploading} />
          <span className={`
            mt-2 text-base font-medium
            transition-colors duration-300
            ${isUploading ? 'text-blue-600' : 'text-gray-700'}
          `}>
            {isUploading ? 'アップロード中...' : 'CSVファイルをアップロード'}
          </span>
          <span className="mt-1 text-sm text-gray-500">
            形式: 問題種類,問題文,問題文脈,選択肢1,選択肢2,選択肢3,選択肢4,解答番号
          </span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>
      <div className="text-sm text-gray-600">
        <p>CSVファイル例:</p>
        <pre className="bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
          漢字読み,_____のことばはひらがなでどうかきますか。,くつに__石__が入っていました。,いし,すな,くさ,えだ,1
        </pre>
      </div>
    </div>
  );
};