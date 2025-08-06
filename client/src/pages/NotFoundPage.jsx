import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const NotFoundPage = () => {
  return (
   <section>
    <Header/>
     <div className="flex flex-col items-center justify-center py-[50px] bg-white font-poppins">
      {/* Image Section */}
      <div className="mb-8">
        <img
          src="https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/404-animation.gif"
          alt="404 Animation"
          className="w-[200px] md:w-[300px] lg:w-[400px] object-contain"
        />
      </div>

      {/* Title and Subtitle */}
      <div className="text-center">
        <h1 className="text-green-600 text-[40px] md:text-[50px] font-bold mb-2">
          Ooops...
        </h1>
        <h2 className="text-green-600 text-[32px] md:text-[40px] font-bold mb-2">
          404
        </h2>
        <p className="text-gray-600 text-[18px] md:text-[20px]">
          I think someone is playing
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
          onClick={() => window.location.href = "/"}
        >
          BACK TO HOMEPAGE
        </button>
        <button
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
          onClick={() => window.location.href = "/shop"}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
    <Footer/>
   </section>
  );
};

export default NotFoundPage;
