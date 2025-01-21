import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import {CaptainDataContext} from '../context/CaptainContext';
const CaptainProtectedWrapper = ({children}) => {
    const {captain, setCaptain} = React.useContext(CaptainDataContext)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = React.useState(true)
    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token])

    axios.get(`${import.meta.env.VITE_API_BASE_URI}/captains/profile`,{headers: {Authorization: `Bearer ${token}`}}).then(
        (response) => {
            if(response.status === 200)
                {
                    setCaptain(response.data.captain)
                    setIsLoading(false)
                }
        }).catch((error) => {
            console.log(error)
            localStorage.removeItem('token')
            navigate('/captain-login')
        })

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper
