import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Category from '../components/home/Category'
import "aos/dist/aos.css";
import AOS from "aos";
import axios from 'axios';
import {
    FaLaptop,
    FaHome,
    FaCouch,
    FaMale,
    FaHeadphones,
    FaShoppingCart,
    FaLeaf,
  } from "react-icons/fa";
import Collections from '../components/home/Collections';
import Homeproduct from '../components/home/Homeproduct';
import Topbrand from '../components/home/Topbrand';
import Flashsell from '../components/home/Flashsell';
import Bestseller from "../components/home/Bestseller"
import Newarrival from "../components/home/Newarrival"
import Hblog from "../components/home/Hblog"
import Footer from '../components/Footer';
import Subscribebox from '../components/home/Subscribebox';
import NewsletterSection from '../components/home/NewsletterSection ';
import Topcategoty from "../components/home/Topcategory"
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import ElectronicsBanner from '../components/home/ElectronicsBanner';
import FeatureGrid from '../components/home/FeatureGrid';



const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      easing: "ease-in-out", // Easing function
      once: true, // Whether the animation should happen only once
    });
  }, []);
  const [current, setCurrent] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [banners, setBanners] = useState([]);
 const fetchBanners = async () => {
      try {
        console.log("hello")
        const response = await axios.get("https://surebdbackend.arbeittechnology.com/admin/banners"); // Update with your API endpoint
        setBanners(response.data.filenames || []); // Set filenames as banners
        console.log(response)
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
  // Fetch banners from API
  useEffect(() => {
   

    fetchBanners();
  }, []);
  const slides = [
    {
      image: "https://img.lazcdn.com/us/domino/c3a8afb5-a573-4c69-8f93-695f9ca15e2f_BD-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      image: "https://img.lazcdn.com/us/domino/1f724b05-1779-43a2-aa7d-ebcc9e2df87f_BD-1976-688.jpg_2200x2200q80.jpg",
    }, {
      image: "https://img.lazcdn.com/us/domino/22a15a5a-d920-4209-acfd-aced8f25f44c_BD-1976-688.jpg_2200x2200q80.jpg",
    }, {
      image: "https://img.lazcdn.com/us/domino/c3a8afb5-a573-4c69-8f93-695f9ca15e2f_BD-1976-688.jpg_2200x2200q80.jpg",
    },
  ];
 const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval); // Clear interval on unmount
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  
  return (
    <section>
        <Header/>
               {/* ----------------------banner----------------------- */}
     <section className='px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] py-[20px] font-baji'>
      <section className='w-full h-auto flex flex-col lg:flex-row justify-center items-center gap-[20px]'>
        <div className='w-full'>
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {banners.map((slide, index) => (
                <div
                  key={index}
                  className="flex min-w-full flex-col md:flex-row items-center text-white"
                >
                  <img
                    className='w-full h-[400px] lg:h-[500px] object-cover'
                    src={`https://surebdbackend.arbeittechnology.com/images/${slide}`}
                    alt={`Slide ${index}`}
                  />
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="space-x-2 absolute bottom-0 left-0 pb-[20px] w-full flex justify-center items-center">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-orange-300 h-2 w-6" : "bg-white h-2 w-2"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>

             {/* ----------------------banner----------------------- */}
        <Category/>
        <Bestseller/>
        {/* <ElectronicsBanner/> */}
        {/* <Topcategoty/> */}
        <Flashsell/>
        {/* -------------------------------new ARRIVAL------------------------------------------ */}
        {/* <section className="px-4 sm:px-6 font-baji md:px-8 lg:px-12 xl:px-20 2xl:px-36 py-6 w-full flex flex-col lg:flex-row justify-center gap-4 md:gap-6">
  {[
    {
      img: "https://vue.envytheme.com/tuan/_nuxt/offer-4.Daxxxo-I.png",
      title: "Time to Upgrade: Smart Watches Sale",
    },
    {
      img: "https://vue.envytheme.com/tuan/_nuxt/offer-5.Bqtmv4va.png",
      title: "Time to Upgrade: Smart Watches Sale",
    },
  ].map((item, index) => (
    <div key={index} className="bg-[#fef6ed] w-full sm:w-[80%] md:w-[48%] lg:w-[50%] rounded-lg flex  flex-col md:flex-row items-center p-4 sm:p-6">
      <div className="flex-1 text-center md:text-left">
        <p className="text-red-500 font-semibold text-xs sm:text-sm md:text-base">Hurry Up!</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-2">
          {item.title}
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Unleash Smart Savings Today!</p>
        <NavLink
          to="/products"
          className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg mt-4 font-medium hover:bg-green-600 transition text-sm sm:text-base"
        >
          Shop Now &rarr;
        </NavLink>
      </div>
      <div className="flex-1 w-full flex justify-end mt-6 md:mt-0 pt-4">
        <img
          src={item.img}
          alt="Smart Watches Sale "
          width={250}
          height={250}
          className="object-contain lg:flex hidden w-28 sm:w-36 md:w-44 lg:w-52"
        />
      </div>
    </div>
  ))}
</section> */}
        {/* <FeatureGrid/> */}
        <Newarrival/>
        <Topbrand/>
        <Hblog/>
        <NewsletterSection/>
        <Footer/>
    </section>
  )
}

export default Home
