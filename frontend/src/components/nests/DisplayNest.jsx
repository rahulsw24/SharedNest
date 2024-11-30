import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';



export default function displayNests() {
    const navigate = useNavigate();
    const [nest, getNest] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        console.log("Executing Use Effect:")

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
                console.log("Response Data", response)
                getNest(response.data);



            }
            catch (err) {
                console.error("Error Fetching nests:", err)
                setError(err.response?.data?.message || "Failed to fetch nests")

            }

        }
        fetchNests();
    }, [])
    const handleClick = (nestId) => {
        if (nestId) {
            navigate(`/nests/${nestId}`);
        } else {
            console.error('Nest ID is undefined');
        }
    }
    return (

        <div className='bg-emerald-300 rounded-xl mt-4'>
            <h1>Your Nests</h1>
            {console.log(nest)}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {nest.length > 0 ? (
                <div className=' my-5'>
                    <ul>
                        {
                            nest.map((nest) => (
                                <li key={nest._id}>
                                    <button onClick={() => { handleClick(nest.id || nest._id) }}>
                                        {nest.name}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ) : (<p>No Nests Found</p>)}



        </div >
    )
}
