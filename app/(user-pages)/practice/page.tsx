import { Dumbbell } from 'lucide-react';

export default async function PracticePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-red-600/10 mb-4">
          <Dumbbell className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">Practice</h1>
        <p className="mt-2 text-muted-foreground">
          Review and practice your vocabulary to improve retention.
        </p>
      </div>
      {/* Coming Soon */}
      <div className="flex flex-col items-center text-center mb-8 bg-card p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Coming Soon...</h2>
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
