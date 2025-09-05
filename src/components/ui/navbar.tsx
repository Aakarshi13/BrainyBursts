import React from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-400 to-gray-900 transition-all duration-500 hover:from-blue-500 hover:to-gray-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center px-4 group">
          <img 
            src="public\brainquiz.jpg" 
            alt="Logo" 
            className="h-10 w-10 mr-3 rounded-full transform transition-transform duration-300 hover:scale-110" 
          />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-purple-800 font-serif transition-all duration-300 group-hover:scale-105">
            Brainy Bursts
          </h1>
        </div>
        <nav className="flex items-center space-x-6 ">
          <Link 
            to="/" 
            className={cn(
              "text-xl font-medium transition-transform duration-300 hover:scale-105"
            )}
          > 
            <Button 
              variant="ghost"  
              className="text-xl text-black font-bold hover:text-blue-950 hover:bg-sky-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Home
            </Button>
          </Link>
          <Link 
            to="/high-scores" 
            className={cn(
              "text-xl font-medium transition-transform duration-300 hover:scale-105"
            )}
          >
            <Button 
              variant="ghost" 
              className="text-xl text-black font-bold hover:text-blue-950 hover:bg-sky-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              High Scores
            </Button>
          </Link>
          <Popover>
            <PopoverTrigger>
              <Button 
                variant="ghost" 
                className="text-xl text-black font-bold transition-all duration-300 hover:text-blue-950 hover:bg-sky-200 transform hover:scale-105 hover:shadow-lg"
              >
                About
              </Button>
            </PopoverTrigger>
            <PopoverContent className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
              <p className="text-sm text-muted-foreground transition-colors duration-200 hover:text-blue-600">
                Brainy Bursts is an interactive quiz platform designed to test your knowledge 
                and improve your skills across various topics. Challenge yourself and have fun!
              </p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" className="text-xl text-black font-bold transition-colors hover:text-blue-950 hover:bg-sky-200">
                Contact
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm text-muted-foreground">
                For inquiries, reach out to us at{' '}
                <a 
                  href="mailto:support@brainybursts.com" 
                  className="text-primary underline hover:text-primary/90"
                >
                  support@brainybursts.com
                </a>
              </p>
            </PopoverContent>
          </Popover>
        </nav>
      </div>
    </header>
  );
};
