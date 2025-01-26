import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Home from './pages/Home'
import UserProtectedWraapper from './pages/UserProtectedWraapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path='/login' element={<UserLogin/>}></Route>
        <Route exact path='/signup' element={<UserSignUp/>}></Route>
        <Route exact path='/captain-login' element={<CaptainLogin/>}></Route>
        <Route exact path='/captain-signup' element={<CaptainSignUp/>}></Route>
        <Route exact path='/home' element={<UserProtectedWraapper><Home/></UserProtectedWraapper>}></Route>
        <Route exact path='/user/logout' element={<UserProtectedWraapper><UserLogout></UserLogout></UserProtectedWraapper>}></Route>
        <Route exact path='/captain/logout' element={<UserProtectedWraapper><CaptainLogout></CaptainLogout></UserProtectedWraapper>}></Route>
        <Route exact path='/captain-home' element={<CaptainProtectedWrapper><CaptainHome></CaptainHome></CaptainProtectedWrapper>}></Route>
        <Route exact path='/riding' element={<Riding/>}></Route>
        <Route exact path='/captain-riding' element={<CaptainRiding/>}></Route>
      </Routes>

    </div>
  )
}

export default App
