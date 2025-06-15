import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { cn } from '@/lib/utils'; // For conditional class names

interface SidebarNavigationLinkProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
  className?: string;
}

const SidebarNavigationLink: React.FC<SidebarNavigationLinkProps> = ({ to, icon, label, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  console.log(`Rendering SidebarNavigationLink: ${label}, to: ${to}, isActive: ${isActive}`);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition-colors duration-150",
        isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-700",
        className
      )}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}
export default SidebarNavigationLink;