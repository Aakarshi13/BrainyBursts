import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Timer } from '@/components/ui/timer';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { QuizQuestion } from '@/services/quizService';
import { cn } from '@/lib/utils';

interface QuizGameProps {
  questions: QuizQuestion[];
  onQuizComplete: (answers: QuizQuestion[]) => void;
  onBack: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onQuizComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizQuestion[]>(questions);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isTimerActive, setIsTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswer = selectedAnswer !== '';

  useEffect(() => {
    // Load existing answer when navigating between questions
    const existingAnswer = answers[currentQuestionIndex]?.userAnswer || '';
    setSelectedAnswer(existingAnswer);
    setIsTimerActive(true);
  }, [currentQuestionIndex, answers]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      ...updatedAnswers[currentQuestionIndex],
      userAnswer: answer,
      isCorrect: answer === currentQuestion.answer,
    };
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleFinish();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    if (!hasAnswer && !isLastQuestion) {
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  };

  const handleFinish = () => {
    onQuizComplete(answers);
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="text-center">
            <div className="text-sm text-black font-medium ">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={questions.length}
              className="w-64 mt-2 "
            />
          </div>
          <div className="w-20"> {/* Spacer for balance */}</div>
        </div>

        {/* Timer */}
        <Card className="p-4 shadow-card border-0 bg-card/80 backdrop-blur">
          <Timer
            seconds={30}
            onTimeUp={handleTimeUp}
            isActive={isTimerActive && !hasAnswer}
            key={currentQuestionIndex} // Reset timer for each question
          />
        </Card>

        {/* Question Card */}
        <Card className="p-8 shadow-quiz border-0 bg-card/80 backdrop-blur">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!isTimerActive && !hasAnswer}
                  className={cn(
                    "p-4 text-left rounded-lg border-2 transition-all duration-200 hover:scale-[1.02]",
                    selectedAnswer === option
                      ? "border-primary bg-primary/10 shadow-quiz"
                      : "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
                    !isTimerActive && !hasAnswer && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                      selectedAnswer === option
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-black font-medium">
            {answers.filter(q => q.userAnswer).length} of {questions.length} answered
          </div>

          <Button
            onClick={isLastQuestion ? handleFinish : handleNext}
            disabled={!hasAnswer}
            className={cn(
              "gap-2",
              isLastQuestion 
                ? "bg-gradient-success hover:shadow-success" 
                : "bg-gradient-primary hover:shadow-quiz"
            )}
          >
            {isLastQuestion ? (
              <>
                <Flag className="h-4 w-4" />
                Finish
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};