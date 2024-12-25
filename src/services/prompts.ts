import { Language } from '../types';

interface LanguagePrompt {
  correct: string;
  incorrect: string;
  format: string;
}

export const languagePrompts: Record<Language, LanguagePrompt> = {
  ja: {
    correct: '✨ 正解です！',
    incorrect: '❌ 残念ながら不正解です。',
    format: `
問題のポイント:
• 問題の種類（文法・語彙・読解など）
• 問題で問われている能力や知識

文の意味:
• 問題文の説明
• 重要な文脈や状況の説明
• キーワードや重要表現の説明

正解の解説:
• なぜその答えが正しいのか
• 文法・語彙のポイント
• 日常生活での使用例

学習のポイント:
• この問題から学べる重要なポイント
• 類似の表現や関連する学習項目
• 覚えておくべきこと
`
  },
  en: {
    correct: '✨ Correct!',
    incorrect: '❌ Incorrect.',
    format: `
Key Points:
• Type of question (grammar, vocabulary, reading, etc.)
• Skills and knowledge being tested

Meaning:
• Explanation of the question
• Important context and situation
• Keywords and key expressions

Answer Explanation:
• Why this answer is correct
• Grammar and vocabulary points
• Usage in daily life

Learning Points:
• Important points from this question
• Similar expressions and related items
• Points to remember
`
  },
  zh: {
    correct: '✨ 回答正确！',
    incorrect: '❌ 回答错误。',
    format: `
题目要点：
• 题目类型（语法、词汇、阅读等）
• 考察的能力和知识

句子含义：
• 题目说明
• 重要语境和情况
• 关键词和重要表达

答案解释：
• 为什么这个答案是正确的
• 语法和词汇要点
• 日常生活中的用法

学习要点：
• 从这个题目中学到的重要内容
• 相似表达和相关项目
• 需要记住的要点
`
  },
  vi: {
    correct: '✨ Chính xác!',
    incorrect: '❌ Không chính xác.',
    format: `
Điểm chính:
• Loại câu hỏi (ngữ pháp, từ vựng, đọc hiểu)
• Kỹ năng và kiến thức được kiểm tra

Ý nghĩa:
• Giải thích câu hỏi
• Ngữ cảnh và tình huống quan trọng
• Từ khóa và cách diễn đạt chính

Giải thích đáp án:
• Tại sao đáp án này đúng
• Điểm ngữ pháp và từ vựng
• Cách sử dụng trong đời sống

Điểm học tập:
• Những điểm quan trọng từ câu hỏi này
• Cách diễn đạt tương tự và các mục liên quan
• Những điểm cần nhớ
`
  },
  id: {
    correct: '✨ Benar!',
    incorrect: '❌ Kurang tepat.',
    format: `
Poin Utama:
• Jenis pertanyaan (tata bahasa, kosakata, membaca)
• Kemampuan dan pengetahuan yang diuji

Arti:
• Penjelasan pertanyaan
• Konteks dan situasi penting
• Kata kunci dan ungkapan penting

Penjelasan Jawaban:
• Mengapa jawaban ini benar
• Poin tata bahasa dan kosakata
• Penggunaan dalam kehidupan sehari-hari

Poin Pembelajaran:
• Poin penting dari pertanyaan ini
• Ungkapan serupa dan item terkait
• Hal-hal yang perlu diingat
`
  },
  th: {
    correct: '✨ ถูกต้อง!',
    incorrect: '❌ ไม่ถูกต้อง',
    format: `
จุดสำคัญ:
• ประเภทคำถาม (ไวยากรณ์ คำศัพท์ การอ่าน)
• ทักษะและความรู้ที่ทดสอบ

ความหมาย:
• คำอธิบายคำถาม
• บริบทและสถานการณ์สำคัญ
• คำสำคัญและสำนวนสำคัญ

คำอธิบายคำตอบ:
• เหตุใดคำตอบนี้จึงถูกต้อง
• จุดไวยากรณ์และคำศัพท์
• การใช้ในชีวิตประจำวัน

จุดการเรียนรู้:
• จุดสำคัญจากคำถามนี้
• สำนวนที่คล้ายกันและรายการที่เกี่ยวข้อง
• สิ่งที่ควรจำ
`
  }
};