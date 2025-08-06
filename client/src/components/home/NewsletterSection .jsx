import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await axios.post("https://surebdbackend.arbeittechnology.com/user/newsletter", { email });

      if (res.status === 201) {
        toast.success(res.data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <section className="w-full bg-blue-900 py-12 sm:py-16 px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px]  font-baji">
      <Toaster />

      <div
        className="w-full flex flex-col md:flex-row items-center justify-between gap-8"
        data-aos="fade-up"
      >
        {/* Text Content */}
        <div className="text-white text-center md:text-left w-full md:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold">Sign Up for Newsletter</h2>
          <p className="mt-3 text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Get E-mail updates about our latest products and special offers.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 max-w-lg flex"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 py-3 px-4 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-[#F02757] hover:bg-pink-600 text-white px-6 py-3 rounded-r-md font-semibold text-sm transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
