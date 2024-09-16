import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/pm.png'

 function Nav() {
  return (
    <div>
        <div class="fixed top-0 left-0 w-full z-50 bg-[transparent]  backdrop-blur-lg bg-opacity-80">
    <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div class="relative flex h-16 justify-between">
            <div class="flex flex-1 items-stretch justify-start">
                <a class="flex flex-shrink-0 items-center" href="#">
                    <img class="block h-16 w-auto" src={img} />
                </a>
            </div>
            <div class="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
                <Link to='/SignAdmin' className='text-[#fff] hover:text-indigo-700 text-sm font-medium'>Dashborad</Link>
                <Link  class="text-[#fff] hover:text-indigo-700 text-sm font-medium" to="/Login">Login</Link>
                <Link class="text-gray-800 bg-gradient-to-r from-[#83c5be] to-[#4bb7d0] hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2  border-transparent text-sm font-medium rounded-md shadow-sm "
                    to="/SignUp">Sign up
                </Link>

            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Nav