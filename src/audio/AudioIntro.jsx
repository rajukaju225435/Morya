import { useEffect, useRef, useState } from "react";

export default function AudioIntro() {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {!hasStarted ? (
        <button
          onClick={handleStart}
          className="bg-orange-600 text-white text-xl px-6 py-3 rounded-lg shadow-lg hover:bg-orange-700 transition-all"
        >
          Enter – Om Gan Ganapataye Namah
        </button>
      ) : (
        <audio ref={audioRef} src="/ganesha-intro.mp3" />
      )}
    </div>
  );
}
