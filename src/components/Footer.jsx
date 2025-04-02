import React from 'react'

function Footer() {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
         <div className="logo font-bold text-white text-2xl "  >
        <span style={{color:"green"}}>   &lt; </span>
            Pass
        <span style={{color:"green"}} >Op/&gt; </span>
            </div>
            <div className='flex justify-center items-center'>
      Created With <img className=' w-7 m-2' src="icons/heart.png" alt="" />
      By Himanshu </div>
    </div>
  )
}

export default Footer
