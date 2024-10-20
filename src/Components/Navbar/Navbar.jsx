import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"

import './Navbar.css'

import HamMenu from '../../assets/nav_hamMenu.png'
import User from '../../assets/nav_user.png'

import { navbarHide, navSignUpBtn, navUserLaptopBtn, closeProfileMenu, heroScrollx } from '../../func'
import { MyContext } from '../../ContextAPI.jsx'


function navPhoneHam(){
  console.log("Phone Ham menu is working")
}
function Navbar() {

  const {
    SessionID, setSessionID, removeSessionID,

  } = useContext(MyContext);

  return (
    <div id='Navbar' onLoad={navbarHide}>
      <motion.div className="navbar1250" initial={{ y:0, }} animate={{ y:0,}} exit={{y:0}} transition={{duration: 0.3, delay: 2.4}}>

        <Link className="navbar-left" to='/'>
          <h1 onClick={closeProfileMenu} className="nav-main-logo"><b>PRO</b> WORK</h1>
        </Link>

        <div className="navbar-right">

          <div className="navbar-laptop-options">
            <Link onClick={heroScrollx} className="service-explore-about" to="/services">SERVICES</Link>
            <Link onClick={heroScrollx} className="service-explore-about" to="/explore">EXPLORE</Link>
            <Link onClick={heroScrollx} className="service-explore-about" to="/about">ABOUT US</Link>
            {SessionID.SessionID ?(
              <Link to='/my-profile'><a className='navbar-laptop-user' onClick={navUserLaptopBtn} data-cursor="-opaque1" data-cursor-stick=".navbar-laptop-user"><img src={User} /></a></Link>
            ):(
              <a className="nav-signup" onClick={navSignUpBtn} data-cursor="-hidden">Sign Up</a>
            )}
          </div>

          <div className="navbar-phone-options">
            <a className='nav-phone-ham' onClick={navPhoneHam} ><img src={HamMenu} /></a>
            <a className='nav-signup' onClick={navSignUpBtn} data-cursor="-hidden">Sign Up</a>
          </div>

        </div>
        
      </motion.div>
    </div>
  )
}

export default Navbar