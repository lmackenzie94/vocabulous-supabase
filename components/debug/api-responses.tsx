'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const APIResponses = ({ user, words }: { user: any; words: any }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        size="sm"
        variant="outline"
        className="absolute top-2 right-2"
      >
        🪲
      </Button>
      {visible && (
        <div className="absolute top-0 left-0 h-full flex flex-col gap-2 text-[8px] bg-white/50">
          <pre className="font-mono p-3 rounded border overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>

          <pre className="font-mono p-3 rounded border overflow-auto">
            {JSON.stringify(words, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};
