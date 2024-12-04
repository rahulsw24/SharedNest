import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Header'
import NestDetails from './NestDetails'
import axios from "axios"
import Header from '../Layout/Header'



export default function NestPage({ user }) {

    return (
        <>
            <div>
                <section><Header user={user} /></section>
                <section className='flex flex-col max-h-full max-w-full place-content-center'>
                    <div>
                        <NestDetails />
                    </div>
                </section>
            </div>

        </>
    )
}
