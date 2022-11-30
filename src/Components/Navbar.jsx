import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='Navbar'>
        <div className="logo"><span className='logo1'>Connect<span className='logo2'> it</span></span></div>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            {/*<span>Faiz</span>
            <button className='mode'>dark</button>*/}
        </div>
    </div>
  )
}

export default Navbar