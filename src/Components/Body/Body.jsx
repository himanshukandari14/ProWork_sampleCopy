import React from 'react'
import { Toaster } from 'react-hot-toast';
import {Link, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import {motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

import './Body.css'
import './cursor.css'
import './cursor.js'

import TermsConditionPop from './TermsConditionPop/TermsConditionPop.jsx';
import OTPVerify from './OTPVerify/OTPVerify.jsx';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Service from '../Service/Service';
import Explore from '../Explore/Explore';
import About from '../About/About';
import Footer from '../Footer/Footer'
import Profile from '../Profile/Profile'
// import Registration from '../Registration/Registration.jsx'
import ProtectedRoutes from '../ProtectedRoutes';
import Category from '../Category/Category';
import Success from '../Success/Success';
import Failed from '../Failed/Failed';
import MyBookings from '../MyBookings/MyBookings.jsx';
import MyWallet from '../MyWallet/MyWallet';
import Error404 from '../Error404/Error404.jsx';
import Privacy from '../Privacy/Privacy.jsx';
import Terms from '../Terms/Terms.jsx';


function Body() {

  return (
    <CookiesProvider defaultSetOptions={{ path: '/prowork' }}>
      <AnimatePresence>

      {/* <motion.div key={1} className="up-hero-section1" initial={{ y:0, }} animate={{ y:-1000}} exit={{y:0}} transition={{duration: 0.9, delay: 2}} >
        <motion.div className="dot dot1" initial={{ y:0, }} animate={{ y:200}} exit={{y:0}} transition={{duration: 0.5, delay: 1}}></motion.div>
        <div className="proCircle">PRO WORK</div>
        <motion.div className="dot dot2" initial={{ y:0, }} animate={{ y:200}} exit={{y:0}} transition={{duration: 0.5, delay: 1}}></motion.div>
      </motion.div> */}

        <div id="Body">
          <Helmet><title>Pro Work - Home</title></Helmet>
          <Toaster/>
          <Navbar/>

          <OTPVerify/>
          {/* <TermsConditionPop/> */}

          <div id='Body-routes' className="body-routes">
            <Routes location={location} key={location.pathname} >
              <Route path='/' element={<Home/>}/>
              <Route path='/services' element={<Service/>}/>
              <Route path='/explore' element={<Explore/>}/>
              <Route path='/about' element={<About/>}/>
              {/* <Route path='/registration' element={<Registration/>}/> */}
              <Route path='/terms' element={<Terms/>}/>
              <Route path='/privacy-policy' element={<Privacy/>}/>
              <Route path='/:error404' element={<Error404/>}/>


                

              <Route element={<ProtectedRoutes/>}>
              <Route path='/my-profile' element={<Profile/>}/>
                <Route path='/my-profile/bookings' element={<MyBookings/>}/>
                <Route path='/my-profile/wallet' element={<MyWallet/>}/>
                <Route path='/payment_success' element={<Success/>}/>
                <Route path='/payment_failed' element={<Failed/>}/>
              </Route>

              <Route path='/services/:category' element={<Category/>}/>

            </Routes>
          </div>

          <Footer/>
        </div>
      </AnimatePresence>
    </CookiesProvider>
  )
}

export default Body