import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import { QuizQuestion, Difficulty } from '@/services/quizService';
import { cn } from '@/lib/utils';

interface QuizResultsProps {
  questions: QuizQuestion[];
  onRestart: () => void;
  difficulty: Difficulty;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  onRestart,
  difficulty,
}) => {
  const correctAnswers = questions.filter(q => q.isCorrect).length;
  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreGradient = () => {
    if (percentage >= 80) return 'bg-gradient-success';
    if (percentage >= 60) return 'bg-gradient-warning';
    return 'bg-gradient-primary';
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
    if (percentage >= 80) return "Excellent work! Great knowledge! 🎉";
    if (percentage >= 70) return "Good job! You know your stuff! 👏";
    if (percentage >= 50) return "Not bad! Room for improvement! 💪";
    return "Keep learning and try again! 📚";
  };

  return (

    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-card bg-blue-950">
            <Trophy className="h-8 w-8 text-warning" />
            <h1 className="text-3xl font-bold text-white">Quiz Completed!</h1>
          </div>
        </div>

        {/* Score Summary */}
        <Card className="p-8 shadow-quiz border-0 bg-card/80 backdrop-blur text-center bg-sky-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className={cn("text-2xl font-semibold", getScoreColor())}>
                {percentage}% Correct
              </div>
              <div className="text-lg text-black capitalize">
                Difficulty: {difficulty}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500">
              <p className="text-xl font-medium">{getScoreMessage()}</p>
            </div>

            <Button
              onClick={onRestart}
              size="lg"
              className={cn("gap-2 transition-all duration-300 transform hover:scale-105", getScoreGradient())}
            >
              <RotateCcw className="h-5 w-5" />
              Try Again
            </Button>
          </div>
        </Card>

        {/* Question Review */}
        <Card className="p-6 shadow-card border-0  backdrop-blur bg-sky-100">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-gray-700" />
            <h3 className="text-xl font-bold">Question Review</h3>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={cn(
                  "p-4 rounded-lg border",
                  question.isCorrect
                    ? "border-success/20 bg-success/5"
                    : "border-destructive/20 bg-destructive/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {question.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-success " />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="font-medium">
                      Question {index + 1}: {question.question}
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      {question.userAnswer && (
                        <div className={cn(
                          "flex items-center gap-2",
                          question.isCorrect ? "text-success" : "text-destructive"
                        )}>
                          <span className="font-medium">Your answer:</span>
                          {question.userAnswer}
                        </div>
                      )}
                      
                      {!question.isCorrect && (
                        <div className="flex items-center gap-2 text-success">
                          <span className="font-medium">Correct answer:</span>
                          {question.answer}
                        </div>
                      )}
                      
                      {!question.userAnswer && (
                        <div className="text-muted-foreground italic">
                          No answer provided (time expired)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};