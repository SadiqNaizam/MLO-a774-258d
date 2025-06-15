import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SidebarNavigationLink from '@/components/SidebarNavigationLink';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home as HomeIcon, Search as SearchIconLucide, Library as LibraryIcon } from 'lucide-react';

const searchResultsSongs = [
  { title: "Yume o Kanaete Doraemon", artist: "mao", albumArtUrl: "https://i.scdn.co/image/ab67616d00004851a32b73a3cb0d3c8fcf4d9954", duration: "4:05" },
  { title: "Himawari no Yakusoku (From Stand By Me Doraemon)", artist: "Motohiro Hata", albumArtUrl: "https://i.scdn.co/image/ab67616d00001e02d0b7c3b3b3b3b3b3b3b3b3b3", duration: "5:15" },
];
const searchResultsAlbums = [
  { albumName: "Doraemon Movie Themes", artistName: "Various Artists", imageUrl: "https://i.scdn.co/image/ab67616d0000b273a9f9a9f9a9f9a9f9a9f9a9f9" },
];
const searchResultsArtists = [
  { artistName: "Doraemon Band", imageUrl: "https://i.ytimg.com/vi/ABCDEFGHIJK/default.jpg" }, // Placeholder, actual artist image would be better
];

const defaultPlayerSong = {
  title: "Searching for Adventure",
  artist: "Explorer Bot",
  albumArtUrl: "https://www.pngitem.com/pimgs/m/22-220721_doraemon-png-face-transparent-png.png",
  durationSeconds: 210,
};

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
    console.log("Search submitted on page:", term);
    // Here you would typically fetch search results based on 'term'
  };

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <Sidebar>
        <SidebarNavigationLink to="/" icon={<HomeIcon size={20} />} label="Home" />
        <SidebarNavigationLink to="/search" icon={<SearchIconLucide size={20} />} label="Search" />
        <SidebarNavigationLink to="/library" icon={<LibraryIcon size={20} />} label="Your Library" />
      </Sidebar>
      <div className="flex-1 flex flex-col ml-64">
        <Header userName="Doraemon Fan" userAvatarUrl="https://www.pngitem.com/pimgs/m/22-220721_doraemon-png-face-transparent-png.png" onSearchSubmit={handleSearchSubmit} />
        <main className="flex-grow overflow-y-auto p-6 pt-20 pb-28">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">Search Results {searchTerm && `for "${searchTerm}"`}</h1>
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-4 bg-blue-200 text-blue-700">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
            </TabsList>
            <TabsContent value="songs">
              <div className="space-y-2">
                {searchResultsSongs.map((song) => (
                  <SongListItem key={song.title} {...song} onPlay={() => console.log('Playing ' + song.title)} />
                ))}
                {searchResultsSongs.length === 0 && <p>No songs found for "{searchTerm}". Try "Doraemon"!</p>}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResultsAlbums.map((album) => (
                  <AlbumArtCard key={album.albumName} {...album} onClick={() => console.log('Clicked album ' + album.albumName)} />
                ))}
                {searchResultsAlbums.length === 0 && <p>No albums found for "{searchTerm}".</p>}
              </div>
            </TabsContent>
            <TabsContent value="artists">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResultsArtists.map((artist) => (
                  // Assuming AlbumArtCard can be repurposed for artists or a similar ArtistCard component exists
                  <AlbumArtCard key={artist.artistName} albumName={artist.artistName} imageUrl={artist.imageUrl} onClick={() => console.log('Clicked artist ' + artist.artistName)} />
                ))}
                {searchResultsArtists.length === 0 && <p>No artists found for "{searchTerm}".</p>}
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <MusicPlayerControls currentSong={defaultPlayerSong} />
      </div>
    </div>
  );
};

export default SearchPage;