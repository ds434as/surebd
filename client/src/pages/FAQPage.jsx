import React,{useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { IoCall } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import Subscribebox from '../components/home/Subscribebox';
import Support from '../components/home/Support';
import { FaShippingFast, FaRedo, FaLock, FaQuestionCircle, FaCreditCard } from "react-icons/fa";

const faqData = [
  { question: "What shipping methods are available?", answer: "We offer a variety of shipping options to meet your needs..." },
  { question: "How to order?", answer: "Simply add products to your cart and proceed to checkout..." },
  { question: "How long will it take to get my package?", answer: "Delivery times vary depending on your location..." },
  { question: "Where are your products sent from?", answer: "Our products are shipped from multiple warehouses..." },
  { question: "How to change or modify billing address?", answer: "You can update your billing address in your account settings..." },
  { question: "Why can't I log into my account?", answer: "Ensure you are using the correct email and password..." }
];
const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
  return (
    <section className='w-full font-baji'>
      <Header/>
      {/* --------------------hero section--------------------- */}
      {/* <section 
  className='w-full h-[28vh] bg-[#F6F6F6] relative'>
  <div className="flex justify-center w-full h-full items-center flex-col bg-white bg-opacity-50">
    <h1 className='text-heading1 font-[600] mb-[10px]'>Frequently Asked Questions</h1>
    <ul className="flex space-x-2 text-[17px] font-[500]">
      <li>Home</li>
      <li>/</li>
      <li>FAQ</li>
    </ul>
  </div>
       </section> */}
       <section>
       <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">FREQUENTLY ASKED QUESTIONS</h2>
      <p className="text-center text-gray-600 mb-6">Find answers to common questions below</p>
      
      <p className="text-gray-600 text-center mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat erat at velit facilisis. Nullam eget malesuada purus. Fusce imperdiet pulvinar est, eget fermentum nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
      </p>
      
      {faqData.map((item, index) => (
        <div key={index} className="border-b py-3">
          <button 
            className="w-full text-left font-semibold text-lg flex justify-between items-center" 
            onClick={() => toggleAccordion(index)}
          >
            {item.question}
            <span>{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && <p className="text-gray-600 mt-2">{item.answer}</p>}
        </div>
      ))}
      
      <div className="text-center mt-6">
        <p className="text-gray-600">Can't find the answer you are looking for?</p>
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">CONTACT SUPPORT</button>
      </div>
    </div>
       </section>
      {/* --------------------------contact -form-------------------------- */}
      <Support/>
      <Footer/>
    </section>
  )
}

export default FAQPage
