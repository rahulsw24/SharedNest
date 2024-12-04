import React, { useEffect, useState } from 'react'
import CreateNest from './CreateNest'
import DisplayNest from './nests/DisplayNest'
import axios from "axios"
import Header from './Layout/Header'
import DashboardStart from './Dashboard/DashboardStart'



export default function Dashboard({ user }) {


    return (
        <>
            <Header user={user} />
            {/* <CreateNest /> */}
            <DashboardStart user={user} />


        </>

    )
}
