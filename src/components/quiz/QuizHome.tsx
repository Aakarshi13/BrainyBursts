import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Play, Target } from 'lucide-react';
import { Difficulty, HighScore } from '@/services/quizService';

interface QuizHomeProps {
  onStartQuiz: (difficulty: Difficulty) => void;
  highScores: HighScore[];
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const QuizHome: React.FC<QuizHomeProps> = ({
  onStartQuiz,
  highScores,
  selectedDifficulty,
  onDifficultyChange,
}) => {
  return (
    <div className="bg-sky-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-card bg-purple-100 
                     transform transition-all duration-500 hover:shadow-xl hover:bg-purple-200 
                     hover:scale-105 cursor-pointer group"
          >
            <img 
              src="public\brainquiz.jpg" 
              alt="Logo" 
              className="h-10 w-10 mr-3 rounded-full transform transition-transform duration-300 
                       group-hover:rotate-12 group-hover:scale-110" 
            />
            <h1 
              className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent
                       transition-all duration-500 group-hover:scale-105"
            >
              Brainy Bursts
            </h1>
          </div>
          <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom duration-700 text-black">
            Test your knowledge with 10 challenging questions
          </p>
        </div>

        {/* Quiz Setup Card */}
        <Card className="p-8 shadow-quiz border-0 bg-card/80 backdrop-blur bg-purple-100">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-lg font-bold text-foreground">
                Select Difficulty
              </label>
              <Select value={selectedDifficulty} onValueChange={(value: Difficulty) => onDifficultyChange(value)}>
                <SelectTrigger className="w-full bg-blue-200"> 
                  <SelectValue />
                </SelectTrigger>
                <SelectContent  className="w-full border border-gray-500 focus:ring-0 bg-blue-200">
                  <SelectItem value="easy">Easy - Warm up your brain</SelectItem>
                  <SelectItem value="medium">Medium - Challenge yourself</SelectItem>
                  <SelectItem value="hard">Hard - Expert level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => onStartQuiz(selectedDifficulty)}
              size="lg"
              className="w-full bg-gradient-primary hover:bg-gray-600 hover:shadow-quiz transition-all duration-300 transform hover:scale-105 bg-gray-700"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};