import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

 function Admin() {
    // const id = 
    const email = localStorage.getItem('mail') !== null;
    const [ideas , setIdeas] = useState([]);
    const [search , setSearch] = useState('');
    const [filterd , setFilterd] = useState([])

    useEffect(()=> {
        axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API`)
        .then((res)=> {
                const result = res.data.filter((item)=> item.array && item.array.length > 0)
                // console.log(`result${result}`)
                setIdeas(result)
                setFilterd(result)
              
        }
       
        )
        
          
    },[])

    const filterNames =()=> {
        const filter = ideas.filter((el)=> {
           return el.Name.toLowerCase().includes(search.toLowerCase())
        })
        setFilterd(filter)
    }
  return (
    <div className='bg-[#eee] h-[100vh]'>  
        
        {/* table */}

<div class="text-gray-900 bg-[#eee] h-[100vh]">
    
    <div class="p-4 ">
        <h1 class="text-3xl"></h1>
                {/* start  search */}
        
<div class="flex items-center max-w-sm mx-auto">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" id="simple-search" onChange={(e)=> setSearch(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 outline-[#4bb7d0] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search student name..." required />
    </div>
    <button type="submit"
    onClick={filterNames} 
    class="p-2.5 ms-2 text-sm font-medium text-white bg-gradient-to-r from-[#83c5be] to-[#4bb7d0] outline-[#ddd] rounded-lg border border-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</div>

        {/* end search  */}
    </div>
    <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                {/* <tr class="border-b">
                </tr> */}
                <tr class="border-b">
                    <th class="p-3 px-5 text-center">Name</th>
                    <th class="text-center p-3 px-5">Number of ideas</th>
                    {/* <th>Number of ideas</th> */}
                </tr>
                {filterd.length > 0 ? 
                        ( filterd.map((e)=> {
                            return <>
                <tr class="border-b hover:bg-[#e3f3f7fe] bg-gray-100">
                    <td class="p-3 px-5">
                        <p type="text" value="user.name" class="bg-transparent border-b-2 border-gray-200 py-2 text-center">{e.Name}</p>
                              {/* <th class="text-left p-3 px-5">Name</th> */}
                     
                    
                    </td>
                    <td class="p-3 px-5 text-center">
                    {/* {e.array.state === 'Pending' ? `${e.array.length} waiting` : 'There are no ideas to wait'} */}
                    {
                        e.array.some(item => item.state === 'Pending') 
                        ? `${e.array.length} waiting` 
                        : 'There are no pending ideas'
                    }
                    </td>
                    <td class="p-3 px-5">
                        {/* <input type="text" value="user.email" class="bg-transparent border-b-2 border-gray-300 py-2"/> */}
                    </td>
                    <td class="p-3 px-5 flex justify-end">
                        <Link to={`/Details/${e.id}`}>
                        <button type="button"
                            class="mr-3 text-sm bg-gradient-to-r from-[#83c5be] to-[#4bb7d0] hover:bg-[#4bb7d0] text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Details</button></Link>
                            {/* <button
                            type="button"
                            class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button> */}
                    </td>
                </tr>
                <th class="text-left p-3 px-5"></th></>
                        })): ("...Loading")
                        }
          
              
            </tbody>
        </table>

    </div>
</div>

        {/* end table */}
    </div>
  )
}


export default Admin


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function Admin() {
//     const email = localStorage.getItem('mail') !== null;
//     const [ideas, setIdeas] = useState([]);

//     useEffect(() => {
//         axios.get('https://6657370d9f970b3b36c86882.mockapi.io/API')
//             .then((res) => {
//                 // فلترة البيانات لإظهار الأسماء والرسائل من الحقل array
//                 const filteredData = res.data.map((item) => ({
//                     name: item.Name,
//                     messages: item.array && item.array.length > 0 ? item.array.join(", ") : "No messages",
//                 }));
//                 setIdeas(filteredData);
//             })
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <div>
//             {/* table */}
//             <div className="text-gray-900 bg-gray-200">
//                 <div className="p-4 flex">
//                     <h1 className="text-3xl">Users</h1>
//                 </div>
//                 <div className="px-3 py-4 flex justify-center">
//                     <table className="w-full text-md bg-white shadow-md rounded mb-4">
//                         <tbody>
//                             <tr className="border-b">
//                                 <th className="text-left p-3 px-5">Name</th>
//                                 <th className="text-left p-3 px-5">Messages</th>
//                             </tr>
//                             {ideas.map((e, index) => (
//                                 <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
//                                     <td className="p-3 px-5">
//                                         <input type="text" value={e.name} className="bg-transparent border-b-2 border-gray-300 py-2" readOnly />
//                                     </td>
//                                     <td className="p-3 px-5">
//                                         <input type="text" value={e.messages} className="bg-transparent border-b-2 border-gray-300 py-2" readOnly />
//                                     </td>
//                                     <td className="p-3 px-5 flex justify-end">
//                                         <Link to='/Details'>
//                                             <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Details</button>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {/* end table */}
//         </div>
//     );
// }

// export default Admin;
