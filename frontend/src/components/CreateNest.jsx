import React, { useState } from 'react'

export default function CreateNest() {

    const [formData, setFormData] = useState({
        name: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(value)
        setFormData({ name: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.post('/api/nests/', formData, {
                headers: {
                    Authorization: `Bearer &{token}`,
                },
            });
            console.log(response.data)
        }
        catch (error) {
            console.error("Error Registering user", error.response.data)
        }

    };

    return (
        <>
            <div className='bg-gray-500 rounded-xl shadow-xl p-5'>
                <h1 className='mb-4 text-4xl'>SharedNest</h1>
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
