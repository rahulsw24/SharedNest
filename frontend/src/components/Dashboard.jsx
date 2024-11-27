import React from 'react'

export default function Dashboard() {
    return (
        <>
            <div className='container grid place-content-center h-screen mx-auto max-w-screen-xl px-4'>
                <div className=''>
                    <div className='p-6 max-w-sm mx-auto bg-gray-500 rounded-xl shadow-lg flex items-center space-x-4'>
                        <div>
                            <img className="h-16 w-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2880px-Tailwind_CSS_Logo.svg.png" alt="" />
                        </div>
                        <div>
                            <div className='text-2xl font-medium text-white'>
                                Tailwind CSS
                                <p className='text-black text-base'>By Rahul</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='bg-sky-400 p-2 my-3 rounded-xl text-white text-base hover:bg-fuchsia-400 hover:text-black dark:bg-slate-600'>Buy Now</button>
            </div >
        </>
    )
}
