import { useState } from "react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiUser, FiDownload } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoGiftOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { name: "Dashboard", icon: <RiDashboardHorizontalLine /> },
    { name: "Orders", icon: <BsCart3 /> },
    { name: "Addresses", icon: <MdOutlineLocationOn /> },
    { name: "Wishlist", icon: <LuHeart /> },
    { name: "Account Details", icon: <FiUser /> },
    { name: "Logout", icon: <TbLogout /> },
  ];

  const orders = [
    { id: "#2245", title: "How can I share ?", status: "Pending", action: "Invoice", statusColor: "text-[#eb3b5a]" },
    { id: "#2220", title: "Send money, but not working", status: "Need your reply", action: "Reply", statusColor: "text-red-500" },
    { id: "#2125", title: "Balance error", status: "Resolved", action: "Invoice", statusColor: "text-green-500" },
  ];

  const wishlistItems = [
    { image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-10-600x600.jpg", title: "Product 1", price: "$50.00" },
    { image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-10-600x600.jpg", title: "Product 2", price: "$30.00" },
  ];
 const storedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="w-full font-baji">
      <Header />
      <section className="px-4 md:px-8 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto">
          
          {/* Sidebar Toggle Button (Mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center px-4 py-2 mb-4 bg-gray-200 text-gray-700 rounded-md"
          >
            <HiMenuAlt3 className="text-2xl mr-2" /> Menu
          </button>

          {/* Sidebar */}
          <div className={`lg:w-1/4 ${sidebarOpen ? "block" : "hidden"} lg:block bg-white p-4 rounded-lg `}>
            <div className="flex flex-col items-center mb-6">
              {/* <img
                src="https://new.axilthemes.com/demo/template/etrade/assets/images/product/author1.png"
                alt="User Avatar"
                className="rounded-full mb-2 w-20 h-20"
              /> */}
              <h2 className="text-lg font-semibold">{storedUser.username}</h2>
              {/* <p className="text-sm text-gray-500">eTrade Member Since Sep 2020</p> */}
            </div>
            <nav>
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full mb-2 px-4 py-2 text-left rounded-md transition ${
                    activeTab === tab.name ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2 text-xl">{tab.icon}</span> {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 w-full bg-white p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">{activeTab}</h1>
            <div>
              {activeTab === "Dashboard" && (
                <div className="">
                <h2 className="text-[18px] font-[500] lg:text-[22px] mb-[10px]">Hello {storedUser.username}!</h2>
                <p>From your account dashboard. you can easily check & view your recent orders,
                manage your shipping and billing addresses and edit your password and account details.</p>
                </div>
              )}

              {activeTab === "Orders" && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Order Id</th>
                        <th className="border p-2">Product Title</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index} className="text-center">
                          <td className="border p-2 text-[#eb3b5a] cursor-pointer">{order.id}</td>
                          <td className="border p-2">{order.title}</td>
                          <td className={`border p-2 ${order.statusColor}`}>{order.status}</td>
                          <td className="border p-2">
                            <button className="px-4 py-1 border border-gray-300"> {order.action} </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "Wishlist" && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Product Title</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistItems.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td className="border p-2">
                            <img src={item.image} alt={item.title} className="w-16 h-16 mx-auto rounded-md" />
                          </td>
                          <td className="border p-2">{item.title}</td>
                          <td className="border p-2">{item.price}</td>
                          <td className="border p-2">
                            <button className="text-red-500" onClick={() => alert("Deleted")}>
                              <AiOutlineDelete size={22} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default AccountPage;
