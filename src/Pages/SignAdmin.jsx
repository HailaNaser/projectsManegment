import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



 function  SignAdmin(){
    const [data , setData] = useState({});
    const [error , setError] = useState({})
    const navegate = useNavigate()

    const check =()=> {
        if(data.Name == undefined || data.Email == undefined || data.Pass == undefined){
          setError({'all': 'the felids cant be empty'})
        }
        else if (data.Name.length < 5){
          setError({name: 'the name must be > 5'})
        }            
        else if (!data.Email.includes('@twaiq') && !data.Email.includes('@admin')){
          setError({email: 'the email not found'})
        }            
        else if (data.Pass.length < 8){
          setError({Pass: 'the name must be > 8'})
        }            
        
        else {
          axios.post('https://6657370d9f970b3b36c86882.mockapi.io/API', {
            Name: data.Name,
            Email: data.Email,
            Pass: data.Pass
        }).then((res)=> navegate('/Login'))
        setError({})
    }
        
  }
    
 
    // }

  return (
    // <div>
    // <div className="hero bg-[#f0e9e4] min-h-screen">
    <div className="hero-content flex-col  mt-[40px] lg:flex-row-reverse">
    {/* <img className='w-full h-full' src={img} alt="" /> */}
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
         
          {/* input */}
          <input type="text" placeholder="Name" className="input input-bordered" required
             onChange={(e)=> {setData({...data , Name : e.target.value})}} 
       />
        </div>
        <span className='text-red-800'>{error.name}</span>
        {/* end */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          {/* input */}
          <input type="email" placeholder="example@admin.com"
           className="input input-bordered" required 
           onChange={(e)=> {setData({...data , Email: e.target.value})}}/>
        </div>
        {/*end */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <span className='text-red-800'>{error.Pass}</span>
          {/* input */}
          <input type="password" placeholder="password"  className="input input-bordered" required
             onChange={(e)=> {setData({...data , Pass: e.target.value})}} />
              <Link to='/Login'>
              <p className="text-[#575050] text-[14px] py-2">Already ou have acount? Login</p>
              </Link>
            <span className='text-red-800'>{error.all}</span>
        </div>
          <button className="btn bg-gradient-to-r from-[#83c5be] to-[#4bb7d0]" onClick={check} >Login</button>
        {/* </div> */}
      </div>
    </div>
  </div>
// </div>
    // </div>
  )
}


export default SignAdmin