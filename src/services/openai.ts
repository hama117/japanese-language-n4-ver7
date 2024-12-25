import OpenAI from 'openai';
import { Language, ExplanationResponse } from '../types';
import { languagePrompts } from './prompts';

export async function getExplanation(
  questionType: string,
  question: string,
  context: string,
  userAnswer: number,
  correctAnswer: number,
  language: Language,
  apiKey: string
): Promise<ExplanationResponse> {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const isCorrect = userAnswer === correctAnswer;
  const langPrompt = languagePrompts[language];

  const getPromptByType = (type: string) => {
    const basePrompt = `
You are a Japanese language teacher. Please explain the following JLPT N4 question in ${language}:

Question Type: ${type}
Question: ${question}
Context: ${context}
Student's Answer: ${userAnswer}
Correct Answer: ${correctAnswer}

Explanation Guidelines:`;

    const prompts = {
      '漢字読み': `${basePrompt}
1. Key Points:
• This is a kanji reading question
• Importance of this kanji reading

2. Meaning:
• Basic reading of the kanji used in the question
• How the kanji is used in context

3. Answer Explanation:
• Explanation of the correct reading
• Distinction between on-yomi and kun-yomi
• Common words using this kanji

4. Learning Points:
• Characteristics of this kanji reading
• Comparison with similar kanji readings
• Tips for memorization`,

      '漢字表記': `${basePrompt}
1. Key Points:
• Selection of appropriate kanji
• Using kanji that fits the context

2. Meaning:
• Meaning of the sentence and context
• Common usage of the kanji

3. Answer Explanation:
• Why this kanji is correct
• Differences from other options
• Common usage examples

4. Learning Points:
• Rules for kanji usage
• Distinguishing similar kanji
• Comparison with similar expressions`,

      '文脈規定': `${basePrompt}
1. Key Points:
• Selecting appropriate expressions for the context
• Understanding the situation

2. Meaning:
• Explanation of the conversation or text situation
• Important points in the context

3. Answer Explanation:
• Why this expression is appropriate
• How expressions vary by situation
• Why other options are inappropriate

4. Learning Points:
• How to choose expressions by context
• Similar expressions in different situations
• Context dependency in Japanese`,

      '言い換え': `${basePrompt}
1. Key Points:
• Understanding alternative expressions with the same meaning
• Grasping nuance differences

2. Meaning:
• Meaning of the original expression
• Usage in context

3. Answer Explanation:
• Explanation of the correct paraphrase
• Differences in expressions and nuances
• Usage situations

4. Learning Points:
• How to use different expressions
• Comparison with similar expressions
• Situational usage`,

      '用法': `${basePrompt}
1. Key Points:
• Correct usage of phrases
• Appropriate context usage

2. Meaning:
• Basic meaning of the phrase
• Usage characteristics

3. Answer Explanation:
• Explanation of correct usage
• Differences from incorrect usage
• Real usage examples

4. Learning Points:
• Basic usage of phrases
• Points to note
• Differences from similar expressions`,

      '文法1': `${basePrompt}
1. Key Points:
• Basic understanding of grammar point
• Selecting correct conjugation

2. Meaning:
• Basic meaning of the grammar point
• Situations where it's used

3. Answer Explanation:
• Explanation of grammar usage
• Conjugation rules
• Practical usage examples

4. Learning Points:
• Basic grammar rules
• Conjugation patterns
• Common mistakes`,

      '文法2': `${basePrompt}
1. Key Points:
• Understanding complex grammar points
• Selecting appropriate forms for context

2. Meaning:
• Meaning and usage of compound grammar
• Role in context

3. Answer Explanation:
• Explanation of grammar combinations
• Usage conditions
• Practical examples

4. Learning Points:
• Rules for compound grammar
• Usage notes
• Application patterns`
    };

    return prompts[type] || prompts['文法1'];
  };

  const prompt = getPromptByType(questionType);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 800,
    presence_penalty: 0.1,
    frequency_penalty: 0.1,
  });

  return {
    isCorrect,
    explanation: `${isCorrect ? langPrompt.correct : langPrompt.incorrect}\n\n${response.choices[0]?.message?.content || ''}`,
  };
}