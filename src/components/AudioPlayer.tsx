import { useRef, useState, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setProgress(time);
  };

  const formatTime = (secs: number) =>
    isNaN(secs)
      ? '0:00'
      : `${Math.floor(secs / 60)}:${('0' + Math.floor(secs % 60)).slice(-2)}`;

  return (
    <div className='bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto'>
      <audio ref={audioRef} src='/audio.mp3' preload='metadata' />

      <div className='flex items-center justify-between'>
        <button
          onClick={togglePlay}
          className='text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full'
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        <div className='text-sm'>
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>

      <input
        type='range'
        min={0}
        max={duration}
        value={progress}
        onChange={handleSeek}
        step='0.01'
        className='w-full mt-3 accent-green-500'
      />
    </div>
  );
}
