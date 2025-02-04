import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserLogin = () => {
 
  const navigate=useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user,setUser}=useContext(UserDataContext)
  
  const submitHandler =async (e) => {
    e.preventDefault()

    const userData=({ email, password })
    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
   
    if(response.status==200)
    {
      const data=response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>

      <div>
        <form onSubmit=
          {(e) => {
            submitHandler(e)
          }
          }>
          <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            <h3 className='text-xl font-medium mb-2'>What's your email</h3>

            <input type="email"
              required value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="email@example.com" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border-2 text-base placeholder:text-base' />
            <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
            <input type="password" required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="Password" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border-2 text-base placeholder:text-base' />
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full  text-lg placeholder:text-base'>Login</button>
          </div>

          <p className='text-center text-base'>New to Uber?<Link to='/signup' className='text-blue-600'> Create an Account</Link></p>
        </form>

      </div>

      <div>
        <Link to='/captain-login' className='flex justify-center bg-[green] text-white font-semibold mb-5 rounded px-4 py-2 w-full  text-lg '>Sign in as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin
