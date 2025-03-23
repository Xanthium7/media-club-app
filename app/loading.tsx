import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative w-24 h-24">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>

        {/* Animated arc */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full animate-pulse flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 3v12"></path>
              <path d="M19 10l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Text with staggered letter animation */}
      <div className="mt-6 font-medium text-lg text-primary">
        {["L", "o", "a", "d", "i", "n", "g", "..."].map((letter, index) => (
          <span
            key={index}
            className={cn("inline-block", "animate-bounce")}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: "1s",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
