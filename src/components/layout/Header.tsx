import React, 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell } from 'lucide-react'; // Doraemon bell icon suggestion

interface HeaderProps {
  onSearchSubmit?: (searchTerm: string) => void;
  userName?: string;
  userAvatarUrl?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearchSubmit, userName = "User", userAvatarUrl, className }) => {
  console.log("Rendering Header");
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
      console.log("Search submitted:", searchTerm);
    }
  };

  return (
    <header className={`fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-40 ${className || ''}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative flex-grow max-w-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search for songs, artists, albums..."
          className="pl-10 w-full rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* User Profile and Actions */}
      <div className="flex items-center space-x-4">
        {/* Bell icon - could be notifications or just thematic */}
        <Bell className="h-6 w-6 text-gray-500 hover:text-blue-600 cursor-pointer" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-blue-500">
              <AvatarImage src={userAvatarUrl} alt={userName} />
              <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
export default Header;