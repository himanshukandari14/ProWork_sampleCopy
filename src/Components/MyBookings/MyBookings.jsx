import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import greenwave from '../../assets/greenwave.jpg'
import './MyBookings.css'

import next_icon from '../../assets/next.png'
import { MyContext } from '../../ContextAPI.jsx';
import { Link } from 'react-router-dom'


function MyBookings() {
  const {
    URL,
    Name,
    UserSignupObjectID ,setUserSignupObjectID,
    UserSignupData ,setUserSignupData,
    

} = useContext(MyContext);
const [stopp, setStopp] = useState('')

async function ShowMyBookings(){
  // console.log("My Bookings pages is loaded")
  axios.get(`${URL}/mybookings`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
  .then(function(response){
    // console.log(response)
    let xxnn = response.data.map(item =>   
      <div key={item._id} className='single-booking-block'>
        <div className="includeonly"><h5>Status: Failed/Success</h5></div>
        <div className='allSumary'>
          <div className="wiallsum"><h4>Booking:</h4><h4>{item.Booking_Category}</h4></div>
          <div className="wiallsum"><h4>Date:</h4> <h4>{item.Booking_Date}</h4></div>
          <div className="wiallsum"><h4>Time:</h4> <h4>{item.Booking_Time}</h4></div>
          <div className="wiallsum"><h4>Service Charge:</h4><h4>{item.Razorpay_Service_Amount}</h4></div>
          <div className="wiallsum wiallsumlasts"><h4>Travel Charge:</h4><h4>{item.Razorpay_Total_Charge}</h4></div>
          <div className="wiallsum"><h4>Total Amount:</h4><h4>{item.Razorpay_Travel_Amount}</h4></div>
        </div>
      </div>
    )
    if(xxnn.length === 0){
      setStopp(false)
    }else{

      setStopp(xxnn)
    }


  })
}

  return (
    <div id="MyBookings" onLoad={ShowMyBookings}>
      <Helmet><title>Pro Work - My Bookings</title></Helmet>
      <div className="my-booking-block">
        <h3 className='wallet-block-h3'><Link to='/my-profile'><span className='dullgray-wallet'>My Profile</span></Link> <img src={next_icon} alt="" className='next_arrow' /> Bookings </h3>
        <h1>Bookings</h1>
        {stopp ?(<div className='all-bookings'>{stopp}</div>):(<h3>No Booking done yet...</h3>)}
        <h3 className='fi iif'><span>Previous</span> &nbsp;&nbsp;&nbsp;&nbsp; Next</h3>
      </div>
      


      <img className='profile-greenwavee' src={greenwave} alt="" />
    </div>
  )
}

export default MyBookings