import React, { useEffect } from 'react'
import CreateNest from './CreateNest'
import DisplayNest from './nests/DisplayNest'
import axios from "axios"
import Header from './Layout/Header'

export default function Dashboard() {

    return (
        <>
            <Header />
            <CreateNest />
            <DisplayNest />

        </>

    )
}
