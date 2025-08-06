import React,{useState} from 'react'
import { RiUserLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import toast,{ Toaster, resolveValue } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const backend_link="http://localhost:8800";
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [subject,setsubject]=useState("");
  const [phone,setphone]=useState("");
  const [message,setmessage]=useState("");
  // contact form message send
  const handleform = (e) => {
    e.preventDefault();
  
    // ✅ Fix the condition: check that all fields are filled
    if (name && email && subject && phone && message) {
      axios.post(`https://surebdbackend.arbeittechnology.com/user/contact`, {
        name,
        email,
        subject,
        phone,
        message,
      })
      .then((res) => {
        if (res.data) {
          toast.success("Your contact information has been submitted!");
        }
      })
      .catch((err) => {
        console.log("Contact form error:", err);
        toast.error("Something went wrong. Please try again.");
      });
    } else {
      toast.error("Please fill in all fields.");
    }
  };
  
  return (
<div className='font-poppins'>
        <Header/>
        <Toaster
  position="bottom-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      width:"100%",
      background: '#0fb9b1',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
        {/* --------------checkout section---------------------- */}
        <div className='w-full bg-[#FCFCFC] h-auto font-poppins'>
      
        <div className='w-full  py-[20px] flex justify-center font-fredoka items-start  flex-col px-[20px] md:px-[150px]'>
                        <ul className='flex justify-start items-center gap-[10px]'>
                            <li className='text-[14px] md:text-[16px]'>Home</li>
                            <li><IoIosArrowForward/></li>
                            <li className='text-[14px] md:text-[16px]'>Contact</li>
                        </ul>
                    </div>
                </div>

                {/* -----------------------contact form------------------- */}
                <section className='md:px-[150px] px-[20px] py-[30px] md:py-[50px] '>
                   <section className='flex justify-between flex-col lg:flex-row items-center gap-[10px] lg:gap-[30px]'>
                    <div className='w-full lg:w-[30%] flex gap-[20px] justify-center items-center'>
                      <div>
                        <img className='w-[60%] lg:w-full' src="https://shofy-nuxt.vercel.app/img/contact/contact-icon-2.png" alt="" />
                      </div>
                      <div>
                        <h1 className='text-[15px] lg:text-[20px] font-[500] mt-[10px] font-fredoka'>United Kingdom</h1>
                        <p className='font-poppins text-[14px] lg:text-[15px] font-[500] text-neutral-700 mt-[5px]'>6391 Elgin St. Celina, Delaware 10299</p>
                        <p className='text-neutral-500 font-poppins text-[15px] mt-[5px]'>(808) 555-0111</p>
                      </div>
                    </div>
                    <div className='w-full lg:w-[30%] flex gap-[20px] justify-center items-center'>
                      <div>
                        <img className='w-[60%] lg:w-full' src="https://shofy-nuxt.vercel.app/img/contact/contact-icon-2.png" alt="" />
                      </div>
                      <div>
                        <h1 className='text-[15px] lg:text-[20px] font-[500] mt-[10px] font-fredoka'>United Kingdom</h1>
                        <p className='font-poppins text-[14px] lg:text-[15px] font-[500] text-neutral-700 mt-[5px]'>6391 Elgin St. Celina, Delaware 10299</p>
                        <p className='text-neutral-500 font-poppins text-[15px] mt-[5px]'>(808) 555-0111</p>
                      </div>
                    </div>
                    <div className='w-full lg:w-[30%] flex gap-[20px] justify-center items-center'>
                      <div>
                        <img className='w-[60%] lg:w-full' src="https://shofy-nuxt.vercel.app/img/contact/contact-icon-2.png" alt="" />
                      </div>
                      <div>
                        <h1 className='text-[15px] lg:text-[20px] font-[500] mt-[10px] font-fredoka'>United Kingdom</h1>
                        <p className='font-poppins text-[14px] lg:text-[15px] font-[500] text-neutral-700 mt-[5px]'>6391 Elgin St. Celina, Delaware 10299</p>
                        <p className='text-neutral-500 font-poppins text-[15px] mt-[5px]'>(808) 555-0111</p>
                      </div>
                    </div>
                   </section>
                   <section className='border-[1px] border-[#e7e9eb] w-full h-auto  px-[20px] py-[10px] lg:p-[50px] flex lg:flex-row flex-col justify-between  gap-[30px] mt-[70px]'>
                    <div className='w-full lg:w-[40%]'>
                      <div className='w-full h-full'>
                        <img className='w-full h-full rounded-[10px]' src="https://vue.envytheme.com/tuan/_nuxt/contact-us.CcD-9NIM.png" alt="" />
                      </div>
                    </div>
                    {/* -------------------form -------------------- */}
                      <form className='w-full lg:w-[55%] font-poppins'onSubmit={handleform}>
                        <div>
                          <h1 className='text-[18px] md:text-[20px] font-[500] mb-[8px]'>Get In Touch</h1>
                          <p className='text-[12px] md:text-[14px] text-neutral-600'>Your Gateway to Excellence: Contact Us and Unlock a World of Possibilities</p>
                        </div>
                       <section className='pt-[20px]'>
                       <div className='flex justify-center items-center gap-[10px] mb-[15px]'>
                            <div className='w-[50%]'>
                              <label htmlFor=""className='text-[15px]'>Name<span>*</span></label><br />
                              <input type="text"onChange={(e)=>{setname(e.target.value)}} placeholder='Enter your name'className='w-full rounded-[2px] outline-indigo-400 text-[14px] placeholder-neutral-500 mt-[10px] h-[50px] border-[1px] border-[$ddd] px-[20px] ' />
                            </div>
                            <div className='w-[50%]'>
                              <label htmlFor=""className='text-[15px]'>Your Email<span>*</span></label><br />
                              <input type="text"onChange={(e)=>{setemail(e.target.value)}}placeholder='Enter your email'className='w-full rounded-[2px] outline-indigo-400 text-[14px] placeholder-neutral-500 mt-[10px] h-[50px] border-[1px] border-[$ddd] px-[20px] ' />
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-[10px]'>
                            <div className='w-[50%]'>
                              <label htmlFor=""className='text-[15px]'>Subject<span>*</span></label><br />
                              <input type="text"onChange={(e)=>{setsubject(e.target.value)}}placeholder='Enter your subject'className='w-full rounded-[2px] outline-indigo-400 text-[14px] placeholder-neutral-500 mt-[10px] h-[50px] border-[1px] border-[$ddd] px-[20px] ' />
                            </div>
                            <div className='w-[50%]'>
                              <label htmlFor=""className='text-[15px]'>Your Phone<span>*</span></label><br />
                              <input type="text"onChange={(e)=>{setphone(e.target.value)}}placeholder='Enter your phone'className='w-full rounded-[2px] outline-indigo-400 text-[14px] placeholder-neutral-500 mt-[10px] h-[50px] border-[1px] border-[$ddd] px-[20px] ' />
                            </div>
                        </div>
                        <div className='mt-[15px'>
                        <label htmlFor=""className='text-[15px]'>Message<span>*</span></label><br />
                           <textarea name="" id=""onChange={(e)=>{setmessage(e.target.value)}}placeholder='Message...'className='w-full py-[15px] rounded-[2px] outline-indigo-400 text-[14px] placeholder-neutral-500 mt-[10px] h-[150px] border-[1px] border-[$ddd] px-[20px] '></textarea>
                        </div>
                        <button className='px-[40px] py-[12px] rounded-[2px] bg-[#291F51] mt-[15px] text-white font-poppins text-[14px] md:text-[16px]'>Submit</button>
                       </section>
                      </form>
                    {/* -------------------form -------------------- */}
                   </section>
                </section>
                {/* -----------------------contact form------------------- */}
         {/* <section className='px-[30px] md:px-[140px] py-[30px] md:py-[50px]'> */}
             {/* --------------------------contact form----------------- */}
           {/* <div className='flex justify-between gap-[20px] py-[30px]  md:py-[50px] flex-col'>
              <div className='w-[100%] md:w-[60%]'>
                     <div className='pb-[20px]'>
                        <h1 className='text-[25px] font-[500] mb-[10px]'>We would love to hear from you.</h1>
                        <p className='text-[16px]'>If you’ve got great products your making or looking to work with us then drop us a line.</p>
                     </div>
                     <form action="">
                     <div className="inp w-[100%] h-[60px] relative mb-[15px]">
                                    <input type="text"placeholder='Enter your name'className='pl-[10%] pr-[5px] py-[5px] w-[100%] h-[60px] border-[1px] border-[#eaeaef] ' />
                                    <div className="icon absolute top-0 left-0 text-[20px] w-[10%] h-[100%]  flex justify-center items-center">
                                         <RiUserLine/>
                                  </div>
                              </div>
                              <div className="inp w-[100%] h-[60px] relative mb-[15px]">
                                    <input type="text"placeholder='Enter your email'className='pl-[10%] pr-[5px] py-[5px] w-[100%] h-[60px] border-[1px] border-[#eaeaef] ' />
                                    <div className="icon absolute top-0 left-0 text-[20px] w-[10%] h-[100%]  flex justify-center items-center">
                                         <HiOutlineMail/>
                                  </div>
                              </div>
                              <div>
                                <textarea name="" id=""placeholder='Message...'className=' w-[100%] h-[200px] p-[15px] border-[1px] border-[#eaeaef]'></textarea>
                              </div>
                              <button className='w-[200px] h-[55px] bg-btncolor text-white mt-[20px]'>Send Message</button>
                     </form>
              </div>
              <div className='w-[100%] md:w-[40%] h-auto md:h-[400px]'>
                    <div>
                        <h1 className='text-[25px] mb-[10px]'>Our Store</h1>
                        <p className='text-[#6c757d] text-[16px]'>8212 E. Glen Creek Street Orchard Park, NY 14127, United States of America</p>
                         <ul className='mt-[10px]'>
                            <li className='text-[#6c757d] text-[16px] list-none'>Phone: +123 456 7890</li>
                            <li className='text-[#6c757d] text-[16px] list-none mt-[5px]'>Email: Hello@etrade.com</li>
                         </ul>
                    </div>
                    <div className='mt-[20px]'>
                        <h1 className='text-[25px] mb-[10px]'>Opening Hours:</h1>
                        <p className='text-[#6c757d] text-[16px] list-none'>Monday to Saturday: 9am - 10pm</p>
                        <p className='text-[#6c757d] text-[16px] list-none mt-[5px]'>Sundays: 10am - 6pm</p>
                    </div>
              </div>
           </div>
           <div className='py-[10px] md:py-[20px]'>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49930866619!2d90.25487725384674!3d23.781067235418455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2z4Kai4Ka-4KaV4Ka-!5e0!3m2!1sbn!2sbd!4v1724216545059!5m2!1sbn!2sbd"  className='w-full h-[400px]' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
           </div> */}
             {/* --------------------------contact form----------------- */}
         {/* </section> */}
         <Footer/>
        {/* --------------checkout section---------------------- */}
    </div>
  )
}

export default Contact