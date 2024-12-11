import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddExpense from "../expense/AddExpense";
import Layout from "../Layout/Header";

export default function NestDetails() {
    const { nestId } = useParams(); // Extract nestId from the URL
    const [individualExpenses, setIndividualExpenses] = useState([]);
    const [showExpenses, setShowExpenses] = useState(false);
    const [nestData, setNestData] = useState(null);
    const [expenseData, setExpenseData] = useState([])
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);
    const [copied, setCopied] = useState(false);
    const fetchIndividualExpenses = async () => {
        try {
            const response = await axios.get(`/api/expenses/individual-expenses/${nestId}`);
            setIndividualExpenses(response.data);
            setShowExpenses(true); // Show the expenses popup
        } catch (error) {
            console.error('Error fetching individual expenses:', error);
        }
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(inviteCode) // Copy code to clipboard
            .then(() => {
                setCopied(true); // Set copied state to true
                setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };
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
                const token = localStorage.getItem("accessToken");
                const expenses = await axios.get(`/api/expenses/${nestId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (Array.isArray(expenses.data.expenses)) {
                    // Group expenses by month
                    const groupedByMonth = expenses.data.expenses.reduce((acc, expense) => {
                        const expenseDate = new Date(expense.date);
                        // Get full month name and year
                        const monthYear = expenseDate.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase(); // "DECEMBER 2024"

                        if (!acc[monthYear]) {
                            acc[monthYear] = { totalExpense: 0, expenses: [] };
                        }

                        acc[monthYear].totalExpense += expense.amount;
                        acc[monthYear].expenses.push(expense);
                        return acc;
                    }, {});

                    // Sort months: Current month first, then previous months
                    const sortedGroupedByMonth = Object.entries(groupedByMonth)
                        .sort(([monthYearA], [monthYearB]) => {
                            // Get current month
                            const currentMonth = new Date();
                            const currentMonthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase(); // "DECEMBER 2024"

                            // Check if the monthYear is the current month
                            if (monthYearA === currentMonthYear) return -1; // Move current month to the top
                            if (monthYearB === currentMonthYear) return 1;

                            // Otherwise, sort by date in descending order
                            const dateA = new Date(monthYearA);
                            const dateB = new Date(monthYearB);
                            return dateB - dateA;
                        })
                        .reduce((acc, [monthYear, data]) => {
                            acc[monthYear] = data;
                            return acc;
                        }, {});

                    setExpenseData(sortedGroupedByMonth); // Set sorted data
                } else {
                    throw new Error("Invalid data format from API");
                }
            } catch (err) {
                console.error("Error Fetching Expenses:", err);
                setError(err.response?.data?.message || "Failed to fetch expenses");
            }
        };
        fetchExpense();
    }, [nestId, totalExpense]);

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
    const [showExpenseForm, setShowExpenseForm] = useState(false)
    const [inviteCode, setInviteCode] = useState("")
    const [addMember, setAddMember] = useState(false);
    const handleGenerateCode = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`/api/nests/${nestId}/generate-code`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.inviteCode)

            setInviteCode(response.data.inviteCode)

        }
        catch (err) {
            console.error("error generating invite code")


        }
    }
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Join My Nest",
                text: "Use this code to join my nest:",
                url: `https://yourdomain.com/join?inviteCode=${inviteCode}`,
            })
                .then(() => console.log("Shared successfully!"))
                .catch(err => console.error("Failed to share: ", err));
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    console.log(inviteCode)
    return (
        <>

            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800
                    hover:bg-zinc-800">
                            <p class="text-2xl text-gray-400 hover:text-white dark:text-gray-500">
                                Total Expenses: ₹{nestData?.totalExpenses || 0}
                            </p>
                        </div>
                        {!showExpenseForm && (
                            <button onClick={() => {
                                setShowExpenseForm(true)

                            }}>
                                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800
                    hover:bg-zinc-800">
                                    <p class="text-2xl text-gray-400 hover:text-white dark:text-gray-500">
                                        Add Expense
                                    </p>
                                </div>
                            </button>)}
                        {
                            showExpenseForm && (
                                <AddExpense
                                    onAddExpense={handleAddExpense}
                                    onCancel={() => setShowExpenseForm(false)}
                                />
                            )
                        }
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        {/* Display members in the nest */}
                        <div className="bg-slate-900 p-5 rounded-2xl">
                            <h2 className="text-xl font-bold text-white dark:text-white">Members</h2>
                            {nestData?.members && nestData.members.length > 0 ? (
                                <ul className="mt-4 space-y-2">
                                    {nestData.members.map((member) => (
                                        <li
                                            key={member._id}
                                            className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 rounded shadow"
                                        >
                                            <p className="text-gray-700 dark:text-white">{member.name || "Unknown"}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-gray-500">No members found in this nest.</p>
                            )}

                        </div>
                        {!addMember && (
                            <button onClick={() => {
                                setAddMember(true)
                                handleGenerateCode()
                            }}>
                                <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800
                    hover:bg-zinc-800">

                                    <p className="text-2xl text-gray-400 hover:text-white dark:text-gray-500">Add Member's</p>
                                </div>
                            </button>
                        )}
                        {addMember && inviteCode && (
                            <div className="flex flex-col items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 hover:bg-zinc-800 p-4">
                                <p className="text-2xl text-black dark:text-white hover:text-white">Invite Code:</p>
                                <p className="text-lg text-gray-700 dark:text-gray-300 font-bold">{inviteCode}</p>
                                <button
                                    className="mt-2 bg-emerald-500 text-white py-1 px-4 rounded-md hover:bg-emerald-600"
                                    onClick={handleCopy}
                                >
                                    Copy Code
                                </button>
                                {copied && (
                                    <p className="mt-2 text-green-500 font-medium">
                                        Code copied!
                                    </p>
                                )}
                                <div className="mt-4">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={handleShare}
                                    >
                                        Share Link
                                    </button>
                                </div>
                            </div>
                        )}


                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div></div>
                        <div>
                            <button
                                onClick={fetchIndividualExpenses}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Member Totals
                            </button>

                            {showExpenses && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-md">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Member Expense Totals</h3>
                                        <ul className="space-y-2">
                                            {individualExpenses.length > 0 ? (
                                                individualExpenses.map((expense) => (
                                                    <li key={expense.userId} className="text-gray-600">
                                                        <span className="font-semibold">{expense.userName}:</span> ₹{expense.totalExpense}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-gray-600">No expenses found for members.</li>
                                            )}
                                        </ul>
                                        {/* Button to close the popup */}
                                        <button
                                            onClick={() => setShowExpenses(false)}
                                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {console.log(expenseData)}
                    <div class="flex items-center justify-center h-20 mb-4 rounded bg-gray-200 dark:bg-gray-800">
                        <p class="text-2xl text-black dark:text-gray-500">
                            Your EXPENSES!
                        </p>
                    </div>
                    <div className="my-6 space-y-6">
                        {Object.keys(expenseData).length > 0 ? (
                            Object.entries(expenseData).map(([monthYear, { totalExpense, expenses }]) => (
                                <div
                                    key={monthYear}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                                >
                                    <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                                        {monthYear}
                                    </h3>
                                    <div className="mb-4 text-center">
                                        <p className="text-xl font-bold text-gray-700 dark:text-white">
                                            Total Expense: ₹{totalExpense}
                                        </p>
                                    </div>
                                    <ul className="space-y-4">
                                        {expenses.map((expense) => (
                                            <li
                                                key={expense._id}
                                                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                                            >
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-700 dark:text-white">
                                                        ₹{expense.amount}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        Category: {expense.category}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        Description: {expense.description}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        Added By: {expense.userId.name || "Unknown"}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Date: {new Date(expense.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                No expenses for this nest yet
                            </p>
                        )}
                    </div>
                </div>

            </div>
            {/* <div className="">
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


                {showForm && (
                    <AddExpense
                        onAddExpense={handleAddExpense}
                        onCancel={() => setShowForm(false)}
                    />
                )}
            </div> */}

        </>

    );
}
