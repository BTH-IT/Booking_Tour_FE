import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-28 w-28 animate-spin text-blue-500" />
      <p className="mt-4 text-xl text-blue-600">Loading...</p>
    </div>
  );
}
