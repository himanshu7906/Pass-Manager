import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4} from 'uuid';

function Manager() {
    const ref = useRef();
    const passwordref = useRef();
    const [passwordArray, setPasswordArray] = useState([]);
    const [form, setForm] = useState({ site: "", username: "", password: "" });


    const getPasswords = async () => {
    
        let req = await fetch("http://localhost:3500/");
         const passwords = await req.json(); 
    
            setPasswordArray(passwords); 
            console.log(passwords);
      
    };
    

    // Load passwords from localStorage when the component mounts
    useEffect(() => {
            getPasswords();
        
    }, []);

    const copyText = (text) => {
        toast('Copy To Clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }
    // Show/hide password functionality
    const showPassword = () => {
       ref.current.type = "password";
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordref.current.type = "text";

        } else {
            ref.current.src = "icons/eyecross.png";
            passwordref.current.type = "password";

        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const savePassword = async() => {

    if(form.site.length >3 && form.username.length >3 && form.password.length >3)
        {

    await fetch("http://localhost:3500/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({ id:form.id })
    
})
    setPasswordArray([...passwordArray, {...form , id: uuidv4()}]);
    await fetch("http://localhost:3500/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form , id: uuidv4()})
    })
    //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id: uuidv4()}])); // Save to localStorage
    console.log(passwordArray);
    setForm({ site: "", username: "", password: "" });
    toast('Password Saved !', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
    });
}
else{
    toast(" Error : Password Not Saved ! ")
}
    };

    const deletePassword = async(id) => {
        let c = confirm("Are you sure you want to delete this password?");
        if( c)
        {
    
        console.log("Password Delted Id :" ,id);
        setPasswordArray(passwordArray.filter((item)=> item.id !== id));
        await fetch("http://localhost:3500/",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ id })
        })
      //  localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=> item.id !== id))); // Save to localStorage
        console.log(passwordArray);
        }
        toast('Password Deleted !', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
    };

    const editPassword = (id) => {
        console.log("Password Delted Id :" ,id);
        setForm({...passwordArray.filter((item)=> item.id ===id)[0] , id : id});
        setPasswordArray(passwordArray.filter((item)=> item.id !== id));
     //   localStorage.setItem("passwords", JSON.stringify([...passwordArray, form])); // Save to localStorage
        console.log(passwordArray);
        toast('Password Updated !', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            //  transition={Bounce}
            />
            <div className=" absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className=" p-3 pt-10   md: mycontainer min-h-[84.6vh]">
                <h1 className="text-4xl te xt font-b old text-center ">
                    <span style={{ color: "green" }}>&lt; </span>Pass
                    <span style={{ color: "green" }}> Op/&gt; </span>
                </h1>
                <p className="text-green-700 text-center  text-lg">Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        name="site"
                        className="rounded-full border-4 border-green-300 w-full text-black  p-4 py-1"
                        type="text"
                        placeholder="Enter Website Url"
                        aria-label="Enter Website URL"
                    />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                            className="rounded-full border-4 border-green-300 w-full text-black  p-4 py-1"
                            type="text"
                            placeholder="Enter Username"
                            aria-label="Enter Username"
                        />
                        <div className="relative">
                            <input
                                ref={passwordref}
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                                className="rounded-full border-4 border-green-300 w-100 text-black  p-4 py-1"
                                type="password"
                                placeholder="Enter Password"
                                aria-label="Enter Password"
                            />
                            <span className="absolute right-[10px] top-[3px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={30} src="/icons/eyecross.png" alt="Show Password" aria-label="Show password" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="flex justify-center items-center gap-2 border-3 border-green-800 bg-green-600 hover:bg-green-300 rounded-full px-4 py-2 w-fit">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl mb-3'>Your Passwords</h2>
                    {passwordArray.length === 0  && <div> No Passwords Found</div> }
                    {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
                        <thead className='bg-green-600 text-white  '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' justify-center py-2 border border-white text-center  ' >
                                        <div className='flex items-center justify-center ' onClick={() => { copyText(item.site) }}>
                                            {item.site}
                                            <div className='lordCopy size-7 cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gsjfryhc.json"
                                                    trigger="hover"
                                                    style={{ width : "23px",  height : "23px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center py-2 border border-white text-center  ' >
                                        <div className='flex items-center justify-center ' onClick={() => { copyText(item.username) }}>
                                            {item.username}
                                            <div className='lordCopy size-7 cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gsjfryhc.json"
                                                    trigger="hover"
                                                    style={{width : "23px",  height : "23px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center py-2 border border-white text-center  ' >
                                        <div className='flex items-center justify-center'>
                                            {"*".repeat(item.password.length)}
                                            <div className='lordCopy size-7 cursor-pointer ' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gsjfryhc.json"
                                                    trigger="hover"
                                                    style={{ width : "23px", height : "23px", paddingTop: "1px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center py-2 border border-white text-center  ' >
                                        <div className='flex items-center justify-center '>
                                            <span className='cursor-pointer mx-2 ' onClick={()=>{editPassword(item.id)}} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                                    trigger="hover"
                                                    style={{width:"25px",height:"25px"}}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}} >
                                                <lord-icon
                                                     src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{width:"25px",height:"25px"}}>
                                                </lord-icon>
                                            </span>


                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    );
}

export default Manager;

