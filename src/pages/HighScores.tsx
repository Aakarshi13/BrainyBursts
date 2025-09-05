import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  ChevronDown, 
  Medal, 
  Star,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { HighScore } from '@/services/quizService';
import { getHighScores } from '@/services/quizService';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortKey = 'date' | 'score' | 'difficulty';
type SortOrder = 'asc' | 'desc';

export const HighScores = () => {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  const allScores = getHighScores();
  
  // Filter and sort scores
  const filteredScores = allScores
    .filter(score => selectedDifficulty === 'all' || score.difficulty === selectedDifficulty)
    .sort((a, b) => {
      let compareA = sortKey === 'date' ? new Date(a.date).getTime() : 
                    sortKey === 'score' ? a.score : 
                    a.difficulty;
      let compareB = sortKey === 'date' ? new Date(b.date).getTime() :
                    sortKey === 'score' ? b.score :
                    b.difficulty;
                    
      return sortOrder === 'asc' 
        ? compareA > compareB ? 1 : -1
        : compareA < compareB ? 1 : -1;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getScoreBadgeColor = (index: number) => {
    switch(index) {
      case 0: return "bg-yellow-500/20 text-yellow-500";
      case 1: return "bg-gray-500/20 text-gray-500";
      case 2: return "bg-orange-500/20 text-orange-500";
      default: return "bg-blue-500/20 text-blue-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-card">
            <Trophy className="h-8 w-8 text-yellow-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Hall of Fame
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Track your progress and compete with yourself!
          </p>
        </div>

        {/* Filters and Controls */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {selectedDifficulty === 'all' ? 'All Difficulties' : selectedDifficulty}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('all')}>
                    All Difficulties
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('easy')}>
                    Easy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('medium')}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('hard')}>
                    Hard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSort('score')}
                className="gap-2"
              >
                Score
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSort('date')}
                className="gap-2"
              >
                Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Scores List */}
        <div className="space-y-4">
          {filteredScores.map((score, index) => (
            <Card 
              key={score.date} 
              className="p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  getScoreBadgeColor(index)
                )}>
                  {index === 0 ? (
                    <Trophy className="h-6 w-6" />
                  ) : index === 1 ? (
                    <Medal className="h-6 w-6" />
                  ) : index === 2 ? (
                    <Star className="h-6 w-6" />
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      {score.score}/{score.totalQuestions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((score.score / score.totalQuestions) * 100)}% Correct
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-medium capitalize">
                      {score.difficulty}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Difficulty
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-medium">
                      {formatDate(score.date)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredScores.length === 0 && (
            <Card className="p-8 text-center">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Scores Yet</h3>
              <p className="text-muted-foreground">
                Complete some quizzes to see your scores here!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
