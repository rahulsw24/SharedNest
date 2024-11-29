import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddExpense from "../expense/AddExpense";

export default function NestDetails() {
    const { nestId } = useParams(); // Extract nestId from the URL
    const [nestData, setNestData] = useState(null);
    const [expenseData, setExpenseData] = useState([])
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);
    const [formData, setFormData] = useState({
        nestId: nestId,
        amount: 0,
        category: "",
        description: ""
    })
    const [success, setSuccess] = useState("");

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


                console.log(response.data.nest)

                setNestData(response.data.nest);



                // Assuming the API returns nest details
            } catch (err) {
                console.error("Error Fetching Nest Details:", err);
                setError(err.response?.data?.message || "Failed to fetch nest details");
            }
        };

        fetchNestDetails();
    }, [nestId, totalExpense]);
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const token = localStorage.getItem("accessToken")
                console.log(token)
                const expenses = await axios.get(`/api/expenses/${nestId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                console.log(expenses.data.expenses)

                if (Array.isArray(expenses.data.expenses)) {
                    setExpenseData(expenses.data.expenses); // Set as array
                } else {
                    throw new Error("Invalid data format from API");
                }
            }
            catch (err) {
                console.error("Error Fetching Nest Details:", err);
                setError(err.response?.data?.message || "Failed to fetch expense details");

            }


        }
        fetchExpense();
    }, [nestId, totalExpense])
    const handleAddExpense = async (amount, category, description) => {

        if (!amount || !category || !description) {
            throw new Error("All Fields Are Required")
        }

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error("Authentication token is missing");
            }
            const response = await axios.post(`/api/expenses/`, {
                nestId,
                amount,
                category,
                description

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            setNestData((prevNestData) => {
                const newTotalExpense = prevNestData.totalExpense + Number(amount); // Add as number, not string
                return {
                    ...prevNestData,
                    totalExpense: newTotalExpense, // Update total expense
                };
            });
            setTotalExpense((prevData) => {
                const newTotalExpense = prevData.totalExpense + Number(amount);
                return {
                    ...prevData,
                    totalExpense: newTotalExpense
                }
            })
            // setTotalExpense((prevData) => setTotalExpense(...prevData + amount))
            setShowForm(false); // Hide the form after submission
            setError('');
            setSuccess('Expense added successfully');
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to add expense")
            setSuccess("")

        }



    }

    return (
        <div>
            <h1>Nest Details</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {nestData ? (
                <div>
                    <h2>{nestData.name}</h2>
                    <p>Total Expenses: {nestData.totalExpenses || 0}</p>
                    {expenseData.length > 0 ? (
                        <div className='my-5'>
                            <ul>
                                {
                                    expenseData.map((expense) => (
                                        <li key={expense._id}>

                                            <p>{expense.amount}</p>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ) :
                        (<p>No expenses in here till now</p>)}
                </div>
            ) : (
                <p>Loading Nest Details...</p>
            )}
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600"
                >
                    Add Expense
                </button>
            )}
            {/* Render the AddExpenseForm when the user clicks Add Expense */
            }
            {showForm && (
                <AddExpense
                    onAddExpense={handleAddExpense}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
