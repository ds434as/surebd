// FeatureGrid.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaTruck, FaGift, FaWallet, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck className="text-3xl text-red-500" />,
    title: "Free shipping",
    description: "Delivery within 5 to 7 days",
    animation: "fade-up",
  },
  {
    icon: <FaGift className="text-3xl text-red-500" />,
    title: "Gift voucher",
    description: "Surprise coupon voucher",
    animation: "fade-up",
  },
  {
    icon: <FaWallet className="text-3xl text-red-500" />,
    title: "Money back",
    description: "Refund within 30 days",
    animation: "fade-up",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-red-500" />,
    title: "Safe payment",
    description: "100% secure with us",
    animation: "fade-up",
  },
];

const FeatureGrid = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);
    
  return (
 <section>
        <div className="border rounded-md overflow-hidden mx-4 md:mx-10 my-8 bg-white shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x border-gray-200">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center p-6 hover:bg-gray-50 transition duration-300 ease-in-out"
            data-aos={item.animation}
            data-aos-delay={index * 100}
          >
            {item.icon}
            <h3 className="font-semibold text-lg text-gray-800 mt-3">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
 </section>
  );
};

export default FeatureGrid;
