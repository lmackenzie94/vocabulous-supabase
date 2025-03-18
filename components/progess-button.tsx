import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

interface ProgressButtonProps {
  duration?: number; // in seconds
  onClick: () => void;
  onComplete?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function ProgressButton({
  duration = 10,
  onClick,
  onComplete,
  className,
  children
}: ProgressButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(elapsed / (duration * 1000), 1);

      setProgress(newProgress);

      if (now >= endTime) {
        setIsRunning(false);
        onComplete?.();
        animationRef.current = null;
      } else if (isRunning) {
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRunning, duration, onComplete]);

  const handleClick = () => {
    setIsRunning(false);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden rounded-full px-4 py-1 font-medium text-white transition-all duration-300 text-sm',
        'bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
        className
      )}
    >
      <span className="relative inline-block z-10">{children}</span>
      <div
        className="absolute z-0 inset-0 left-0 top-0 bg-red-500 transition-all"
        style={{
          width: `${progress * 100}%`,
          transition: isRunning ? 'none' : 'width 0.3s ease-out'
        }}
      />
    </button>
  );
}
