import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/home'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/login' element={<UserLogin/>}></Route>
        <Route exact path='/signup' element={<UserSignUp/>}></Route>
        <Route exact path='/captain-login' element={<CaptainLogin/>}></Route>
        <Route exact path='/captain-signup' element={<CaptainSignUp/>}></Route>
      </Routes>

    </div>
  )
}

export default App
