import React, { useContext } from 'react'
import shopimg from "../../assets/shop.png"
import { PiWechatLogoFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import packagingimg from "../../assets/packaging.png"
import { HiOutlineMenu } from "react-icons/hi";
import { Appcontext } from '../../context/Appcontext';
import { RxEnterFullScreen } from "react-icons/rx";
import { MdOutlineNotificationsActive } from "react-icons/md";
const Sellerheader = () => {
    const {activesidebar,setactivesidebar}=useContext(Appcontext);
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
  return (
    <header className='w-full font-poppins h-[10vh] px-[20px] md:px-[30px] py-[10px] border-b-[1px] border-[#eee] shadow-sm flex bg-white justify-between items-center'>
        <div className="cursor-pointer text-[22px]"onClick={handlesidebar}>
        <HiOutlineMenu/>
        </div>
        <div className='flex justify-center items-center gap-[20px]'>
          <div className='cursor-pointer bg-[#EFF2F6] w-[40px] p-[5px] h-[40px] rounded-full flex justify-center items-center'>
            <RxEnterFullScreen className='text-[20px]'/>
          </div>
          <div className='relative before:absolute before:top-[-7px] cursor-pointer before:right-[-8px] before:w-[8px] before:h-[8px] before:bg-indigo-600 before:rounded-full'>
            <MdOutlineNotificationsActive className='text-[25px]'/>
          </div>
          <div className='flex justify-center items-center gap-[5px] md:gap-[10px]'>
            <div>
              <img className='w-[40px] h-[40px] rounded-full' src="https://themesflat.co/html/ecomus/admin-ecomus/images/avatar/user-1.png" alt="" />
            </div>
            <div>
              <h2 className='text-[14px] font-[600]'>Abu Said Shihab</h2>
              <p>saller</p>
            </div>
        </div>
        </div>
    
        {/* ----------------BsFullscreen------------ */}
    </header>
  )
}

export default Sellerheader