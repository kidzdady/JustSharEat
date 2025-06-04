'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Helper to combine class names
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export interface SidebarNavItem {
  href: string;
  label: string;
  icon?: (props: { className?: string; isActive: boolean }) => JSX.Element;
  activePaths?: string[];
  children?: SidebarNavItem[];
  badge?: string | number; // Optional badge for notifications/counts
}

interface SidebarProps {
  navItems: SidebarNavItem[];
  className?: string;
  logo?: React.ReactNode;
}

// Modern Icons (replace with your actual icon library)
const DashboardIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => (
  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", 
    isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500", 
    className)}>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  </div>
);

const UsersIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => (
  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", 
    isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500", 
    className)}>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  </div>
);

const VerificationIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => (
  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", 
    isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500", 
    className)}>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

const DealsIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => (
  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", 
    isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500", 
    className)}>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  </div>
);

const SettingsIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => (
  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", 
    isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500", 
    className)}>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-4 h-4 transition-transform", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Sidebar({ navItems, className, logo }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const renderNavItems = (items: SidebarNavItem[], level = 0) => {
    return items.map((item) => {
      const isActive = item.activePaths
        ? item.activePaths.some(p => pathname.startsWith(p))
        : pathname.startsWith(item.href);
      
      const hasChildren = item.children && item.children.length > 0;
      const itemKey = item.href + item.label;
      const isExpanded = expandedItems.includes(itemKey);
      const isChildActive = hasChildren && item.children?.some(child => 
        child.activePaths 
          ? child.activePaths.some(p => pathname.startsWith(p))
          : pathname.startsWith(child.href)
      );

      return (
        <li key={itemKey} className="mb-1">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(itemKey)}
              className={cn(
                'group w-full flex items-center justify-between rounded-xl px-4 py-3 text-left font-medium transition-all duration-200',
                'hover:bg-gray-50 hover:shadow-sm',
                level === 0 ? 'text-gray-700' : 'text-gray-600 text-sm',
                (isActive || isChildActive) && 'bg-orange-50 text-orange-700 shadow-sm'
              )}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="mr-3 flex-shrink-0" isActive={Boolean(isActive || isChildActive)} />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDownIcon className={cn(
                "text-gray-400 group-hover:text-gray-600",
                isExpanded && "rotate-180"
              )} />
            </button>
          ) : (
            <Link
              href={item.href}
              className={cn(
                'group flex items-center rounded-xl px-4 py-3 font-medium transition-all duration-200',
                'hover:bg-gray-50 hover:shadow-sm hover:translate-x-1',
                level === 0 ? 'text-gray-700' : 'text-gray-600 text-sm ml-6',
                isActive 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-200 translate-x-1' 
                  : ''
              )}
            >
              {item.icon && <item.icon className="mr-3 flex-shrink-0" isActive={isActive} />}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full font-medium",
                  isActive 
                    ? "bg-white/20 text-white" 
                    : "bg-orange-100 text-orange-600"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )}
          
          {hasChildren && isExpanded && (
            <ul className="mt-2 space-y-1 ml-4 pl-4 border-l-2 border-gray-100">
              {renderNavItems(item.children!, level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <aside
      className={cn(
        'hidden md:flex md:flex-col md:w-72 bg-white border-r border-gray-100 h-screen sticky top-0 shadow-sm',
        className
      )}
    >
      {/* Logo/Brand Section */}
      {logo ? (
        <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
          {logo}
        </div>
      ) : (
        <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">Management Dashboard</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">{renderNavItems(navItems)}</ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Updated navigation items with modern icons and badges
export const adminSidebarNavItems: SidebarNavItem[] = [
  { 
    href: '/admin', 
    label: 'Dashboard', 
    icon: DashboardIcon, 
    activePaths: ['/admin'],
    badge: '2'
  },
  { 
    href: '/admin/users', 
    label: 'User Management', 
    icon: UsersIcon,
    badge: '24'
  },
  { 
    href: '/admin/verification', 
    label: 'Seller Verification', 
    icon: VerificationIcon,
    badge: '3'
  },
  { 
    href: '/admin/deals', 
    label: 'Deal Management', 
    icon: DealsIcon,
    badge: 'New'
  },
  {
    href: '#',
    label: 'Settings',
    icon: SettingsIcon,
    children: [
      { href: '/admin/settings/general', label: 'General Settings', icon: SettingsIcon },
      { href: '/admin/settings/staff', label: 'Staff Accounts', icon: UsersIcon },
    ]
  },
];