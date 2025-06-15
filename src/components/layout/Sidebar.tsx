import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  console.log("Rendering Sidebar");
  // Doraemon-inspired: using a lighter blue for the sidebar background
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-blue-100 text-gray-800 p-4 space-y-6 shadow-lg ${className || ''}`}
    >
      <div className="text-2xl font-bold text-blue-700 mb-6">
        {/* Placeholder for Logo or App Name, e.g., "MusicApp" or a Doraemon bell icon */}
        <span>MusicApp</span>
      </div>
      <nav>
        {children}
      </nav>
    </aside>
  );
}
export default Sidebar;