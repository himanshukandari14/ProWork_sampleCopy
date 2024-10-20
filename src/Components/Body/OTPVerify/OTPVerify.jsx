import React, { useContext, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import OtpInput from 'otp-input-react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router-dom';

import './OTPVerify.css'

import Close from '../../../assets/close.png';
import next_icon from '../../../assets/next.png'

import { SignUpBoxCross, closeProfileMenu, unBLUR } from '../../../func'


import { MyContext } from '../../../ContextAPI'
import { appwriteSendOTP, appwriteSubmitOTP, appwriteLogOUT, sessionId } from '../../../Appwrite';

export let UsersNumber, Temp_OTP_Value ;
function OTPVerify() {

  const {
    URL,
    OTP, setOTP,
    OTP_Value, setOTP_Value,
    PhoneNumber, setPhoneNumber,
    RegisterW, setRegisterW,
    WhatsAppNumber, setWhatsAppNumber,
    UserSignupObjectID ,setUserSignupObjectID,
    UserSignupData,

    error, setErrors,
    SessionID, setSessionID, removeSessionID,
  } = useContext(MyContext);
    
  async function sendOTP(){
    console.log(PhoneNumber)
    UsersNumber = "+91" + PhoneNumber;
    toast.success('OTP sent Successfully')
    appwriteSendOTP()
    setTimeout(() => { setOTP(false) }, 500);
    
  }
  async function WorkerCross(){
    
    setRegisterW(false)
    const WorkerUp = document.querySelector('.WorkerUp-par');
    const BodyRoutes = document.getElementById('Body-routes');
    // signupNumber.classList.remove('signup-number-move-down')
    // signupNumber.classList.add('signup-number-move-up')
    WorkerUp.classList.remove('showDisplay')
    BodyRoutes.classList.remove('blurr')
    BodyRoutes.classList.add('nonblurr')
  }
  
  async function submitOTP(){
    Temp_OTP_Value = OTP_Value;
    appwriteSubmitOTP()

    setTimeout(() => {
      if(!(sessionId == undefined)){
        setTimeout(() =>{
          axios.post(`${URL}/prowork/signup`, {PhoneNumber},{ withCredentials: true })
          .then(function (response){

            const waiting = new Promise(resolve => setTimeout(resolve, 1000));
            toast.promise( waiting, { 
              loading: 'Saving...', 
              success: <b className='toaastgreen'>Verification Successfull</b>, 
              error: <b>Wrong OTP, Please Try again</b> 
            }, {duration: 1500} );

            setTimeout(() =>{
              toast('Welcome to Pro Work', { style: { 
                border: '2px solid rgb(1, 141, 112)', 
                padding: '12px', 
                fontSize: '1.2rem', 
                color: 'rgb(1, 141, 112)', 
                position: "bottom-center"
              } }, {duration: 2000},);
            }, 2700)

            setTimeout(() => {
              setSessionID('SessionID', sessionId,{maxAge: 3600*24*21})
            }, 2500);

            setOTP(true)
            unBLUR()
          })
        }, 200)
      }
      else{
        toast.error("Wrong OTP, Please Try Again.")
      }
    }, 1500)
  }

  async function resendOTP(){
    toast.success('OTP sent Successfully')
    appwriteSendOTP()
    setOTP_Value(null)
  }

  
  const ValidationErrors = {}
  const descRef = useRef();
  const handleChange = (event) => {
    
    if (event.target.value.length <= '10') {
      setPhoneNumber(event.target.value);
      document.querySelector(".send-OTP-BTN").disabled = true;
      document.querySelector(".send-OTP-BTN").classList.add('opacityhalf');
      document.querySelector(".send-OTP-BTN").classList.remove('opacityfull');
      
    }
    if(event.target.value.length == '10') {
      descRef.current.blur();
      document.querySelector(".send-OTP-BTN").disabled = false;
      document.querySelector(".send-OTP-BTN").classList.add('opacityfull');
      document.querySelector(".send-OTP-BTN").classList.remove('opacityhalf');
      const errormassDiv = document.querySelector('.errormassDiv')
      errormassDiv.classList.add('hideDisplay')
    }
    else if(event.target.value.length > '10'){
      ValidationErrors.PhoneNumber = "Enter a valid number"
      setErrors(ValidationErrors)
      const errormassDiv = document.querySelector('.errormassDiv')
      errormassDiv.classList.remove('hideDisplay')
    }
  }

  const handleWorker = (event) => {
    
    if (event.target.value.length <= '10') {
      setWhatsAppNumber(event.target.value);
      document.querySelector(".send-OTP-BTN").disabled = true;
      document.querySelector(".send-OTP-BTN").classList.add('opacityhalf');
      document.querySelector(".send-OTP-BTN").classList.remove('opacityfull');
      
    }
    if(event.target.value.length == '10') {
      descRef.current.blur();
      document.querySelector(".send-OTP-BTN").disabled = false;
      document.querySelector(".send-OTP-BTN").classList.add('opacityfull');
      document.querySelector(".send-OTP-BTN").classList.remove('opacityhalf');
      const errormassDiv = document.querySelector('.errormassDiv')
      errormassDiv.classList.add('hideDisplay')
    }
    else if(event.target.value.length > '10'){
      ValidationErrors.WhatsAppNumber = "Enter a valid number"
      setErrors(ValidationErrors)
      const errormassDiv = document.querySelector('.errormassDiv')
      errormassDiv.classList.remove('hideDisplay')
    }
  }

  function onRegister(){
    if(SessionID.SessionID == undefined){
      toast.error('Login First') 
      setTimeout(() => { navSignUpBtn() }, 800);
    }
    else{
      axios.get(`${URL}/prowork/what-confirm`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
      .then(function(response){
        console.log(response.data[0].WhatsAppNumber)
        if(response.data[0].WhatsAppNumber){
          toast.error(`User already registered with ${response.data[0].WhatsAppNumber}`, {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
          });
          setWhatsAppNumber("+91")
        }
        else{
          axios.get(`${URL}/prowork/signup`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
          .then(function(response){
            let UserSignupObjectID = response.data.UserObjectID 
            axios.post(`${URL}/prowork/register`, {WhatsAppNumber, UserSignupObjectID })
            .then(function (response){
              console.log(response.data.WhatsAppNumber)
              const waiting = new Promise(resolve => setTimeout(resolve, 800));
              toast.promise( waiting, { loading: 'Saving...', success: <b className='toaastgreen'>Registration Done</b>, error: <b>Wrong OTP, Please Try again</b> }, {duration: 1000} );
                
              setTimeout(() => { const wt = document.querySelector('.wa').click() }, 2500);
            })
          })
        }
      })
      
    }

  }
  return (
    <div>
      {RegisterW ? (
        <div className="WorkerUp-par">
          <a className='wa' href="https://wa.me/917905099282"><button >Click1</button></a>
        <div className='signup-number'>
        <h3><img src={next_icon} alt="" className='back-next' onClick={WorkerCross}/> Work Registration</h3>
        <div className='signup-num-form'>
          <h2>Share your WhatsApp Number</h2>
          <h3 className='gray-wallet otp-mess'>Our support team will contact you as soon as possible</h3>

          <div className='signup-num-labelinput'>
            <fieldset className='field-num'>
              <legend>Phone number</legend>
              +91&nbsp; <input className='zmj' type="number" value={WhatsAppNumber} onChange={handleWorker} ref={descRef}/>
            </fieldset>
          </div>
          {error.WhatsAppNumber && <span className='errormassDiv'>{error.WhatsAppNumber}</span>}
          <button className='signup-num-button full-width send-OTP-BTN' onClick={onRegister} >Join Us</button>
          <label className="terms-cond gray-wallet"> By joining, you agree to our <Link to='/terms' className='T-C'>Terms &amp; Conditions</Link> and <Link to='/privacy' className='T-C'>Privacy Policy</Link></label>
        </div>
      </div>
      </div>
      ):("")}

      {OTP?
        (
        <div className="signUp-par">
          <div className='signup-number'>
          <h3><img src={next_icon} alt="" className='back-next' onClick={SignUpBoxCross}/> Sign Up / Sign In</h3>
          <div className='signup-num-form'>
            <h2>Enter Your Phone Number</h2>
            <h3 className='gray-wallet otp-mess'>You will receive OTP via SMS</h3>

            <div className='signup-num-labelinput'>
              <fieldset className='field-num'>
                <legend>Phone number</legend>
                +91&nbsp; <input className='zmj' type="number" value={PhoneNumber} onChange={handleChange} ref={descRef}/>
              </fieldset>
            </div>
            {error.PhoneNumber && <span className='errormassDiv'>{error.PhoneNumber}</span>}
            <button className='signup-num-button full-width send-OTP-BTN' onClick={sendOTP} >Send OTP</button>
            <label className="terms-cond gray-wallet"> By signing in, you agree to our <Link to='/terms' className='T-C'>Terms &amp; Conditions</Link> and <Link to='/privacy' className='T-C'>Privacy Policy</Link></label>
          </div>
        </div>
        </div>
        ):
        (
        <div className="OTP-div">
          <div className="OTP-box">
            <h1>Verify OTP</h1>
            <OtpInput className='OTP-input OTP-inputDesktop' inputStyles={{color:'green',}} value={OTP_Value} onChange={setOTP_Value} OTPLength='6' otpType='number' disabled={false} autoFocus></OtpInput>
            <OtpInput className='OTP-input OTP-inputPhone' inputStyles={{color:'green', height:'20%', width:'20%'}}  value={OTP_Value} onChange={setOTP_Value} OTPLength='6' otpType='number' disabled={false} autoFocus></OtpInput>
            <button className='signup-num-button' onClick={submitOTP}>Submit</button>
            <p className='OTP-not-recive'>Did not receive?<a className='OTP-resend' onClick={resendOTP} >Resend again</a></p>
          </div>
        </div>
      )}
      

    </div>
  )
}

export default OTPVerify