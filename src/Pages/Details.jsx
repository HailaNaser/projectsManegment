import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
    const [user, setUser] = useState(null);
    const [ideas, setIdeas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // التحكم في إظهار النافذة
    const [currentIdeaIndex, setCurrentIdeaIndex] = useState(null); // تحديد الفكرة المختارة
    const [modifiedIdea, setModifiedIdea] = useState(''); // الفكرة المعدلة
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
        axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
            .then((res) => {
                setUser(res.data);
                setIdeas(res.data.array || []);
            })
            .catch((error) => console.error('Error fetching user data:', error));
    }, [id]);

    const handleStateChange = (index, newState) => {
        if (newState === 'Modified') {
            // فتح النافذة للتعديل إذا تم اختيار "Modify"
            setCurrentIdeaIndex(index);
            setModifiedIdea(ideas[index].idea || ideas[index]);
            setIsModalOpen(true);
        } else {
            // تحديث حالة الفكرة في الحالات الأخرى
            let updatedIdeas = [...ideas];
            
            if (typeof updatedIdeas[index] === 'object' && updatedIdeas[index] !== null) {
                updatedIdeas[index] = { ...updatedIdeas[index], state: newState };
            } else {
                updatedIdeas[index] = { idea: updatedIdeas[index], state: newState };
            }

            setIdeas(updatedIdeas);

            axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
                array: updatedIdeas
            })
            .then(() => console.log('State updated successfully'))
            .catch((error) => console.error('Error updating state:', error));
        }
    };

    const handleSaveModification = () => {
        let updatedIdeas = [...ideas];
        if (currentIdeaIndex !== null) {
            updatedIdeas[currentIdeaIndex] = { ...updatedIdeas[currentIdeaIndex], idea: modifiedIdea, state: 'Modified' };
        }
        setIdeas(updatedIdeas);
        setIsModalOpen(false);

        axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
            array: updatedIdeas
        })
        .then(() => console.log('Modification saved successfully'))
        .catch((error) => console.error('Error saving modification:', error));
    };

    const deleteAcount =(id)=> {
        axios.delete(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
        .then((res)=> {
            localStorage.removeItem('userId')
            res.data.filter((el)=> el !== el.id)
          
            console.log(res.data)})
    }

    return (
        <div className='bg-[#eee] h-[100vh]'>
            {user ? (
                <div className="text-gray-900 bg-[#eee] h-[100vh]">
                    <div className="p-4 flex mb-[20px]">
                        <h1 className="text-3xl text-[#777]">Student Details</h1>
                    </div>
                    {/* button */}
                    
                    <div className="flex justify-end">
                        <button
                        onClick={()=> deleteAcount(id)}
                            type="button"
                            className="inline-flex items-center mb-[2px] px-5 py-2.5 mr-[40px] text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Delete Acount
                            <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-red-800 bg-gray-200 rounded-full">
                            {/* 2 */}!
                            </span>
                        </button>
                        </div>

                        {/* end button */}

                    <div className="px-3 py-4 flex justify-center">
                        <table className="w-full text-md bg-white shadow-md rounded mb-4">
                            <tbody>
                                <tr className="border-b">
                                    <th className="text-center p-3 px-5">Name</th>
                                    <th className="text-center p-3 px-5">Ideas</th>
                                    <th className="text-left p-3 px-5">Change State</th>
                                    <th className="text-left p-3 px-5">State</th>
                                </tr>
                                {ideas.map((idea, index) => (
                                    <tr key={index} className="border-b hover:bg-[#e3f3f7fe] bg-gray-100">
                                        <td className="p-3 px-5">
                                            <p className="bg-transparent border-b-2 border-gray-300 py-2 text-center">
                                                {user.Name}
                                            </p>
                                        </td>
                                        <td className="p-3 px-5">
                                            <p className="bg-transparent border-b-2 border-gray-300 text-center py-2">
                                                {typeof idea === 'object' && idea !== null ? idea.idea : idea}
                                            </p>
                                        </td>
                                        <td className="p-3 px-5">
                                            <select
                                                value={idea.state || 'Pending'}
                                                onChange={(e) => handleStateChange(index, e.target.value)}
                                                className="bg-transparent border-b-2 border-gray-300 py-2"
                                            >
                                                <option value="Pending" disabled>Select State</option>
                                                <option value="Accepted">Accept</option>
                                                <option value="Rejected">Reject</option>
                                                <option value="Modified">Modify</option>
                                            </select>
                                        </td>
                                        <td className="p-3 px-5">
                                            {idea.state || 'Pending'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for modifying ideas */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold">Modify Idea</h3>
                                <textarea
                                    value={modifiedIdea}
                                    onChange={(e) => setModifiedIdea(e.target.value)}
                                    className="w-full p-2 mt-4 border border-gray-300 rounded"
                                    rows="4"
                                ></textarea>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button 
                                        onClick={handleSaveModification} 
                                        className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setIsModalOpen(false)} 
                                        className="bg-gray-500 text-white px-4 py-2 rounded">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : ("No data found")}
        </div>
    );
}

export default Details;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function Details() {
//     const [user, setUser] = useState(null);
//     const [ideas, setIdeas] = useState([]);
//     const { id } = useParams();

//     useEffect(() => {
//         axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
//             .then((res) => {
//                 setUser(res.data);
//                 setIdeas(res.data.array || []); // إذا لم تكن المصفوفة موجودة، استخدم مصفوفة فارغة
//             })
//             .catch((error) => console.error('Error fetching user data:', error));
//     }, [id]);

//     const handleStateChange = (index, newState) => {
//         // تحديث حالة الفكرة
//         let updatedIdeas = [...ideas];
        
//         // تأكد من أن الفكرة هي كائن وأنه يحتوي على الحالة
//         if (typeof updatedIdeas[index] === 'object' && updatedIdeas[index] !== null) {
//             updatedIdeas[index] = { ...updatedIdeas[index], state: newState }; // تحديث حالة الفكرة
//         } else {
//             updatedIdeas[index] = { idea: updatedIdeas[index], state: newState }; // إذا كانت الفكرة نصًا، قم بإنشاء كائن جديد
//         }

//         setIdeas(updatedIdeas);

//         // إرسال البيانات المحدثة إلى قاعدة البيانات
//         axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
//             array: updatedIdeas
//         })
//         .then(() => console.log('State updated successfully'))
//         .catch((error) => console.error('Error updating state:', error));
//     };

//     return (
//         <div>
//             {user ? (
//                 <div className="text-gray-900 bg-gray-200">
//                     <div className="p-4 flex">
//                         <h1 className="text-3xl">User Details</h1>
//                     </div>
//                     <div className="px-3 py-4 flex justify-center">
//                         <table className="w-full text-md bg-white shadow-md rounded mb-4">
//                             <tbody>
//                                 <tr className="border-b">
//                                     <th className="text-left p-3 px-5">Name</th>
//                                     <th className="text-left p-3 px-5">Ideas</th>
//                                     <th className="text-left p-3 px-5">Change State</th>
//                                     <th className="text-left p-3 px-5">State</th>
//                                 </tr>
//                                 {ideas.map((idea, index) => (
//                                     <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
//                                         <td className="p-3 px-5">
//                                             <p className="bg-transparent border-b-2 border-gray-300 py-2 text-center">
//                                                 {user.Name}
//                                             </p>
//                                         </td>
//                                         <td className="p-3 px-5">
//                                             <p className="bg-transparent border-b-2 border-gray-300 py-2">
//                                                 {typeof idea === 'object' && idea !== null ? idea.idea : idea}
//                                             </p>
//                                         </td>
//                                         <td className="p-3 px-5">
//                                             <select
//                                                 value={idea.state || 'Pending'} // عرض "Pending" إذا لم تكن هناك حالة
//                                                 onChange={(e) => handleStateChange(index, e.target.value)}
//                                                 className="bg-transparent border-b-2 border-gray-300 py-2"
//                                             >
//                                                 <option value="Pending" disabled>Select State</option>
//                                                 <option value="Accepted">Accept</option>
//                                                 <option value="Rejected">Reject</option>
//                                                 <option value="Modified">Modify</option>
//                                             </select>
//                                         </td>
//                                         <td className="p-3 px-5">
//                                             {idea.state || 'Pending'}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             ) : ("Loading...")}
//         </div>
//     );
// }

// export default Details;
