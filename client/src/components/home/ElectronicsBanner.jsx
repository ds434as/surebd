import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function ElectronicsBanner() {
  return (
    <div className="w-full  px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] py-6   font-baji">
      <div className="flex items-center bg-[#ffd600] rounded-lg justify-center lg:justify-between relative py-[50px] px-[20px]">
        {/* Left Earphones Image */}
        <div className="lg:block hidden">

        </div>
        <motion.img
          src="https://electio.ecom.themepreview.xyz/home-two/wp-content/uploads/sites/5/2023/10/earphone-2-1.png"
          alt="Earphones"
          className=" object-contain absolute bottom-0 lg:block hidden"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Center Text & Button */}
        <div className="text-center space-y-1 lg:space-y-4">
          <motion.h2
            className="text-[25px] lg:text-4xl font-bold text-[#001958]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Super Friendly
          </motion.h2>
          <motion.h2
            className="text-[25px] lg:text-4xl font-bold text-[#001958]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Electronics Store
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#001958] text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Shop Now <FiArrowRight className="text-lg" />
          </motion.button>
        </div>

        {/* Right Watch Image */}
        <motion.img
          src="https://electio.ecom.themepreview.xyz/home-two/wp-content/uploads/sites/5/2023/10/watch-1.png"
          alt="Watch"
          className="w-[180px] object-contain lg:block hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
