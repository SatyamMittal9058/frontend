import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../store/userSlice';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store.user);
  const [url, setUrl] = useState("");
  const [shrtUrl, setShortUrl] = useState("");
  const [auth, setAuth] = useState(false);
  const userInfo=JSON.parse(localStorage.getItem('userInfo'));
  const userId=userInfo._id;

  const Authentication = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/verification", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.data.success !== "failed") {
        toast.success(response.data.message);
        setAuth(true);
      } else {
        toast.error(response.data.message);
        setAuth(false);
      }
    } catch (error) {
      setAuth(false);
    }
  };
  const handleUrl = async () => {
    if (!auth) {
      toast.error("Please Login");
      navigate('/');
    }
    if (url.length !== 0) {
      const response = await axios.post("http://localhost:4000/short/shortlink", {
        url,
        userId,
      })
      setShortUrl(response.data.shortUrl);
    } else {
      toast.error("Please Enter a URL");
    }
  }
  useEffect(() => {
    if(!auth) Authentication(); 
  }, []);
  return store.ActiveUser===null?<h1>User Data not Found</h1>:(
    <div className="bg-slate-600 h-screen">
      <div className="flex justify-center mr-2">
        <div>
          <h1 className="p-2 font-bold text-white bg-purple-700 m-5 rounded-lg">Login User {userInfo.name}</h1>
        </div>
        <div>
          <button className="p-2 font-bold text-white bg-orange-700 m-5 rounded-lg" ><Link to='/analytics'>Analytics of User</Link></button>
        </div>
        <button className="p-2 font-bold text-white bg-red-700 m-5 rounded-lg" onClick={(e) => {
          dispatch(removeUser());
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          navigate('/');
        }}>LogOut</button>

      </div>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold m-4 text-yellow-300 border rounded-lg p-4 bg-black">URL Shortener</h1>
          <input
            type="text"
            placeholder="Enter URL"
            className="p-2 border border-gray-400 rounded-lg mb-4 w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white text-lg font-bold rounded-lg w-full"
            onClick={handleUrl}
          >
            Shorten
          </button>
          <p className="mt-4 text-green-500 border rounded-lg">
            <Link to={shrtUrl} className="m-4 text-xl">{shrtUrl}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home