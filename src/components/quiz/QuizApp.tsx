import React, { useState, useEffect } from 'react';
import { QuizHome } from './QuizHome';
import { QuizGame } from './QuizGame';
import { QuizResults } from './QuizResults';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { 
  fetchQuizQuestions, 
  QuizQuestion, 
  Difficulty, 
  saveHighScore, 
  getHighScores,
  HighScore 
} from '@/services/quizService';

type QuizState = 'home' | 'loading' | 'playing' | 'results' | 'error';

export const QuizApp: React.FC = () => {
  const [state, setState] = useState<QuizState>('home');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  const handleStartQuiz = async (difficulty: Difficulty) => {
    setState('loading');
    setError('');
    
    try {
      const fetchedQuestions = await fetchQuizQuestions(difficulty);
      setQuestions(fetchedQuestions);
      setState('playing');
    } catch (err) {
      setError('Failed to load quiz questions. Please check your internet connection and try again.');
      setState('error');
    }
  };

  const handleQuizComplete = (answeredQuestions: QuizQuestion[]) => {
    const correctAnswers = answeredQuestions.filter(q => q.isCorrect).length;
    
    // Save high score
    const newScore: HighScore = {
      score: correctAnswers,
      totalQuestions: answeredQuestions.length,
      difficulty: selectedDifficulty,
      date: new Date().toISOString(),
    };
    
    saveHighScore(newScore);
    setHighScores(getHighScores());
    setQuestions(answeredQuestions);
    setState('results');
  };

  const handleRestart = () => {
    setState('home');
    setQuestions([]);
    setError('');
  };

  const handleRetry = () => {
    handleStartQuiz(selectedDifficulty);
  };

  return (
    <>
      {state === 'loading' && (
        <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
          <Card className="p-8 shadow-quiz border-0 bg-card/80 backdrop-blur text-center">
            <div className="space-y-4">
              <RefreshCw className="h-12 w-12 text-primary mx-auto animate-spin" />
              <h2 className="text-2xl font-semibold">Loading Quiz...</h2>
              <p className="text-muted-foreground">
                Fetching {selectedDifficulty} difficulty questions
              </p>
            </div>
          </Card>
        </div>
      )}
      {state === 'error' && (
        <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
          <Card className="p-8 shadow-quiz border-0 bg-card/80 backdrop-blur text-center max-w-md">
            <div className="space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
              <p className="text-muted-foreground">{error}</p>
              <div className="space-y-2">
                <Button onClick={handleRetry} className="w-full bg-gradient-primary">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={handleRestart} className="w-full">
                  Back to Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {state === 'home' && (
        <QuizHome
          onStartQuiz={handleStartQuiz}
          highScores={highScores}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
        />
      )}
      {state === 'playing' && (
        <QuizGame
          questions={questions}
          onQuizComplete={handleQuizComplete}
          onBack={handleRestart}
        />
      )}
      {state === 'results' && (
        <QuizResults
          questions={questions}
          onRestart={handleRestart}
          difficulty={selectedDifficulty}
        />
      )}
    </>
  );
};