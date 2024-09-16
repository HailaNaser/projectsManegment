import React from 'react'
import Nav from '../Components/Nav'
import { Link, useNavigate } from 'react-router-dom';
import Students from './Students';
import Footer from '../Components/Footer';
// import './App.css'

export default function Home() {
  const navigator = useNavigate()
  return (
    <>
      <Nav/>
        <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div class="absolute inset-0">
            <img src='https://www.biztek-solutions.com/wp-content/uploads/2016/02/IT-Services.png' alt="Background Image" class="object-cover object-center w-full h-full" />
            <div class="absolute inset-0 bg-black opacity-65"></div>
        </div>
        
        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 class="text-5xl font-bold leading-tight mb-4">Welcome to ProjecTrack</h1>
            <p class="text-[16px] text-gray-400 mb-8 px-8">
            ProjecTrack is an innovative platform specifically designed for managing student projects efficiently and professionally. The site provides integrated tools for organizing tasks and facilitating collaboration between students and supervisors.</p>

            <button onClick={()=> localStorage.getItem('userId') ? navigator('/Student') : ''} class="bg-gradient-to-r from-[#FFB526] to-[#ED5004] text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</button>
        </div>
        </div>
        <div className="services">
        <h2 className='special-heading'>Services</h2>
        <p>Facilitate communication</p>
        <div className="content-services">
            <div className="box">
                <img src="https://us.123rf.com/450wm/khamduang/khamduang2401/khamduang240100291/222847755-happy-labour-day-worker-man-wearing-hard-hat-ontinuous-one-line-draw-design-black-outline-drawing.jpg?ver=6" alt="" />
                <h3>Collaboration</h3>
                <p>Facilitate communication between team members across a single platform, including conversations and discussions</p>
            </div>
            <div className="box">
                <img src="https://img.lovepik.com/free-png/20220125/lovepik-busy-businessman-stick-figure-png-image_401718611_wh1200.png" alt="" />
                <h3>Decision support</h3>
                <p> Providing the information necessary to make effective and strategic decisions at various stages of the project.</p>
            </div>
            <div className="box">
                <img src="https://us.123rf.com/450wm/khamduang/khamduang2401/khamduang240100291/222847755-happy-labour-day-worker-man-wearing-hard-hat-ontinuous-one-line-draw-design-black-outline-drawing.jpg?ver=6" alt="" />
                <h3>Progress monitoring</h3>
                <p> Providing mechanisms to track project progress and monitor performance and achievements.</p>
            </div>
        </div>
    </div>
    <Footer/>

</>
  )
}

