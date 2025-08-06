import React,{useContext, useState} from 'react'
import { Appcontext } from '../../context/Appcontext'
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
const Carditembox = ({data}) => {
    const [activeedit,setactivesdit]=useState(false)
    const {cartItems,incrementCartitem,removeitem,decrementCartitem}=useContext(Appcontext);
    const backend_link="http://localhost:8800";

  return (
    <div className='w-[100px] h-[100%]'>
    <div className='w-[100px] h-[100%] relative'>
   {
    activeedit ?  <div className='w-[100%] h-[100%] flex justify-center items-center bg-tranparentbg absolute top-0 left-0 z-[1000]'>
    <button className='px-[8px] py-[1px] text-[14px] font-[500] bg-white text-black'onClick={()=>{incrementCartitem(data._id)}}>+</button>
    <h1 className='px-[5px] py-[1px] text-[14px] font-[500] bg-white text-black'> {data.quantity}</h1>
    <button className='px-[8px] py-[1px] text-[14px] font-[500] bg-white text-black'onClick={()=>{decrementCartitem(data._id)}}>-</button>
    <button onClick={()=>{removeitem(data._id)}} className='text-white absolute top-[5%] left-[5%] text-[18px]'><MdDelete/></button>
 </div>:""
   }
        <div className='absolute top-[8px] text-white text-[12px] right-[10px] w-[20px] h-[20px] bg-orange-400 rounded-full flex justify-center items-center'>
            {data.quantity}
        </div>
        {
  data.photo.slice(0,1).map((images)=>{
    return(
      <img className='w-[100px] h-[100%] ' src={`${backend_link}/images/${images}`} alt="" />
    )
  })
}

       <div onClick={()=>{setactivesdit(true)}} className='absolute bottom-[5px] right-[10px] text-white text-[12px] w-[25px] h-[25px] flex justify-center items-center cursor-pointer bg-black'>
          <button><GrEdit/></button>
       </div>
    </div>
   </div>
  )
}

export default Carditembox