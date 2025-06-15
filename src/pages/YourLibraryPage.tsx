import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SidebarNavigationLink from '@/components/SidebarNavigationLink';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home as HomeIcon, Search as SearchIconLucide, Library as LibraryIcon, PlusCircle } from 'lucide-react';

const userPlaylists = [
  { albumName: "Doraemon Favorites", artistName: "My Playlist", imageUrl: "https://i.ytimg.com/vi/qZsh82y9_5g/maxresdefault.jpg" },
  { albumName: "Relaxing Gadget Sounds", artistName: "My Playlist", imageUrl: "https://img.freepik.com/free-vector/cute-doraemon-seamless-pattern-background_1308-103488.jpg" },
];
const likedSongs = [
  { title: "Yume o Kanaete Doraemon", artist: "mao", albumArtUrl: "https://i.scdn.co/image/ab67616d00004851a32b73a3cb0d3c8fcf4d9954", duration: "4:05", isLiked: true },
];
const followedArtists = [ { artistName: "Doraemon Band", imageUrl: "https://avatarfiles.alphacoders.com/288/thumb-288931.png" }];
const savedAlbums = [ { albumName: "Doraemon Movie Themes", artistName: "Various Artists", imageUrl: "https://i.scdn.co/image/ab67616d0000b273a9f9a9f9a9f9a9f9a9f9a9f9" } ];

const defaultPlayerSong = {
  title: "My Collection Vibe",
  artist: "Curator Cat",
  albumArtUrl: "https://www.pngitem.com/pimgs/m/22-220721_doraemon-png-face-transparent-png.png",
  durationSeconds: 190,
};

const YourLibraryPage = () => {
  console.log('YourLibraryPage loaded');
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-700">Your Library</h1>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle size={18} className="mr-2" /> Create Playlist
            </Button>
          </div>
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="mb-4 bg-blue-200 text-blue-700">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="liked">Liked Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {userPlaylists.map((playlist) => (
                  <AlbumArtCard key={playlist.albumName} {...playlist} onClick={() => console.log('Clicked playlist ' + playlist.albumName)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="liked">
              <div className="space-y-2">
                {likedSongs.map((song) => (
                  <SongListItem key={song.title} {...song} onPlay={() => console.log('Playing ' + song.title)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {followedArtists.map((artist) => (
                   <AlbumArtCard key={artist.artistName} albumName={artist.artistName} imageUrl={artist.imageUrl} onClick={() => console.log('Clicked artist ' + artist.artistName)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {savedAlbums.map((album) => (
                  <AlbumArtCard key={album.albumName} {...album} onClick={() => console.log('Clicked album ' + album.albumName)} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <MusicPlayerControls currentSong={defaultPlayerSong} />
      </div>
    </div>
  );
};

export default YourLibraryPage;