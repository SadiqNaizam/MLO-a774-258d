import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SidebarNavigationLink from '@/components/SidebarNavigationLink';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home as HomeIcon, Search as SearchIconLucide, Library as LibraryIcon, UserCheck, Play } from 'lucide-react';
// import { useParams } from 'react-router-dom';

const artistDetails = {
  name: "Doraemon Band",
  avatarUrl: "https://avatarfiles.alphacoders.com/288/thumb-288931.png",
  bio: "The official band for all things Doraemon! Bringing joy and futuristic sounds to fans everywhere.",
  monthlyListeners: "1,234,567",
  popularTracks: [
    { title: "Doraemon's Theme Remix", artist: "Doraemon Band", albumArtUrl: "https://i.scdn.co/image/ab67616d00004851c1a2b3c4d5e6f7a8b9c0d1e2", duration: "3:30", isLiked: true },
    { title: "Anywhere Door Funk", artist: "Doraemon Band", albumArtUrl: "https://i.scdn.co/image/ab67616d00004851f0e1d2c3b4a5e6f7a8b9c0d1", duration: "4:15", isPlaying: true },
  ],
  albums: [
    { albumName: "Gadget Symphony", artistName: "Doraemon Band", imageUrl: "https://pbs.twimg.com/media/FASYyYTVgAkvXgP.jpg:large" },
    { albumName: "Future Memories", artistName: "Doraemon Band", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Doraemon_volume_1_cover.jpg/220px-Doraemon_volume_1_cover.jpg" },
  ]
};

const defaultPlayerSong = {
  title: artistDetails.popularTracks[1].title,
  artist: artistDetails.name,
  albumArtUrl: artistDetails.popularTracks[1].albumArtUrl,
  durationSeconds: 255,
};

const ArtistPage = () => {
  // const { artistId } = useParams();
  console.log('ArtistPage loaded for artistId: doraemon-band');

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <Sidebar>
        <SidebarNavigationLink to="/" icon={<HomeIcon size={20} />} label="Home" />
        <SidebarNavigationLink to="/search" icon={<SearchIconLucide size={20} />} label="Search" />
        <SidebarNavigationLink to="/library" icon={<LibraryIcon size={20} />} label="Your Library" />
      </Sidebar>
      <div className="flex-1 flex flex-col ml-64">
        <Header userName="Doraemon Fan" userAvatarUrl="https://www.pngitem.com/pimgs/m/22-220721_doraemon-png-face-transparent-png.png" />
        <main className="flex-grow overflow-y-auto p-6 pt-20 pb-28">
          <div className="flex items-center space-x-6 mb-8 p-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg shadow-xl">
            <Avatar className="h-40 w-40 rounded-full border-4 border-white shadow-lg">
              <AvatarImage src={artistDetails.avatarUrl} alt={artistDetails.name} />
              <AvatarFallback>{artistDetails.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <Label className="text-xs text-indigo-100 font-semibold tracking-wider">ARTIST</Label>
              <h1 className="text-6xl font-bold text-white my-1">{artistDetails.name}</h1>
              <p className="text-indigo-200 text-sm mb-3">{artistDetails.monthlyListeners} monthly listeners</p>
              <div className="flex space-x-3">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                  <Play size={18} className="mr-2 fill-white" /> Play
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-500 rounded-full px-6">
                  <UserCheck size={18} className="mr-2" /> Follow
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="mb-4 bg-blue-200 text-blue-700">
              <TabsTrigger value="popular">Popular Tracks</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="popular">
              <div className="space-y-1">
                {artistDetails.popularTracks.map((song, index) => (
                  <SongListItem
                    key={song.title}
                    songTitle={`${index + 1}. ${song.title}`}
                    artistName={song.artist}
                    albumArtUrl={song.albumArtUrl}
                    duration={song.duration}
                    isLiked={song.isLiked}
                    isPlaying={song.isPlaying}
                    onPlay={() => console.log('Playing ' + song.title)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {artistDetails.albums.map((album) => (
                  <AlbumArtCard key={album.albumName} {...album} onClick={() => console.log('Clicked album ' + album.albumName)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="about">
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Biography</h3>
                    <Label className="text-gray-600 leading-relaxed">{artistDetails.bio}</Label>
                </div>
            </TabsContent>
          </Tabs>
        </main>
        <MusicPlayerControls currentSong={defaultPlayerSong} isPlaying={true} />
      </div>
    </div>
  );
};

export default ArtistPage;