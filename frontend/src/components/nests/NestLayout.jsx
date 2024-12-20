import React, { useEffect, useState } from 'react'
import Header from '../Layout/Header'
import NestDetails from './NestDetails'
import axios from "axios"


export default function NestLayout() {
    const [user, setUser] = useState({
        name: "",
        email: ""
    })
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                console.log(token);
                if (!token) {
                    throw new Error("Authentication token not found");
                }

                console.log("Fetching User");
                const response = await axios.get("./api/users/get-user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("User Data", response.data)
                const userData = response.data;
                setUser({ name: userData.name, email: userData.email })
                console.log("Name of the user", userData.email)



            }
            catch (err) {
                console.error("Error Fetching nests:", err)
                setError(err.response?.data?.message || "Failed to fetch nests")

            }

        }
        fetchUser();
    }, [])
    return (
        <>
            <div><Header user={user} /></div>
            <div>
                <NestDetails />
            </div>

        </>
    )
}
