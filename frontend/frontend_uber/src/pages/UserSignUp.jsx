import React, { useState,useContext } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserSignUp = () => {
  const navigate=useNavigate();
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  
  const {user,setUser}=useContext(UserDataContext)
    const submitHandler = async(e) => {
      e.preventDefault()
      const newUser=({ fullname:{firstname,lastname},email, password })
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
      
      if(response.status==201)
      {
        const data=response.data;
        localStorage.setItem('token',data.token)
        setUser(data);
        navigate('/home')
      }

      setFirstname('')
      setLastname('')
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
    
                <h3 className='text-xl font-medium mb-2'>What's your Name</h3>
                
                <div className='flex gap-5 mb-6'>
                <input required type="text" value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border-2 text-base placeholder:text-base' placeholder='First Name'/>
                <input  type="text" value={lastname} onChange={(e)=>{setLastname(e.target.value)}} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border-2 text-base placeholder:text-base' placeholder='Last Name'/>
                </div>
                <h3 className='text-xl font-medium mb-2'>What's your email</h3>
    
                <input type="email"
                  required value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  placeholder="email@example.com" className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border-2 text-base placeholder:text-base' />
                <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
                <input type="password" required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="Password" className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border-2 text-base placeholder:text-base' />
                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full  text-lg placeholder:text-base'>Create Account</button>
              </div>
    
              <p className='text-center text-base'>Already have an account?<Link to='/login' className='text-blue-600'> Login</Link></p>
            </form>
    
          </div>
    
          <div>
            <p className='text-xs leading-tight'>This site is protected by reCaptcha and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span> </p>
          </div>
    
        </div>
  )
}

export default UserSignUp
