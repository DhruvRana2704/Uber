import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect ,useContext} from 'react';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
const UserProtectedWraapper = ({children}) => {
    const {user, setUser} = React.useContext(UserDataContext)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = React.useState(true)
    

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <>
            {children}  
        </>
    )
}

export default UserProtectedWraapper
