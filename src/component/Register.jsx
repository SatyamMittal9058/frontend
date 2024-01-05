import axios from 'axios';
import React, {useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import { URL, backendURL } from './backendApi';
const Register= () => {
    const navigate=useNavigate();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [errMessage,setErrMessage]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${backendURL}/user/register`,{
                name,
                email,
                password,
            })
            setErrMessage("");
            alert(res.data.message);
            navigate("/");
        }catch(err){
            alert(err.res.data.message);
            setErrMessage(err.res.data.message);
        }
    }

    return (
        <div className="bg-slate-800 h-screen">
            <div >
                <form onSubmit={handleSubmit} className="w-4/12 absolute p-10 bg-black my-16 mx-auto right-0 left-0 text-white bg-opacity-50">
                    <h1 className="font-bold text-3xl py-4">Register</h1>
                    <input
                        type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700" value={name} onChange={(e)=>setName(e.target.value)}/>

                    <input type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input
                         type="password" placeholder="Enter Password" className="p-4 my-2 w-full bg-gray-700" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <p className="text-red-500">{errMessage} </p>
                    <button className="w-full p-4 my-2 bg-red-700 rounded-lg">Register</button>
                    <p className="py-2 cursor-pointer" >Already registered?<Link to='/' className="underline">Login Now </Link></p>
                </form>
            </div>
        </div>
    )
}
export default Register;