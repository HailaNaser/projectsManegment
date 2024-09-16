import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import img from '../assets/manger.png'


 function Login() {
    const [dataApi , setDataApi] = useState([]);
    const navegate = useNavigate()

    const login = ()=> {
        axios.get('https://6657370d9f970b3b36c86882.mockapi.io/API')
        .then((res)=> {
            // console.log(res)
           const result = res.data.find((e)=> {
            
            if(e.Email == dataApi.email  && e.Email.includes('twaiq')){
              localStorage.setItem("userId" , e.id)
                  navegate('/')
                  console.log(dataApi.email)
            }
            else if (e.Email == dataApi.email  && e.Email.includes('admin')){
              localStorage.setItem('mail' , true)
              // localStorage.clear()
              if(localStorage.getItem('mail') !== null){
                navegate('/admin')
              }
            
        
            }
         })
        })
    }

  return (
    // <div>
        // <div className='bg-[#f0e9e4]'>
        <div className="hero min-h-screen  bg-[#f0e9e4]">
    <div className="hero-content flex-col lg:flex-row-reverse">
          <img className='w-full h-full bg-[#f0e9e4]' src={img} alt="" />
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            {/* input */}
            <input type="email" placeholder="email" className="input input-bordered" required 
            onChange={(e)=> setDataApi({...dataApi , email: e.target.value})}/>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text" >Password</span>
            </label>
            
            {/* input */}
            <input type="password" placeholder="password" 
             className="input input-bordered" required
             onChange={(e)=> setDataApi({...dataApi , 'password': e.target.value})} />
            <Link to='/SignUp'>
              <p className="text-[#575050] text-[14px] py-2">Don't have acount ? SignUp</p>
              </Link>
          </div>
          {/* <div className="form-control mt-6"> */}
            {/* <Link to='/'> */}
            <button className="btn bg-gradient-to-r from-[#83c5be] to-[#4bb7d0]" onClick={login} >Login</button>
            {/* </Link> */}
          </div>
        {/* </div> */}
      </div>
    </div>
  {/* </div> */}
   </div>
    // </div>
  )
}


export default Login