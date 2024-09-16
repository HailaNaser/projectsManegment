import axios from 'axios';
import { useState, useEffect } from 'react';
import img from '../assets/pm.png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Students() {
  const [ideas, setIdeas] = useState([]);
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const id = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
      .then((res) => {
        setName(res.data.Name);
        setIdeas(res.data.array || []);
      });
  }, [id]);

  const handleClick = () => {
    if (message.trim() === '') return;

    const updatedArray = [...ideas, { idea: message, state: 'Pending' }];
    
    axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
      array: updatedArray,
    });

    setIdeas(updatedArray);
    setMessage('');
  };

  const notify = () => {
    toast.success("please sign to continue");
};

  return (
    <div className='m-[auto] bg-[#f6f6f6] mt-[-20px]'>
      {/* Start Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#eee] backdrop-blur-lg bg-opacity-80">
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="flex flex-1 items-stretch justify-start">
              <Link className="flex flex-shrink-0 items-center" to="/">
                <img className="block h-16 w-auto" src={img} alt="Logo" />
              </Link>
            </div>
            <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
              <Link className="text-gray-700 hover:text-indigo-700 text-sm font-medium" to="/Login"></Link>
              <Link className="text-gray-800 bg-gradient-to-r from-[#83c5be] to-[#4bb7d0] hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border-transparent text-sm font-medium rounded-md shadow-sm"
                    to="/AcceptedAideas">Approved ideas</Link>
                                  <Link to='/Login' onClick={()=> localStorage.removeItem('userId')}><i class="fa-solid fa-right-from-bracket"></i></Link>  
            </div>
          </div>
        </div>
      </div>
      {/* End Navbar */}
      
      {/* Start Message Input */}
      <div className="flex items-center px-3 py-6 rounded-lg   dark:bg-gray-700 pt-40">
   

        <textarea
          id="chat"
          rows="1"
          
          onChange={localStorage.getItem('userId') !== null ? (e) => setMessage(e.target.value) : 
            ({notify})
          }
          value={message}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          className={`block mx-4 p-2.5 w-50 text-sm text-gray-900 outline-[#4bb7d0] bg-white rounded-lg border border-gray-300 transition-all duration-300 ease-in-out ${isExpanded ? 'w-1/4' : 'w-50'}`}
          placeholder="Your Idea..."
        />



        <button
          onClick={handleClick}
          type="submit"
          className="inline-flex justify-center p-2  text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
         <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20">
          <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#83c5be', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#4bb7d0', stopOpacity: 1 }} />
              </linearGradient>
          </defs>
          <path fill="url(#grad1)" d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send Idea</span>
        </button>
      </div>
      {/* End Message Input */}

      {/* Display Name Above Table */}
      <div className="mt-[-5vh] px-7 flex items-center bg-[#f6f6f6]">
        <h2 className="text-2xl font-bold text-[#636f99] dark:text-white">Wellcome: {name || 'please Sign to continue'}</h2>
        <img className='block w-[20%] h-[20%] mt-[20px]' src="https://i.pinimg.com/564x/5c/04/29/5c0429fa6aa30cd5490f214f314521c8.jpg" alt="" />
      </div>


      {/* Start Ideas Table */}
      <div className="relative overflow-x-auto mb-[10vh] mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Idea</th>
              <th scope="col" className="px-6 py-3">State</th>
            </tr>
          </thead>
          <tbody>
            {ideas.length > 0 ? (
              ideas.map((ideaItem, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4">
                    {ideaItem.idea}
                  </td>
                  <td className="px-6 py-4">
                    {ideaItem.state}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center">No ideas available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* End Ideas Table */}
    </div>
  );
}

export default Students;



// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import img from '../assets/pm.png'
// import { Link } from 'react-router-dom';

// function Students() {
//   const [ideas, setIdeas] = useState([]);
//   const [message, setMessage] = useState('');
//   const [name , setName] = useState([]);
//   const id = localStorage.getItem('userId');

//   useEffect(() => {
//     axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
//       .then((res) => {
//         console.log(res.data.array);
//         console.log(res.data.Name);
//         setName(res.data)
//         setIdeas(res.data.array || []);
//       });
//   }, [id]);

//   const handleClick = () => {
//     if (message.trim() === '') return;

//     setIdeas((prevIdeas) => {
//       const updatedArray = [...prevIdeas, { idea: message, state: 'Pending' }];
//       axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
//         array: updatedArray
//       });
//       return updatedArray;
//     });

//     setMessage('');
//   };

//   return (
//     <div className='m-[auto]'>
//         {/* start */}
//         <div>
//         <div class="fixed top-0 left-0 w-full z-50 bg-[#eee]  backdrop-blur-lg bg-opacity-80">
//     <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
//         <div class="relative flex h-16 justify-between">
//             <div class="flex flex-1 items-stretch justify-start">
//                 <Link class="flex flex-shrink-0 items-center" to="/">
//                     <img class="block h-16 w-auto" src={img} />
//                 </Link>
//             </div>
//             <div class="flex-shrink-0 flex px-2 py-3 items-center space-x-8">

//                 <Link  class="text-gray-700 hover:text-indigo-700 text-sm font-medium" to="/Login"></Link>
//                 <Link class="text-gray-800 bg-gradient-to-r from-[#83c5be] to-[#4bb7d0] hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2  border-transparent text-sm font-medium rounded-md shadow-sm "
//                     to="/AcceptedAideas">Approved ideas
//                 </Link>
//             </div>
//         </div>
//     </div>
// </div>
//     </div>
//         {/* end */}
//       <label htmlFor="chat" className="sr-only">Your message</label>
//       <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
//         <textarea
//           id="chat"
//           rows="1"
//           onChange={(e) => setMessage(e.target.value)}
//           value={message}
//           className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="Your message..."
//         />
//         <button
//           onClick={handleClick}
//           type="submit"
//           className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
//         >
//           <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
//             <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
//           </svg>
//           <span className="sr-only">Send message</span>
//         </button>
//       </div>

//       <div className="relative overflow-x-auto mb-[10vh]">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">Name</th>
//               <th scope="col" className="px-6 py-3">Idea</th>
//               <th scope="col" className="px-6 py-3">State</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ideas.length > 0 ? (
//               ideas.map((ideaItem, index) => (
//                 <tr key={index} className="bg-white dark:bg-gray-800">
//                     {/* {name.map((e)=> { */}
//                         <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                         {name.Name}
//                         </th>
//                     {/* })} */}
               
//                   <td className="px-6 py-4">
//                     {ideaItem.idea}
//                   </td>
//                   <td className="px-6 py-4">
//                     {ideaItem.state}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="px-6 py-4 text-center">No ideas available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Students;



// // import axios from 'axios';
// // // import React, { useState } from 'react';
// // import { useState , useEffect } from 'react';

// //  function Students() {
// //     const [idea , setIdea] = useState([]);
// //     const [message , setMessage] = useState('')
// //     const id = localStorage.getItem('userId')

// //     useEffect(()=> {
// //         axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
// //         .then((res)=> {
// //             console.log(res.data.array)

// //             setIdea(res.data.array || [])
// //         })
// //     },[])
 

// //     const handleClick=()=> {
// //         if (message.trim() === "") return;
// //         setIdea((idea)=> {
// //             const updateArray = [...idea , message]
// //             axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`,{
// //                 array: updateArray
// //             })
// //             return updateArray
// //             })
// //             setMessage("")
// //     }

// //   return (
// //     <div>

// // <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
// //    <span class="sr-only">Open sidebar</span>
// //    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
// //    </svg>
// // </button>

// // {/* <aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
// //    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
// //       <ul class="space-y-2 font-medium">
// //          <li>
// //             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
// //                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
// //                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
// //                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
// //                </svg>
// //                <span class="ms-3">My Ideas</span>
// //             </a>
// //          </li>
// //          <li>
// //             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
// //                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
// //                   <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
// //                </svg>
// //                <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
// //                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
// //             </a>
// //          </li>

// //       </ul>
// //       <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
 
// //       </ul>
// //    </div>
// // </aside> */}


// // {/* end sidebar */}
// // <div className='w-[50%] m-[auto]'>
// //     <label for="chat" class="sr-only">Your message</label>
// //     <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
// //         <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
// //             <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
// //                 <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
// //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
// //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
// //             </svg>
// //             <span class="sr-only">Upload image</span>
// //         </button>
// //         <button type="button" 
// //        class="p-2
// //          text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
// //             <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
// //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
// //             </svg>
// //             <span class="sr-only">Add emoji</span>
// //         </button>
// //         <textarea id="chat" rows="1"
// //         onChange={(e)=> setMessage(e.target.value)}
// //         value={message}
// //         class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
// //             <button  onClick={handleClick} type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
// //             <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
// //                 <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
// //             </svg>
// //             <span class="sr-only"  >Send message</span>
// //         </button>
// //     </div>
// // </div>
// // {/* end textarea */}
// // {/* <table class="min-w-full divide-y divide-gray-200">
// //     <thead>
// //         <tr>
// //             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idea</th>
// //             {/* <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th> */}
// //             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //             {/* <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th> */}
// //         </tr>
// //     </thead>
// //     <tbody class="bg-white divide-y divide-gray-200">
// //         <tr>
     
// //             {idea.length > 0 ? (
// //                 idea.map((e)=> {
// //                     console.log(idea)
// //                     // console.log(e)
// //                     return <div>
// //                         <td class="px-6 py-4 whitespace-nowrap">{idea || e.idea}</td>
                    
// //             <td class="px-6 py-4 whitespace-nowrap">
// //                 <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{e.state}</span>
// //             </td>
                             
// //                              </div>
// //                 })
// //             ): (
// //                 ''
// //             )
             
// //             }
// //         </tr>
// //     </tbody>
// // </table> */}

// // {/* start */}

  
// // {idea.length > 0 ? (
// //                 idea.map((e)=> {
// //                     console.log(idea)
// //                     // console.log(e)
// //                     return <div>
// // <div class="relative overflow-x-auto">
// //     <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
// //         <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
// //             <tr>
// //                 <th scope="col" class="px-6 py-3 rounded-s-lg">
// //                    name
// //                 </th>
// //                 <th scope="col" class="px-6 py-3">
// //                    idea
// //                 </th>
// //                 <th scope="col" class="px-6 py-3 rounded-e-lg">
// //                    state
// //                 </th>
// //             </tr>
// //         </thead>
        
// //         <tbody>
            
// //             <tr class="bg-white dark:bg-gray-800">
// //                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
// //                     Apple MacBook Pro 17"
// //                 </th>
// //                 <td class="px-6 py-4">
// //                     1
// //                 </td>
// //                 <td class="px-6 py-4">
// //                     $2999
// //                 </td>
// //             </tr>
   
// //         </tbody>
// //     </table>
// // </div>

// // {/* end */}
// // </div>
// //   )
// // }

// // export default Students




