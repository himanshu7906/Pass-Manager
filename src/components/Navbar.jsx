import React from 'react'
function Navbar() {
  return (
    <nav className="bg-slate-800 " style={{color:"white"}}>
        <div className="mycontainer  flex justify-between items-center px-4  py-5 h-14">

        <div className="logo font-bold text-2xl"  >
        <span style={{color:"green"}}>   &lt; </span>
            Pass
        <span style={{color:"green"}} >Op/&gt; </span>
            </div>
        <ul>
            <li className='flex gap-4'>
                <a className='hover: font-bold' href="#">Home </a>
                <a className='hover: font-bold' href="#">About </a>
                <a className='hover: font-bold' href="#">Contact </a>
                
                
            </li>
        </ul>
        <div>
            <button className='text-white bg-slate-600  pr-2 my-5 rounded-md flex gap-1 ring-green-500 ring-1'>
                 <img className='invert p-1 w-10' src="icons/github.png"/> 
             <span className='font-bold pt-2'>GitHub</span>
            </button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar


