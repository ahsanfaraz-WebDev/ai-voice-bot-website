'use client';

export default function AvatarFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Simple avatar placeholder */}
        <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 11.8 12.8 14 10 14V22H8V14C5.2 14 3 11.8 3 9V7H9V9C9 10.1 9.9 11 11 11S13 10.1 13 9H21Z"/>
          </svg>
        </div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white animate-pulse"></div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <div className="text-white font-medium">Your Avatar</div>
          <div className="text-purple-200 text-sm">Ready Player Me</div>
        </div>
      </div>
    </div>
  );
}
