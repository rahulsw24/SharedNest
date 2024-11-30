import React, { useEffect, useState } from 'react'
import CreateNest from '../CreateNest'
import axios from "axios"

export default function DashboardStart() {
    const [showNestForm, setShowNestForm] = useState(false)
    const [nest, getNest] = useState([])
    useEffect(() => {
        const fetchNests = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                console.log(token);
                if (!token) {
                    throw new Error("Authentication token not found");
                }

                console.log("Fetching Nests");
                const response = await axios.get("./api/nests/my-nests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("Response Data", response.data)
                getNest(response.data);




            }
            catch (err) {
                console.error("Error Fetching nests:", err)
                setError(err.response?.data?.message || "Failed to fetch nests")

            }

        }
        fetchNests();
    }, [])
    return (
        <div class="p-4 sm:ml-64">

            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    {console.log(showNestForm)}
                    {!showNestForm && (<button onClick={() => setShowNestForm(true)}>
                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800
                    hover:bg-zinc-800">
                            <p class="text-2xl text-gray-400 hover:text-white dark:text-gray-500">
                                Create A Nest
                            </p>
                        </div>
                    </button>)}
                    {console.log(showNestForm)}

                    {showNestForm && (<CreateNest
                        onCreateNest={showNestForm} />)}


                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800
                    hover:bg-zinc-800">
                        <p class="text-2xl text-gray-400 hover:text-white dark:text-gray-500">
                            Join A Nest
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4 mb-4'>
                    {nest.length > 0 && nest.map((nest) => (
                        <div
                            key={nest._id}
                            className="bg-white shadow-md rounded-md p-4 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold">{nest.name}</h2>
                            <p>Total Expenses: {nest.totalExpenses}</p>
                        </div>
                    ))}
                    {
                        nest.length == 0 && (
                            <h1>No Nest Found</h1>
                        )
                    }


                </div>
                {/* <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">
                        Existing Nests
                    </p>
                </div> */}
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">
                        <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div >

    )
}