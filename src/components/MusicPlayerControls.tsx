import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Shadcn progress
import { Slider } from '@/components/ui/slider'; // Shadcn slider for volume/seek
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  ListMusic
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentSong {
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds?: number;
}

interface MusicPlayerControlsProps {
  currentSong?: CurrentSong;
  isPlaying?: boolean;
  progressPercent?: number; // 0-100
  currentTimeSeconds?: number;
  isLiked?: boolean;
  volumePercent?: number; // 0-100
  isMuted?: boolean;
  isShuffle?: boolean;
  repeatMode?: 'off' | 'one' | 'all';
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSeek?: (value: number[]) => void; // Slider gives array
  onLike?: () => void;
  onVolumeChange?: (value: number[]) => void; // Slider gives array
  onMuteToggle?: () => void;
  onShuffleToggle?: () => void;
  onRepeatToggle?: () => void;
  onQueueToggle?: () => void; // To show/hide upcoming songs queue
  className?: string;
}

const formatTime = (seconds: number = 0) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const MusicPlayerControls: React.FC<MusicPlayerControlsProps> = ({
  currentSong,
  isPlaying = false,
  progressPercent = 0,
  currentTimeSeconds = 0,
  isLiked = false,
  volumePercent = 70,
  isMuted = false,
  isShuffle = false,
  repeatMode = 'off',
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onLike,
  onVolumeChange,
  onMuteToggle,
  onShuffleToggle,
  onRepeatToggle,
  onQueueToggle,
  className,
}) => {
  console.log("Rendering MusicPlayerControls. Current song:", currentSong?.title, "Playing:", isPlaying);

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 grid grid-cols-3 items-center gap-4 shadow-[-2px_0px_10px_rgba(0,0,0,0.1)] z-50",
        className
      )}
    >
      {/* Left: Song Info */}
      <div className="flex items-center space-x-3 min-w-0">
        {currentSong ? (
          <>
            <Avatar className="h-12 w-12 rounded">
              <AvatarImage src={currentSong.albumArtUrl} alt={currentSong.title} />
              <AvatarFallback>{currentSong.title?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{currentSong.title || "No song playing"}</p>
              <p className="text-xs text-gray-500 truncate">{currentSong.artist || "Unknown artist"}</p>
            </div>
            {onLike && (
              <Button variant="ghost" size="icon" onClick={onLike} className="ml-2">
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"}`} />
              </Button>
            )}
          </>
        ) : (
          <div className="text-sm text-gray-500">No song selected</div>
        )}
      </div>

      {/* Center: Player Controls & Progress */}
      <div className="flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {onShuffleToggle && (
             <Button variant="ghost" size="icon" onClick={onShuffleToggle} className={isShuffle ? "text-blue-600" : "text-gray-500"}>
                <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}
          {onPrev && <Button variant="ghost" size="icon" onClick={onPrev}><SkipBack className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" /></Button>}
          {onPlayPause && (
            <Button variant="default" size="icon" onClick={onPlayPause} className="bg-blue-600 hover:bg-blue-700 rounded-full h-9 w-9 sm:h-10 sm:w-10">
              {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white" />}
            </Button>
          )}
          {onNext && <Button variant="ghost" size="icon" onClick={onNext}><SkipForward className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" /></Button>}
          {onRepeatToggle && (
             <Button variant="ghost" size="icon" onClick={onRepeatToggle} className={repeatMode !== 'off' ? "text-blue-600" : "text-gray-500"}>
                {repeatMode === 'one' ? <Repeat className="h-4 w-4 sm:h-5 sm:w-5" /> /* Replace with RepeatOne if available or make it distinct */ : <Repeat className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          )}
        </div>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-8 text-right">{formatTime(currentTimeSeconds)}</span>
            {onSeek ? (
                 <Slider
                    defaultValue={[0]}
                    value={[progressPercent]}
                    max={100}
                    step={1}
                    onValueChange={onSeek}
                    className="w-full"
                    aria-label="Song progress"
                />
            ) : (
                <Progress value={progressPercent} className="w-full h-1.5" />
            )}
            <span className="text-xs text-gray-500 w-8 text-left">{formatTime(currentSong?.durationSeconds)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-2">
        {onQueueToggle && (
            <Button variant="ghost" size="icon" onClick={onQueueToggle} className="hidden md:inline-flex">
                <ListMusic className="h-5 w-5 text-gray-500 hover:text-blue-600"/>
            </Button>
        )}
        {onMuteToggle && (
          <Button variant="ghost" size="icon" onClick={onMuteToggle}>
            {isMuted || volumePercent === 0 ? <VolumeX className="h-5 w-5 text-gray-500" /> : <Volume2 className="h-5 w-5 text-gray-500" />}
          </Button>
        )}
        {onVolumeChange && (
            <Slider
                defaultValue={[70]}
                value={[isMuted ? 0 : volumePercent || 0]}
                max={100}
                step={1}
                onValueChange={onVolumeChange}
                className="w-20 hidden sm:inline-flex"
                aria-label="Volume control"
            />
        )}
      </div>
    </footer>
  );
}
export default MusicPlayerControls;