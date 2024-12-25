import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../types';

interface AppState {
  apiKey: string;
  setApiKey: (key: string) => void;
  explanationLanguage: Language;
  setExplanationLanguage: (lang: Language) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),
      explanationLanguage: 'ja',
      setExplanationLanguage: (lang) => set({ explanationLanguage: lang }),
    }),
    {
      name: 'jlpt-quiz-storage',
      partialize: (state) => ({
        apiKey: state.apiKey,
        explanationLanguage: state.explanationLanguage,
      }),
    }
  )
);