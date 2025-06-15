import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from '@/lib/utils';

interface AlbumArtCardProps {
  albumName: string;
  artistName?: string;
  imageUrl: string;
  onClick?: () => void;
  className?: string;
}

const AlbumArtCard: React.FC<AlbumArtCardProps> = ({
  albumName,
  artistName,
  imageUrl,
  onClick,
  className,
}) => {
  console.log("Rendering AlbumArtCard:", albumName);
  return (
    <Card
      className={cn("w-full max-w-[200px] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white", className)}
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-gray-200">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={`Album art for ${albumName}`}
            className="object-cover w-full h-full rounded-t-lg"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold truncate text-gray-800">{albumName}</CardTitle>
        {artistName && <CardDescription className="text-xs text-gray-500 truncate">{artistName}</CardDescription>}
      </CardContent>
    </Card>
  );
}
export default AlbumArtCard;