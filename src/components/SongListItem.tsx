import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, ListPlus, PlayCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SongListItemProps {
  songTitle: string;
  artistName: string;
  albumArtUrl?: string; // Small thumbnail
  duration?: string;
  isLiked?: boolean;
  isPlaying?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
  onAddToPlaylist?: () => void;
  onMoreOptions?: () => void; // For a context menu or similar
  className?: string;
}

const SongListItem: React.FC<SongListItemProps> = ({
  songTitle,
  artistName,
  albumArtUrl,
  duration,
  isLiked = false,
  isPlaying = false,
  onPlay,
  onLike,
  onAddToPlaylist,
  onMoreOptions,
  className,
}) => {
  console.log("Rendering SongListItem:", songTitle);

  return (
    <div
      className={cn(
        "flex items-center p-3 space-x-4 hover:bg-blue-50 rounded-lg transition-colors duration-150 group",
        isPlaying ? "bg-blue-100" : "",
        className
      )}
    >
      <Avatar className="h-10 w-10 rounded">
        <AvatarImage src={albumArtUrl} alt={songTitle} />
        <AvatarFallback>{songTitle.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow min-w-0">
        <p className={`font-medium truncate ${isPlaying ? 'text-blue-600' : 'text-gray-800'}`}>{songTitle}</p>
        <p className="text-xs text-gray-500 truncate">{artistName}</p>
      </div>
      {duration && <span className="text-xs text-gray-500 hidden sm:block mr-2">{duration}</span>}
      
      {/* Action buttons - visible on hover/focus or if playing */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        {onPlay && (
            <Button variant="ghost" size="icon" onClick={onPlay} aria-label={isPlaying ? "Pause song" : "Play song"}>
                <PlayCircle className={`h-5 w-5 ${isPlaying ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`} />
            </Button>
        )}
        {onLike && (
          <Button variant="ghost" size="icon" onClick={onLike} aria-label={isLiked ? "Unlike song" : "Like song"}>
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"}`} />
          </Button>
        )}
        {onAddToPlaylist && (
          <Button variant="ghost" size="icon" onClick={onAddToPlaylist} aria-label="Add to playlist">
            <ListPlus className="h-5 w-5 text-gray-600 hover:text-blue-600" />
          </Button>
        )}
        {onMoreOptions && (
           <Button variant="ghost" size="icon" onClick={onMoreOptions} aria-label="More options">
            <MoreHorizontal className="h-5 w-5 text-gray-600 hover:text-blue-600" />
          </Button>
        )}
      </div>
    </div>
  );
}
export default SongListItem;