
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, Menu, X, User, LayoutGrid, BookOpen, FileText, Award, LogOut, Home, Grid, Book } from 'lucide-react';
import { currentUser, navigationMenu } from '../services/mockData';

// Map icon names to components
const NavIcons: Record<string, React.ReactNode> = {
    'home': <Home size={18} />,
    'grid': <Grid size={18} />,
    'book-open': <BookOpen size={18} />,
    'file-text': <FileText size={18} />,
    'book': <Book size={18} />,
    'layout-grid': <LayoutGrid size={18} />
};

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const location = useLocation();

    // Close menus on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo & Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        
                        <Link to="/" className="flex items-center gap-2">
                            {/* Placeholder for Logo Image */}
                            <div className="text-2xl font-black text-amber-500 flex items-baseline">
                                <span className="text-blue-900">منصة</span>
                                <span className="mx-1">المئة</span>
                                <span className="text-xs font-normal text-gray-400 block -mt-2">قدرات & تحصيلي</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navigationMenu.map((item) => {
                            const Icon = (item as any).iconName ? NavIcons[(item as any).iconName] : null;
                            return (
                                <div 
                                    key={item.id} 
                                    className="relative group px-3 py-2"
                                    onMouseEnter={() => setActiveDropdown(item.id)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link 
                                        to={item.link} 
                                        className="flex items-center gap-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm"
                                    >
                                        {Icon && <span className="text-gray-400 group-hover:text-amber-500 transition-colors">{Icon}</span>}
                                        {item.label}
                                        {item.children && <ChevronDown size={14} />}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {item.children && activeDropdown === item.id && (
                                        <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-b-xl border-t-2 border-amber-500 py-2 animate-fade-in">
                                            {item.children.map((child) => (
                                                <Link 
                                                    key={child.id} 
                                                    to={child.link}
                                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Actions: Search, Cart, User */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-amber-500 transition-colors">
                            <Search size={22} />
                        </button>
                        
                        <Link to="/cart" className="relative text-gray-500 hover:text-amber-500 transition-colors">
                            <ShoppingCart size={22} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </Link>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-100 transition-all"
                            >
                                <div className="hidden lg:block text-left">
                                    <span className="block text-xs text-gray-500 font-normal">حسابي</span>
                                    <span className="block text-sm font-bold text-gray-800 leading-none">{currentUser.name}</span>
                                </div>
                                <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-100 py-2 animate-fade-in z-50">
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                        <p className="font-bold text-gray-800">{currentUser.name}</p>
                                        <p className="text-xs text-gray-500">طالب متميز</p>
                                    </div>
                                    
                                    <UserMenuItem to="/dashboard" icon={<LayoutGrid size={18} />} label="لوحة التحكم" />
                                    <UserMenuItem to="/courses" icon={<BookOpen size={18} />} label="دوراتي" />
                                    <UserMenuItem to="/quizzes" icon={<FileText size={18} />} label="اختباراتي" />
                                    <UserMenuItem to="/achievements" icon={<Award size={18} />} label="الشهادات والإنجازات" />
                                    <UserMenuItem to="/profile" icon={<User size={18} />} label="الملف الشخصي" />
                                    
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                                            <LogOut size={18} />
                                            تسجيل الخروج
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white overflow-y-auto pb-20 animate-fade-in">
                    <div className="p-4">
                         {navigationMenu.map((item) => {
                            const Icon = (item as any).iconName ? NavIcons[(item as any).iconName] : null;
                            return (
                                <div key={item.id} className="mb-4">
                                    <Link 
                                        to={item.link} 
                                        className="flex items-center gap-3 font-bold text-lg text-gray-800 mb-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {Icon && <span className="text-amber-500">{Icon}</span>}
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <div className="pr-9 space-y-2 border-r-2 border-gray-100 mr-1">
                                            {item.children.map((child) => (
                                                <Link 
                                                    key={child.id} 
                                                    to={child.link}
                                                    className="block text-gray-600 py-1"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                         })}
                    </div>
                </div>
            )}
        </header>
    );
};

const UserMenuItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link to={to} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium">
        {icon}
        {label}
    </Link>
);
