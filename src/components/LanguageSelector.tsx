import React from 'react';
import { Globe2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Language } from '../types';

const languages: { value: Language; label: string }[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'th', label: 'ภาษาไทย' },
];

export const LanguageSelector: React.FC = () => {
  const { explanationLanguage, setExplanationLanguage } = useStore();

  return (
    <div className="flex items-center space-x-2">
      <Globe2 className="w-5 h-5 text-gray-500" />
      <select
        value={explanationLanguage}
        onChange={(e) => setExplanationLanguage(e.target.value as Language)}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};