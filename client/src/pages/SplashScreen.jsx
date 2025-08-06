import React, { useState, useEffect } from 'react';
import shopping_img from "../assets/logo.png"; // Ensure you import your image

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false); // After 3 seconds, hide the splash screen// Restore scroll once splash is hidden
    }, 3000);

  }, []);

  return (
    <section className={ isLoading ? "w-full h-[100vh] font-baji bg-white fixed top-0 left-0 z-[100000] flex justify-center items-center":"hidden"}>
        <div className="text-center">
          {/* Add your logo here */}
          <img
            src={shopping_img} // Replace with your actual logo
            alt="Logo"
            className=" mb-4 w-[200px] md:w-[300px] animate-pulse m-auto"
          />
          {/* Animated Text */}
        
          <p className="text-[17px] lg:text-xl text-black mt-2 animate-pulse">
            Your favorite eCommerce store
          </p>
        </div>
    </section>
  );
};

export default SplashScreen;
