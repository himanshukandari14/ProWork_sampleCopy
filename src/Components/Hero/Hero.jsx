import React, {useState, useContext} from 'react'
import './Hero.css'
import {Link} from 'react-router-dom';
import aarrowdown from '../../assets/aarrow-down.gif'
import { heroScroll } from '../../func'

import { MyContext } from '../../ContextAPI.jsx';

function Hero() {

  const {
    URL,
    WhatsAppNumber, setWhatsAppNumber,
    RegisterW, setRegisterW,
    SessionID, setSessionID, removeSessionID,
    // RegisterFirstTime, setRegisterFirstTime, removeRegisterFirstTime
    
  } = useContext(MyContext);

  async function refisterW() {
    setRegisterW(true)
    
    setTimeout(() => {
      const WorkerUp = document.querySelector('.WorkerUp-par');
      const BodyRoutes = document.getElementById('Body-routes');
      WorkerUp.classList.add('showDisplay')
      BodyRoutes.classList.add('blurr')
      BodyRoutes.classList.remove('nonblurr')
    }, 100);
    
  }
  // console.log(WhatsAppNumber)

  return (
    <div id="Hero">
      <div className="hero-description">
        <div className="subHeroDes">
          <h1 data-cursor="-opaque">Providing Work that you need...</h1>
          <h4 data-cursor="-opaque">We offers reliable services for all your household needs. From plumbing fixes to electrical repairs, we've got you covered. Our skilled professionals ensure top-notch workmanship, providing peace of mind. Trust Prowork for all your service needs</h4>
          <button data-cursor='-hidden' className='hero-description-btn' onClick={refisterW}>Register</button>
          <Link to='/services'><button data-cursor='-hidden' className='hero-description-btn servicesbtn'>Services</button></Link>
        </div>
      </div>

      <div className="hero-title">
        <h1>PLACE</h1>
        <h1>TO</h1>
        <h1>WORK</h1>
      </div>
      

      <h5 onLoad={heroScroll} data-cursor='-hidden' className='heroscroll'>SCROLL <img className='aarrow-down' src={aarrowdown} alt="" /> </h5>

    </div>
  )
}

export default Hero