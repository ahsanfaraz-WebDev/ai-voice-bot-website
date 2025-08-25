'use client';

interface AvatarFallbackProps {
  className?: string;
}

export default function AvatarFallback({ className = "" }: AvatarFallbackProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="text-white/60 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-purple-400/40 animate-pulse"></div>
        </div>
        <div className="text-lg mb-2">AI Voice Assistant</div>
        <div className="text-sm">Loading...</div>
      </div>
    </div>
  );
}