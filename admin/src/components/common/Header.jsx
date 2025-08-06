import { useState } from 'react';
import { FiSearch, FiGlobe, FiBell, FiKey, FiChevronDown, FiMenu } from 'react-icons/fi';
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Header = ({ title, setIsMobileSidebarOpen, isSidebarOpen, setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutfunction = () => {
    toast.success("Logout Successfully!");
    localStorage.removeItem("admin");
    localStorage.removeItem("admin-token");
    navigate("/")
  }

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(prev => !prev);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  };

  return (
    <header className='bg-[#071251] font-bai sticky top-0 left-0 z-[10000] shadow-md border-b-[1px] border-gray-700 flex items-center justify-between px-4 py-[17px]'>
      {/* Mobile menu button */}
      <button 
        className="lg:hidden text-white p-1 rounded-md hover:bg-gray-700 transition-colors"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Title - centered on mobile */}
      <h1 className="text-white font-semibold text-lg absolute left-1/2 transform -translate-x-1/2 lg:hidden">
        {title}
      </h1>

      {/* Icons and Admin */}
      <div className='flex items-center space-x-4 ml-auto'>
        <FiGlobe className='text-white text-xl cursor-pointer hidden md:block' />
        
        <div className='relative hidden md:block'>
          <FiBell className='text-white text-xl cursor-pointer' />
          <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1'>18+</span>
        </div>

        <FiKey className='text-white text-xl cursor-pointer hidden md:block' />

        <div className="relative">
          {/* Profile Button */}
          <div
            className="flex items-center bg-white text-[#071251] px-2 py-1 rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src="https://isomorphic-furyroad.vercel.app/avatar.webp"
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
            <span className="ml-2 font-semibold hidden md:inline">admin</span>
            <FiChevronDown className="ml-1 text-[#071251]" />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border z-[100] border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center px-4 py-3">
                <img
                  src="https://isomorphic-furyroad.vercel.app/avatar.webp"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-800">Admin</p>
                  <p className="text-xs text-gray-800">admin@gmail.com</p>
                </div>
              </div>
              <hr />
              <ul className="py-2">
                <hr />
                <li 
                  className="px-4 py-2 text-sm cursor-pointer text-red-500 hover:bg-gray-100"
                  onClick={logoutfunction}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;