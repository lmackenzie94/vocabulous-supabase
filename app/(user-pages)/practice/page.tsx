import { Dumbbell } from 'lucide-react';

export default async function PracticePage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-red-600/10 mb-4">
          <Dumbbell className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">Practice</h1>
        <p className="mt-2 text-muted-foreground">
          Review and practice your vocabulary to improve retention.
        </p>
      </div> */}
      {/* Coming Soon */}
      <div className="flex flex-col items-center text-center mb-8 bg-card p-8 rounded-lg shadow-md border border-red-200">
        <div className="p-3 rounded-full bg-red-600/10 mb-4">
          <Dumbbell className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
          Practice Mode Coming Soon
        </h1>
        <p className="mt-2 text-muted-foreground">
          Review and practice your vocabulary to improve retention.
        </p>

        <div className="mt-6 flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-red-600 animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></span>
          <span
            className="h-2 w-2 rounded-full bg-red-500 animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></span>
          <span
            className="h-2 w-2 rounded-full bg-red-400 animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></span>
        </div>
      </div>
      {/* {words && words.length > 0 ? (
        // <PracticeSession />
        <p>Practice...</p>
      ) : (
        <NoWordsYet />
      )} */}
    </div>
  );
}
