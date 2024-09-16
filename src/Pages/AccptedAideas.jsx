import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/pm.png'

function AcceptedIdeas() {
    const [data, setData] = useState([]);

    useEffect(() => {
        get();
    }, []);

    const get = () => {
        axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API`)
            .then((res) => {
                // استخراج الأفكار المقبولة فقط
                const acceptedIdeas = res.data.map((item) => {
                    // تصفية الأفكار المقبولة
                    return item.array.filter((idea) => typeof idea === 'object' && idea.state === 'Accepted')
                        .map((idea) => ({
                            name: item.Name,
                            idea: idea.idea,
                            state: idea.state
                        }));
                }).flat(); // استخدام flat هنا لدمج المصفوفات الناتجة في مصفوفة واحدة
                
                setData(acceptedIdeas);
            })
            .catch((err) => console.log(err));
    };
    

    return (
        <div className='bg-[#fbfbfb]'>
                    {/* start */}
        <div >
            <div className='flex justify-end bg-[#fbfbfb]'>
            <img className=' text-right mt-[10vh] m-[right]' src="https://i.pinimg.com/236x/9f/8b/b1/9f8bb1df5fa8478a6bb51f4e75d43256.jpg" alt="" />
            </div>

        <div class="fixed top-0 left-0 w-full z-50 bg-[#eee]  backdrop-blur-lg bg-opacity-80">
        <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div class="relative flex h-16 justify-between">
            <div class="flex flex-1 items-stretch justify-start">
                <Link class="flex flex-shrink-0 items-center" to="/">
                    <img class="block h-16 w-auto" src={img} />
                </Link>
            </div>
            <div class="flex-shrink-0 flex px-2 py-3 items-center space-x-8">

                <Link  className="text-gray-700 hover:text-indigo-700 text-sm font-medium" to="/Login"></Link>
                <Link className="text-gray-800 bg-gradient-to-r from-[#83c5be] to-[#4bb7d0] hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2  border-transparent text-sm font-medium rounded-md shadow-sm "
                    to="/Student">My ideas
                </Link>

                <Link to='/Login' onClick={()=> localStorage.removeItem('userId')}><i class="fa-solid fa-right-from-bracket"></i></Link>
            </div>
        </div>
    </div>
</div>
    </div>
        {/* end */}
            {/* <aside  id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <Link to='/Student'>
               <span class="ms-3">My Ideas</span>
               </Link>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
               <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </a>
         </li>
         
  
      </ul>
      <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
 
      </ul>
   </div>
</aside> */}
            <table className=" w-full divide-y divide-gray-200 overflow-x-auto mt-[10vh]">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Idea
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((el, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{el.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{el.idea}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e0eae9] text-green-800">
                                        {el.state}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center">
                                No accepted ideas found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AcceptedIdeas;
