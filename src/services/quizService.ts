export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface QuizApiResponse {
  response_code: number;
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';

// Decode HTML entities
const decodeHtml = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const fetchQuizQuestions = async (difficulty: Difficulty): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    const data: QuizApiResponse = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('API returned an error');
    }
    
    return data.results.map((item, index) => {
      const decodedQuestion = decodeHtml(item.question);
      const decodedCorrectAnswer = decodeHtml(item.correct_answer);
      const decodedIncorrectAnswers = item.incorrect_answers.map(decodeHtml);
      
      // Combine and shuffle options
      const allOptions = [decodedCorrectAnswer, ...decodedIncorrectAnswers];
      const shuffledOptions = shuffleArray(allOptions);
      
      return {
        id: `question-${index}`,
        question: decodedQuestion,
        options: shuffledOptions,
        answer: decodedCorrectAnswer,
      };
    });
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};

// High scores management
export interface HighScore {
  score: number;
  totalQuestions: number;
  difficulty: Difficulty;
  date: string;
}

export const saveHighScore = (score: HighScore): void => {
  const existingScores = getHighScores();
  const newScores = [...existingScores, score].sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem('quiz-high-scores', JSON.stringify(newScores));
};

export const getHighScores = (): HighScore[] => {
  try {
    const scores = localStorage.getItem('quiz-high-scores');
    return scores ? JSON.parse(scores) : [];
  } catch {
    return [];
  }
};