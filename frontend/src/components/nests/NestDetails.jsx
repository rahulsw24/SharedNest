import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NestDetails() {
    const { nestId } = useParams(); // Extract nestId from the URL
    const [nestData, setNestData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNestDetails = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    throw new Error("Authentication token not found");
                }

                const response = await axios.get(`/api/nests/${nestId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setNestData(response.data); // Assuming the API returns nest details
            } catch (err) {
                console.error("Error Fetching Nest Details:", err);
                setError(err.response?.data?.message || "Failed to fetch nest details");
            }
        };

        fetchNestDetails();
    }, [nestId]);

    return (
        <div>
            <h1>Nest Details</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {nestData ? (
                <div>
                    <h2>{nestData.name}</h2>
                    <p>Total Expenses: {nestData.totalExpenses || 0}</p>
                    {/* Add logic to display expenses or other details */}
                </div>
            ) : (
                <p>Loading Nest Details...</p>
            )}
        </div>
    );
}
