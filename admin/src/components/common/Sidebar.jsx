import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { MdOutlineCategory, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { RiCoupon3Line } from "react-icons/ri";
import { FaBloggerB } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineWeb } from "react-icons/md";
import { TbBrandBinance } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { ShoppingBag, ShoppingCart, Users } from "lucide-react";

const SIDEBAR_ITEMS = [
  { 
    name: "Dashboard", 
    icon: LuLayoutDashboard, 
    color: "#20bf6b", 
    href: "/"
  },
  { 
    name: "Category", 
    icon: MdOutlineCategory, 
    color: "#EC4899", 
    href: "/category/list"
  },
  { 
    name: "Brand", 
    icon: TbBrandBinance, 
    color: "#2bcbba", 
    href: "/brand/list"
  },
  { 
    name: "Frontend", 
    icon: MdOutlineWeb, 
    color: "#8B5CF6", 
    href: "/frontend",
    subItems: [
      { name: "Banner List", href: "/frontend/banner-list" },
      { name: "Add Banner", href: "/frontend/add-banner" },
    ],
  },
  { 
    name: "Products", 
    icon: ShoppingBag, 
    color: "#8B5CF6", 
    href: "/products",
    subItems: [
      { name: "Product List", href: "/products/list" },
      { name: "Add Product", href: "/products/add" },
    ],
  },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { 
    name: "Orders", 
    icon: ShoppingCart, 
    color: "#F59E0B", 
    href: "/orders",
    subItems: [
      { name: "Order List", href: "/orders" },
    ],
  },
  { 
    name: "Blogs", 
    icon: FaBloggerB, 
    color: "#F59E0B", 
    href: "/blog-list",
    subItems: [
      { name: "Blog List", href: "/blog-list" },
      { name: "Add Blog", href: "/add-blog" },
    ],
  },
  { name: "Reviews", icon: IoIosStar, color: "#F59E0B", href: "/review-list" },
  { name: "Coupons", icon: RiCoupon3Line, color: "#3B82F6", href: "/coupon" },
  { name: "Contact", icon: RiContactsBook3Line, color: "#6EE7B7", href: "/contact-list" },
  { name: "NewsLetter", icon: MdEmail, color: "#6EE7B7", href: "/newsletter-list" },
  { name: "Profile", icon: IoMdInformationCircleOutline, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (name) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 font-baji bg-white z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div className='h-full bg-blue-800 text-white md:pt-0 pt-[70px] overflow-y-auto custom-scrollbar backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
            <div className="p-[10px] flex justify-center items-center">
              <h1>Tech10BD</h1>
            </div>
            <nav className='flex-grow'>
              {SIDEBAR_ITEMS.map((item) => (
                <div key={item.href}>
                  <NavLink 
                    to={item.href}
                    className={({ isActive }) => 
                      `flex items-center justify-between px-4 py-[12px] text-sm font-medium rounded-lg hover:bg-orange-400 transition-colors mb-2 ${
                        isActive ? 'bg-orange-500' : ''
                      }`
                    }
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleSubMenu(item.name);
                      }
                      handleLinkClick();
                    }}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                      <span className='ml-4 whitespace-nowrap'>
                        {item.name}
                      </span>
                    </div>
                    {item.subItems && (
                      <motion.div
                        animate={{ rotate: openSubMenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MdKeyboardArrowDown size={20} />
                      </motion.div>
                    )}
                  </NavLink>

                  {item.subItems && openSubMenu === item.name && (
                    <div className='pl-8'>
                      {item.subItems.map((subItem) => (
                        <NavLink 
                          key={subItem.href} 
                          to={subItem.href}
                          className={({ isActive }) => 
                            `flex items-center p-2 text-sm font-medium rounded-lg hover:bg-orange-400 transition-colors mb-2 ${
                              isActive ? 'bg-orange-500' : ''
                            }`
                          }
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="bg-white font-baji z-40 md:flex hidden">
        <div className='h-full bg-blue-800 w-[300px] md:pt-0 pt-[70px] overflow-y-auto custom-scrollbar backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
          <div className="p-[10px] flex justify-center items-center">
            <h1>Tech10BD</h1>
          </div>
          <nav className='flex-grow'>
            {SIDEBAR_ITEMS.map((item) => (
              <div key={item.href}>
                <NavLink 
                  to={item.href}
                  className={({ isActive }) => 
                    `flex items-center justify-between px-4 py-[12px] text-sm font-medium rounded-lg hover:text-orange-400 transition-colors mb-2 ${
                      isActive ? 'text-orange-500' : ''
                    }`
                  }
                  onClick={(e) => {
                    if (item.subItems) {
                      e.preventDefault();
                      toggleSubMenu(item.name);
                    }
                    handleLinkClick();
                  }}
                >
                  <div className="flex items-center">
                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                    <span className='ml-4 whitespace-nowrap'>
                      {item.name}
                    </span>
                  </div>
                  {item.subItems && (
                    <motion.div
                      animate={{ rotate: openSubMenu === item.name ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MdKeyboardArrowDown size={20} />
                    </motion.div>
                  )}
                </NavLink>

                {item.subItems && openSubMenu === item.name && (
                  <div className='pl-8'>
                    {item.subItems.map((subItem) => (
                      <NavLink 
                        key={subItem.href} 
                        to={subItem.href}
                        className={({ isActive }) => 
                          `flex items-center p-2 text-sm font-medium rounded-lg hover:text-orange-400 transition-colors mb-2 ${
                            isActive ? 'text-orange-500' : ''
                          }`
                        }
                        onClick={handleLinkClick}
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;