import React, { useState } from 'react'
import axios from "axios"

export default function CreateNest({ onCreateNest }) {

    const [formData, setFormData] = useState({
        name: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(value)
        setFormData({ name: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission

        const token = localStorage.getItem('accessToken');  // Get JWT token from local storage

        try {
            const response = await axios.post('/api/nests/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include token in headers for authentication
                },
            });

            onCreateNest(false);

            // Success handling
            console.log(response.data);  // Log the successful response

            setSuccessMessage("Nest created successfully!");  // Set a success message to display
            setErrorMessage("");  // Clear any previous error messages
        } catch (error) {
            // Error handling
            if (error.response) {
                // If the server responds with an error
                console.error("Error creating nest:", error.response.data);
                setErrorMessage(error.response.data.message || "An error occurred while creating the nest.");
            } else if (error.request) {
                // If no response is received from the server
                console.error("No response from the server:", error.request);
                setErrorMessage("No response from the server. Please check your internet connection.");
            } else {
                // General error handling
                console.error("Error:", error.message);
                setErrorMessage(error.message || "An unexpected error occurred.");
            }
            setSuccessMessage("");  // Clear success message if there's an error
        }
    };

    return (
        <>
            <div className='bg-white rounded-xl shadow-xl p-5'>
                <p className='font-semibold mb-4'>Lets get you started</p>
                <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Your Nest</label>
                        <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg.. The Leaf Nest" value={formData.name} name='name' onChange={handleChange} required />
                    </div>


                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>


    )
}
