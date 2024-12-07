import React, { useState } from 'react'
import axios from "axios"

export default function JoinNest({ onJoinNest }) {

    const [inviteCode, setInviteCode] = useState("");
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")


    const handleJoinNest = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error("Authentication token is missing");
            }

            const response = await axios.post(
                `/api/nests/join`,
                { inviteCode },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Show success message
            setSuccess(response.data.message || "Successfully joined the nest!");
            setError("");
            setInviteCode(""); // Clear the input
        } catch (err) {
            // Show error message
            setError(err.response?.data?.message || "Failed to join nest");
            setSuccess("");
        }
    };


    return (
        <>
            <div className='bg-white rounded-xl shadow-xl p-5'>
                <p className='font-semibold mb-4'>Ready To Join A Nest?</p>
                <form class="max-w-sm mx-auto" onSubmit={handleJoinNest}>
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter The Invitation Code</label>
                        <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Code" value={inviteCode} name='name' onChange={(e) => { setInviteCode(e.target.value) }} required />
                    </div>


                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join Nest</button>

                </form>
                {success && (
                    <p className="mt-4 text-green-500 font-medium">{success}</p>
                )}
                {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
            </div>
        </>


    )
}
