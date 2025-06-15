import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SidebarNavigationLink from '@/components/SidebarNavigationLink';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Label } from '@/components/ui/label';
import { Home as HomeIcon, Search as SearchIconLucide, Library as LibraryIcon } from 'lucide-react';

const recentlyPlayedSongs = [
  { title: "Yume o Kanaete Doraemon", artist: "mao", albumArtUrl: "https://i.scdn.co/image/ab67616d00004851a32b73a3cb0d3c8fcf4d9954", duration: "4:05", isLiked: true },
  { title: "Doraemon no Uta", artist: "Kumiko Osugi", albumArtUrl: "https://static.wikia.nocookie.net/doraemon/images/3/35/Doraemon_Uta_no_Daizenshuu.jpg/revision/latest/scale-to-width-down/100?cb=20201218093028&path-prefix=en", duration: "2:50", isLiked: false },
  { title: "Boku Doraemon", artist: "Nobuyo Oyama", albumArtUrl: "https://m.media-amazon.com/images/I/71uYJ003k0L._SS500_.jpg", duration: "2:15", isLiked: true },
];

const doraemonPicksAlbums = [
  { albumName: "Doraemon Song Collection", artistName: "Various Artists", imageUrl: "https://static.wikia.nocookie.net/doraemon/images/3/35/Doraemon_Uta_no_Daizenshuu.jpg/revision/latest/scale-to-width-down/200?cb=20201218093028&path-prefix=en" },
  { albumName: "Time Machine Grooves", artistName: "Future Funk", imageUrl: "https://pbs.twimg.com/media/FASYyYTVgAkvXgP.jpg:large" },
  { albumName: "Pocket Dimension Beats", artistName: "Gadget Master", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Doraemon_volume_1_cover.jpg/220px-Doraemon_volume_1_cover.jpg" },
  { albumName: "Friendship Anthems", artistName: "Nobita & Friends", imageUrl: "https://i1.sndcdn.com/artworks-000164026909-9go1qg-t500x500.jpg" },
];

const defaultPlayerSong = {
  title: "Doraemon's Opening Theme",
  artist: "Takeshi Goda",
  albumArtUrl: "https://www.pngitem.com/pimgs/m/22-220721_doraemon-png-face-transparent-png.png",
  durationSeconds: 180,
};

const HomePage = () => {
  console.log('HomePage loaded');
  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <Sidebar>
        <SidebarNavigationLink to="/" icon={<HomeIcon size={20} />} label="Home" />
        <SidebarNavigationLink to="/search" icon={<SearchIconLucide size={20} />} label="Search" />
        <SidebarNavigationLink to="/library" icon={<LibraryIcon size={20} />} label="Your Library" />
      </Sidebar>
      <div className="flex-1 flex flex-col ml-64"> {/* Adjust ml to match sidebar width */}
        <Header userName="Doraemon Fan" userAvatarUrl="https://www.pngitem.com/pimgs/m/22-220721_doraemon-png-face-transparent-png.png" />
        <main className="flex-grow overflow-y-auto p-6 pt-20 pb-28 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50">
          <section className="mb-8">
            <Label className="text-2xl font-bold text-blue-700 mb-4 block">Doraemon's Top Picks</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {doraemonPicksAlbums.map((album) => (
                <AlbumArtCard
                  key={album.albumName}
                  albumName={album.albumName}
                  artistName={album.artistName}
                  imageUrl={album.imageUrl}
                  onClick={() => console.log(`Clicked ${album.albumName}`)}
                />
              ))}
            </div>
          </section>

          <section>
            <Label className="text-2xl font-bold text-blue-700 mb-4 block">Recently Played</Label>
            <div className="space-y-2">
              {recentlyPlayedSongs.map((song) => (
                <SongListItem
                  key={song.title}
                  songTitle={song.title}
                  artistName={song.artist}
                  albumArtUrl={song.albumArtUrl}
                  duration={song.duration}
                  isLiked={song.isLiked}
                  onPlay={() => console.log(`Playing ${song.title}`)}
                  onLike={() => console.log(`Liked ${song.title}`)}
                />
              ))}
            </div>
          </section>
        </main>
        <MusicPlayerControls currentSong={defaultPlayerSong} isPlaying={false} progressPercent={30} />
      </div>
    </div>
  );
};

export default HomePage;