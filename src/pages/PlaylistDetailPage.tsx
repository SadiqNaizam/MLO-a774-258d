import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SidebarNavigationLink from '@/components/SidebarNavigationLink';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Home as HomeIcon, Search as SearchIconLucide, Library as LibraryIcon, Play, Heart, MoreHorizontal, Clock, GripVertical } from 'lucide-react';
// import { useParams } from 'react-router-dom'; // If you need to fetch playlist by ID

const playlistDetails = {
  name: "Doraemon's Happy Tunes",
  creator: "Shizuka Minamoto",
  coverUrl: "https://i.ytimg.com/vi/qZsh82y9_5g/maxresdefault.jpg",
  description: "A collection of joyful songs from Doraemon and friends!",
  songs: [
    { id: "1", title: "Yume o Kanaete Doraemon", artist: "mao", album: "Doraemon Themes", dateAdded: "2023-03-10", duration: "4:05", albumArtUrl: "https://i.scdn.co/image/ab67616d00004851a32b73a3cb0d3c8fcf4d9954" },
    { id: "2", title: "Doraemon no Uta", artist: "Kumiko Osugi", album: "Classic Doraemon", dateAdded: "2023-03-12", duration: "2:50", albumArtUrl: "https://static.wikia.nocookie.net/doraemon/images/3/35/Doraemon_Uta_no_Daizenshuu.jpg/revision/latest/scale-to-width-down/100?cb=20201218093028&path-prefix=en"},
    { id: "3", title: "Boku Doraemon", artist: "Nobuyo Oyama", album: "More Doraemon Hits", dateAdded: "2023-03-15", duration: "2:15", albumArtUrl: "https://m.media-amazon.com/images/I/71uYJ003k0L._SS500_.jpg" },
  ]
};

const defaultPlayerSong = {
  title: playlistDetails.songs[0].title,
  artist: playlistDetails.songs[0].artist,
  albumArtUrl: playlistDetails.songs[0].albumArtUrl,
  durationSeconds: 245,
};

const PlaylistDetailPage = () => {
  // const { playlistId } = useParams(); // Example: to fetch specific playlist data
  console.log('PlaylistDetailPage loaded for playlistId: dora-favorites'); // Replace with actual ID if using params

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
          <div className="flex items-end space-x-6 mb-8">
            <Avatar className="h-48 w-48 rounded-lg shadow-xl border-4 border-white">
              <AvatarImage src={playlistDetails.coverUrl} alt={playlistDetails.name} />
              <AvatarFallback>{playlistDetails.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Label className="text-sm text-blue-600 font-semibold">PLAYLIST</Label>
              <h1 className="text-5xl font-bold text-gray-800 my-2">{playlistDetails.name}</h1>
              <p className="text-gray-600 mb-1">{playlistDetails.description}</p>
              <Label className="text-sm text-gray-500">Created by: <span className="font-medium text-blue-700">{playlistDetails.creator}</span> - {playlistDetails.songs.length} songs</Label>
              <div className="mt-4">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3">
                  <Play size={20} className="mr-2 fill-white" /> Play
                </Button>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-blue-100">
                <TableHead className="w-[40px] text-center"><GripVertical size={16} className="text-gray-400"/></TableHead>
                <TableHead className="w-[50px] text-gray-500">#</TableHead>
                <TableHead className="text-gray-700">Title</TableHead>
                <TableHead className="text-gray-700 hidden md:table-cell">Album</TableHead>
                <TableHead className="text-gray-700 hidden lg:table-cell">Date Added</TableHead>
                <TableHead className="text-right text-gray-500"><Clock size={16} /></TableHead>
                <TableHead className="w-[100px] text-center text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playlistDetails.songs.map((song, index) => (
                <TableRow key={song.id} className="group hover:bg-blue-100/50">
                  <TableCell className="text-center"><Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100"><Play size={18} /></Button></TableCell>
                  <TableCell className="font-medium text-gray-500">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 rounded">
                        <AvatarImage src={song.albumArtUrl} alt={song.title} />
                        <AvatarFallback>{song.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600">{song.title}</p>
                        <p className="text-xs text-gray-500">{song.artist}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 hidden md:table-cell">{song.album}</TableCell>
                  <TableCell className="text-gray-600 hidden lg:table-cell">{song.dateAdded}</TableCell>
                  <TableCell className="text-right text-gray-600">{song.duration}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100">
                      <Button variant="ghost" size="icon"><Heart size={18} className="text-gray-500 hover:text-red-500" /></Button>
                      <Button variant="ghost" size="icon"><MoreHorizontal size={18} className="text-gray-500 hover:text-blue-600" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
        <MusicPlayerControls currentSong={defaultPlayerSong} />
      </div>
    </div>
  );
};

export default PlaylistDetailPage;