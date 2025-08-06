import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";
const Footer = ( ) => {
  return (
    <footer className="bg-white py-8 border-t font-baji border-gray-200 text-sm md:text-base">
      <div className="container mx-auto px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex justify-center mb-4 lg:mb-8">
          <div className="logo flex justify-center items-center gap-2">
            <img className='w-[120px] md:w-[180px]' src={logo} alt="Logo" />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2">About Us</h3>
            <p className="text-gray-500 text-xs md:text-sm">
              We know there are a lot of three developers out there, but we pride ourselves on being a firm in the industry.
            </p>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Feature</h3>
            <ul className="text-gray-500 space-y-1 text-xs md:text-sm">
              <li>About Us</li>
              <li>Terms Condition</li>
              <li>Best Products</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2">General Links</h3>
            <ul className="text-gray-500 space-y-1 text-xs md:text-sm">
              <li>Blog</li>
              <li>Tracking Order</li>
              <li>Become Seller</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Helpful</h3>
            <ul className="text-gray-500 space-y-1 text-xs md:text-sm">
              <li>Flash Sale</li>
              <li>FAQ</li>
              <li>Support</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs md:text-sm">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <NavLink to="https://www.instagram.com/tech10mirpur?igsh=dDF6bDE3Y3kyemZ4 ">
               <FaInstagram className="text-gray-600 hover:text-gray-900 cursor-pointer" size={16} />
            </NavLink>
            <NavLink to="https://www.facebook.com/share/1APmhKvNr2/">
            <FaFacebookF className="text-gray-600 hover:text-gray-900 cursor-pointer" size={16} />
            </NavLink>
            <NavLink to="https://youtube.com/@tech10-b8b?si=7qjLPIEhyNBtRX8Q">
            <FaYoutube className="text-gray-600 hover:text-gray-900 cursor-pointer" size={16} />
            </NavLink>
          </div>

          {/* Copyright */}
          <p>
            ©2022 <span className="font-semibold">Arbeit Technology</span> All rights reserved
          </p>

          {/* Payment Methods */}
          <div className="flex space-x-2 mt-4 md:mt-0 gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6  w-6 md:h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6 w-6 md:h-8" />
            <img src="https://xxxbetgames.com/icons-xxx/payments/134.svg" alt="PayPal" className="h-8 w-6 md:h-10" />
            <img src="https://xxxbetgames.com/icons-xxx/payments/138.svg" alt="Skrill" className="h-8 w-6 md:h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
