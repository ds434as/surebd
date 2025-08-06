import React, { useContext,useState,useEffect,useRef } from 'react'
import { IoIosStar } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Appcontext } from '../../context/Appcontext';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
const Flashsellbox = ({data}) => {
    const {addToitem,setactiveitem}=useContext(Appcontext);
    const [addtoanimation,setaddtoanimation]=useState(false);
  const backend_link="https://mern.sultaangroup.com";

    const confettiRef = useRef(null);
    const addtocartfunction=(e)=>{
        e.preventDefault();
        addToitem(data);
        setactiveitem(true);
        setaddtoanimation(true)
        toast.success(`You have added ${data.title}`);
        setTimeout(() => {
            setaddtoanimation(false)
          }, 3000);
      }
      const [getday,setday]=useState(0);
      const [gethour,sethour]=useState(0);
      const [getmin,setmin]=useState(0);
      const [getsec,setsec]=useState(0);
      const timeend=data.ending_time;
      if(getday < 0 ){
        setday(0)
    }
    if(gethour < 0){
        sethour(0)
    }if(getmin < 0){
        setmin(0)
    }if(getsec < 0){
        setsec(0)
    }
      const gettime=()=>{
          const endingtime=Date.parse(timeend)-Date.now();
          setday(Math.floor(endingtime/(1000*60*60*24)));
          sethour(Math.floor(endingtime/(1000*60*60)%24));
          setmin(Math.floor((endingtime/1000/60)%60));
          setsec(Math.floor((endingtime/1000)%60));
      }
      useEffect(()=>{
    
            const interval=setInterval(() => {
                gettime(timeend);
            }, 1000);
            return ()=>clearInterval(interval)
      },[])
  return (
    <NavLink to={`/product-details/${data._id}`}  className="bg-red-500 w-[100%]">
    <div className='mr-[5px] lg:mr-[10px] h-auto border-[1px] border-product_border cursor-pointer  shadow-product group '>
    <div className='w-full bg-[whitsmoke] p-[8px] relative '>
    {
    data.photo.slice(0,1).map((images)=>{
        return(
            <img className='w-full h-[150px] md:h-[250px] ' src={`${backend_link}/images/${images}`} alt="" />
        )
    })
   }

<div className={addtoanimation ? "cart overflow-hidden absolute bottom-[10px] md:bottom-[20px] bg-gradient-to-r from-indigo-700 to-purple-600 text-white right-[5px] md:right-[14px] px-[15px] py-[10px] text-[16px] md:text-[20px]  cursor-pointer  flex justify-center items-center rounded-[5px] " :"cart absolute bottom-[10px] md:bottom-[20px] bg-bordercolor transition-all duration-300 text-white right-[5px] md:right-[14px] px-[15px] py-[10px] text-[16px] md:text-[20px] hover:text-[#088178] cursor-pointer hover:bg-[#e8f6ea] hover:border-[1px] hover:border-[#cce7d0] flex justify-center items-center rounded-[5px]"} onClick={addtocartfunction}>
<button className='flex justify-center items-center gap-[10px]'><span > <TbShoppingBagPlus/> </span><span className={addtoanimation ? "block transition-all text-[13px] md:text-[16px] duration-300":"hidden"}>Added   {addtoanimation && (
        <Confetti
          ref={confettiRef}
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          gravity={0.2}
        />
      )}</span> </button>
</div>
<div className='absolute top-[3%] left-[5%]' >
<span className='bg-[#3BB77E] lg:flex hidden px-[15px] py-[6px] font-fredoka font-[500] rounded-[1px] text-[13px] text-white'>Hot</span>
</div>
    </div>
    {
  data.discount==0 ? "":<span className='lg:flex hidden absolute top-[10px] right-[20px] px-[25px] before:absolute overflow-hidden before:top-[10%] before:left-[-20%] before:w-[30px] before:h-[30px] before:bg-white before:rotate-[135deg] w-auto py-[6px] text-[10px] md:text-[14px] font-fredoka bg-[#e74c3c] text-white'>
  <h2>20% Off</h2>
</span>
}
    <div>
    <div className='flex w-full bg-[whitesmoke]  justify-center items-center gap-[1px] lg:gap-[10px] '>
<div className=' h-auto p-[5px]  text-center'>
<h2 className='text-[12px] md:text-[16px] font-[700]'>{getday}</h2>
<p className='text-[12px] md:text-[14px]'>Day</p>
</div>
<div className=' h-auto p-[5px]  text-center'>
<h2 className='text-[12px] md:text-[16px] font-[700]'>{gethour}</h2>
<p className='text-[12px] md:text-[14px]'>Hour</p>
</div>
<div className='h-auto p-[5px]  text-center'>
<h2 className='text-[12px] md:text-[16px] font-[700]'>{getmin}</h2>
<p className='text-[12px] md:text-[14px]'>Min</p>
</div>
<div className=' h-auto p-[5px]  text-center'>
<h2 className='text-[12px] md:text-[16px] font-[700]'>{getsec}</h2>
<p className='text-[12px] md:text-[14px]'>Sec</p>
</div>


    </div>
    </div>
    <div className='p-[5px] lg:p-[15px]'>
        <div className='flex justify-start lg:justify-between lg:items-center mb-[5px] lg:flex-row flex-col'>
        <p className='text-neutral-600 text-[12px] md:text-[14px] '>Snacks</p>
        <div className='flex justify-start items-center gap-[5px]'>
            <div className='flex justify-start items-center gap-[5px] text-[#FDB241] text-[12px] md:text-[16px]'>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
            </div>
            <p className='text-[12px] md:text-[14px] text-neutral-500'>(2)</p>
        </div>
        </div>
     
        <div className='md:block hidden'>
{data.title.length>25 ? 
<h1 className='text-headingcolor text-[14px] md:text-[16px] font-[500] '>
{data.title.slice(0,25)}...</h1>: 
<h1 className='text-headingcolor text-[14px] md:text-[16px] font-[500] '>
{data.title}</h1>}
</div>
<div className='md:hidden block'>
{data.title.length>15? 
<h1 className='text-headingcolor text-[14px] md:text-[16px] font-[500] '>
{data.title.slice(0,15)}.</h1>: 
<h1 className='text-headingcolor text-[14px] md:text-[16px] font-[500] '>
{data.title}</h1>}
</div>

        <div className='flex justify-between lg:justify-start items-center gap-[20px] pt-[5px]'>
                <h1 className=''><span className='text-[16px] md:text-[18px] font-[600] text-black'>$23</span><span className='text-[14px] md:text-[16px] text-[400] text-neutral-500 line-through ml-[5px]'>$30</span></h1>
                <h3 className='text-[12px] md:text-[16px] font-[500] text-red-500'>10% Off</h3>
            </div>
    </div>
   </div>
        </NavLink>

  )
}

export default Flashsellbox