import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { addUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast'
import { backendURL } from './backendApi';
const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [errMessage,setErrMessage] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(`${backendURL}/user/login`,{
                email,
                password,
            });
            dispatch(addUser(response.data));
            localStorage.setItem("token",response.data.token);
            localStorage.setItem('userInfo',JSON.stringify(response.data));
            toast.success(response.data.message);
            setErrMessage("");
            navigate("/home");
        }catch(err){
            setErrMessage(err.message);
            toast.error(err.message);    
        }
    }
    return (
        <div className="bg-slate-800 h-screen">
            <div >
                <form onSubmit={handleSubmit} className="w-4/12 absolute p-10 bg-black my-16 mx-auto right-0 left-0 text-white bg-opacity-50">
                    <h1 className="font-bold text-3xl py-4">Login</h1>
                    <input type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input
                        type="password" placeholder="Enter Password" className="p-4 my-2 w-full bg-gray-700" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <p className="text-red-500">{errMessage} </p>
                    <button className="w-full p-4 my-2 bg-red-700 rounded-lg">Login</button>
                    <p className="py-2 cursor-pointer" >New User? <Link to='/register' className="underline">Register Now</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Login