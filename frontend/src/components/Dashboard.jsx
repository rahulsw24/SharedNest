import React, { useEffect } from 'react'
import CreateNest from './CreateNest'
import DisplayNest from './nests/DisplayNest'
import axios from "axios"

export default function Dashboard() {

    return (
        <>
            <CreateNest />
            <DisplayNest />

        </>

    )
}
