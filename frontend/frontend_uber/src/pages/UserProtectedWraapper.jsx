import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectedWraapper = ({children}) => {
    const navigate=useNavigate();
    const token=localStorage.getItem('token')
    if(!token){
        navigate('/login')
    }
    return (
        <>
        {children}  
    </>
    )
}

export default UserProtectedWraapper
