import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './Profile.css'

import greenwave from '../../assets/greenwave.jpg'
import next_icon from '../../assets/next.png'
import { appwriteLogOUT } from '../../Appwrite';

import { MyContext } from '../../ContextAPI.jsx';


function Profile() {

    const {
        URL,
        Name, setName,
        Email, setEmail,
        HouseAddress, setHouseAddress,
        Landmark, setLandmark,
        PinCode, setPinCode,
        AccountHolderName, setAccountHolderName,
        BankName, setBankName,
        AccountNumber, setAccountNumber,
        AccountIFSC_code, setAccountIFSC_code,
        proxyEmail, setProxyEmail,
        proxyHouseAddress, setProxyHouseAddress,
        error, setErrors,
        UserSignupObjectID ,setUserSignupObjectID,
        UserSignupData ,setUserSignupData,

        EditDetails, setEditDetails, removeEditDetails,

        OTP, setOTP,
        OTP_Value, setOTP_Value,
        PhoneNumber, setPhoneNumber,
        SessionID, setSessionID, removeSessionID,
        

    } = useContext(MyContext);

    async function ShowCurrUserDetails() {
        axios.get(`${URL}/prowork/signup`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
        .then(function(response){
            setUserSignupObjectID(response.data.UserObjectID)
            setUserSignupData(response.data.SignUpUser)
        })

        axios.get(`${URL}/prowork/personaluserdetails`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
        .then(function(response){
            async function setUserFields() {
                setName(response.data[0].Name)
                setEmail(response.data[0].Email)
            }
            setProxyEmail(response.data[0].Email);
            setUserFields();
                if(!( proxyEmail == undefined) && EditDetails.EditDetails == undefined){
                    setUserFields();
                }
            }
            
        )
        axios.get(`${URL}/prowork/addressuserdetails`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
        .then(function(response){
            async function setUserFields() {
                setHouseAddress(response.data[0].HouseAddress)
                setLandmark(response.data[0].Landmark)
                setPinCode(response.data[0].PinCode)
            }
            setProxyHouseAddress(response.data[0].HouseAddress);
            setUserFields();
                if(!( proxyEmail == undefined) && EditDetails.EditDetails == undefined){
                    setUserFields();
                }
            }
            
        )
    }


    
    
    const ValidationErrors = {}
    function validatePersonalDetails(){
        if(!Name.trim()) { ValidationErrors.Name = "Name is Required" }

        if(!Email.trim()) { ValidationErrors.Email = "Email is Required" }
        else if(!/\S+@\S+\.\S+/.test(Email)) { ValidationErrors.Email = "Email is not valid" }

        // if(!HouseAddress.trim()) { ValidationErrors.HouseAddress = "House Address is Required" }

        // if(!PinCode) { ValidationErrors.PinCode = "Pin code is Required" }
        // else if(PinCode.length > 7) { ValidationErrors.PinCode = "Pin code is must be 6 digit" }

        setErrors(ValidationErrors)
    }
    function validateAddressDetails(){
        // if(!Name.trim()) { ValidationErrors.Name = "Name is Required" }

        // if(!Email.trim()) { ValidationErrors.Email = "Email is Required" }
        // else if(!/\S+@\S+\.\S+/.test(Email)) { ValidationErrors.Email = "Email is not valid" }

        if(!HouseAddress.trim()) { ValidationErrors.HouseAddress = "House Address is Required" }

        if(!PinCode) { ValidationErrors.PinCode = "Pin code is Required" }
        else if(PinCode.length > 7) { ValidationErrors.PinCode = "Pin code is must be 6 digit" }

        setErrors(ValidationErrors)
    }
    async function HandlePersonalSave(e){
        e.preventDefault(); 
        validatePersonalDetails();
        if(Object.keys(ValidationErrors).length === 0){
            console.log("nnn")
            axios.post(`${URL}/prowork/personaluserdetails`, {Name, Email, UserSignupObjectID})
            .then(function (response){ setTimeout(() => { 
                toast.success("Information stored successfully")
                setTimeout(() => {window.location.reload();}, 1000);
            }, 700); })
        }
    }
    async function HandleAddressSave(e){
        e.preventDefault(); 
        validateAddressDetails();
        if(Object.keys(ValidationErrors).length === 0){
            axios.post(`${URL}/prowork/addressuserdetails`, {HouseAddress, Landmark, PinCode, UserSignupObjectID})
            .then(function (response){ setTimeout(() => {
                 toast.success("Information stored successfully") 
                 setTimeout(() => {window.location.reload();}, 1000);
                }, 700); })
        }
    }
    // console.log(EditDetails.EditDetails)
    // async function HandleSave(e){
    //     e.preventDefault(); 
    //     validateDetails();
    //     if(Object.keys(ValidationErrors).length === 0){
    //         axios.post(`${URL}/prowork/userdetails`, {Name, Email, HouseAddress, Landmark, PinCode, UserSignupObjectID})
    //         .then(function (response){ setTimeout(() => { toast.success("Information stored successfully") }, 700); })
    //     }
    // }

    function DetailsEditing(e){
        e.preventDefault()
        setEditDetails('EditDetails', true,{maxAge: 3600*24*21}) 
    console.log("dhd")}

    async function HandlePersonalEdit(e){
        e.preventDefault();
        validatePersonalDetails();
        if(Object.keys(ValidationErrors).length === 0){
            axios.patch(`${URL}/prowork/personaluserdetails`, {Name, UserSignupObjectID})
            .then(function (response){ removeEditDetails('EditDetails'); setTimeout(() => { toast.success("Information stored successfully") }, 700); })
        }
    }
    async function HandleAddressEdit(e){
        e.preventDefault();
        validateAddressDetails();
        if(Object.keys(ValidationErrors).length === 0){
            axios.patch(`${URL}/prowork/addressuserdetails`, { HouseAddress, Landmark, PinCode, UserSignupObjectID})
            .then(function (response){ removeEditDetails('EditDetails'); setTimeout(() => { toast.success("Information stored successfully") }, 700); })
        }
    }
    async function HandleEdit(e){
        e.preventDefault();
        validateDetails();
        if(Object.keys(ValidationErrors).length === 0){
            axios.patch(`${URL}/prowork/userdetails`, {Name, HouseAddress, Landmark, PinCode, UserSignupObjectID})
            .then(function (response){ removeEditDetails('EditDetails'); setTimeout(() => { toast.success("Information stored successfully") }, 700); })
        }
    }

    const [vjv, setvjv] = useState(false)
    function addressEdit(){
        setvjv(true)
        const bankform = document.querySelector('.profile-block')
        bankform.classList.add('blurr')
    }

    const [personalEdit, setPersonalEdit] = useState(false)
    function PersonalEditInfo(){
        setPersonalEdit(true)
        const bankform = document.querySelector('.profile-block')
        bankform.classList.add('blurr')
    }
    async function LL_Lose() {
        setvjv(false)
        setPersonalEdit(false)
        const bankform = document.querySelector('.profile-block')
        bankform.classList.remove('blurr')
    }

    async function logOut(){
        appwriteLogOUT()
    
        const waiting = new Promise(resolve => setTimeout(resolve, 1000));
        toast.promise( waiting, { 
          loading: 'Logging Out..', 
          success: <b className='toaastred'>Logged Out</b>, 
          error: <b>Something went wrong, try again</b>, }, 
          {iconTheme: {primary: 'red'}
        } );

        axios.post(`${URL}/prowork/logout`, {'status': "Log me out",}, { withCredentials: true,  headers: { 'Content-Type': 'multipart/form-data' }, })
        .then(function(response){
            if(response.data){
                setTimeout(() =>{
                    removeSessionID('SessionID')
                    setOTP(true)
                    setOTP_Value(null)
                    setPhoneNumber("")
                }, 2500)
            }
            
        })
    
        
      }
    

    return (
        <div id="Profile" onLoad={ShowCurrUserDetails}>
            <Helmet><title>Pro Work - Profile</title></Helmet>

            <div className="profile-block">
                {proxyEmail ? (<h1 className='profile-tagName'>{Name}</h1>):(<h2 className='profile-tagName guest_user'>User_{UserSignupObjectID}</h2>)} 
                {proxyEmail ? (<h3 className='profile-tagnum-email'>{UserSignupData} | {Email}</h3>):(<h2 className='profile-tagnum-email'>{UserSignupData}</h2>)}
                <Link to='/'><button onClick={logOut} className='logmeout'>Log out</button></Link>

                <div className="four-block-div">
                    <div className="same-block" onClick={PersonalEditInfo}>
                        <h3>Profile Details </h3>
                        <h5>Edit Now</h5>
                        
                        <img src={next_icon} className='next_icon' alt="" />
                    </div>

                    <div className="same-block" onClick={addressEdit}>
                        <h3>Address</h3>
                        <h5>View Saved</h5>
                        
                        <img src={next_icon} className='next_icon' alt="" />
                    </div>
                    <Link to='/my-profile/bookings'>
                        <div className="same-block">
                            <h3>Bookings </h3>
                            <h5>View History</h5>

                            <img src={next_icon} className='next_icon' alt="" />
                        </div>
                    </Link>
                    <Link to='/my-profile/wallet'>
                        <div className="same-block">
                            <h3>PW Wallet </h3>
                            <h5>View Balance</h5>

                            <img src={next_icon} className='next_icon' alt="" />
                        </div>
                    </Link>
                </div>
            </div>

            {vjv ?  (
                <form className='bank-form' noValidate>
                    <div className="bank-info">
                    <h3><img src={next_icon} alt="" className='back-next' onClick={LL_Lose}  /><span className='gray-wallet'>Profile &nbsp;</span> /&nbsp; Address Details</h3>
      
                        <div className='profile-label-input Per-Add-LP'>
                            <label className='profile-label profile-label-category' htmlFor="currUserHouse">House Address</label> 
                            {proxyHouseAddress ? (
                              <div className='edit-block-div'>
                                {EditDetails.EditDetails ? (
                                  <input value={HouseAddress} className='profile-input' onChange={(e) =>setHouseAddress(e.target.value)} type="text" />
                                ):(
                                  <label className='profile-input'>{HouseAddress}</label>
                                )}
                              </div>
                            ):(
                              <input className='profile-input' id='currUserHouse' placeholder='Enter House No.' onChange={(e) =>setHouseAddress(e.target.value)} type="text" />
                            )}
                            {error.HouseAddress && <span className='errormassDiv'>{error.HouseAddress}</span>}
                        </div>
      
                        <div className='profile-label-input Per-Add-LP'>
                          <label className='profile-label profile-label-category' htmlFor="currUserLandmark">Landmark</label> 
                          {proxyHouseAddress ? (
                            <div className='edit-block-div'>
                                {EditDetails.EditDetails ? (
                                    <input value={Landmark} className='profile-input' onChange={(e) =>setLandmark(e.target.value)} type="text" />
                                ):(
                                    <label className='profile-input'>{Landmark}</label>
                                )}
                            </div>
                            ):(
                                <input className='profile-input' id='currUserLandmark' placeholder='Enter Landmark (Optional)' onChange={(e) =>setLandmark(e.target.value)} type="text" />
                            )}
                            {error.Landmark && <span className='errormassDiv'>{error.Landmark}</span>}
                        </div>
      
                        <div className='profile-label-input Per-Add-LP'>
                            <label className='profile-label profile-label-category' htmlFor="currUserPin">Pin Code</label> 
                            {proxyHouseAddress ? (
                                <div className='edit-block-div'>
                                    {EditDetails.EditDetails ? (
                                        <input value={PinCode} className='profile-input' onChange={(e) =>setPinCode(e.target.value)} type="text" />
                                    ):(
                                        <label className='profile-input'>{PinCode}</label>
                                    )}
                                </div>
                            ):(
                                <input className='profile-input' id='currUserPinCode' placeholder='Enter your pincode' onChange={(e) =>setPinCode(e.target.value)} type="text" />
                            )}
                            {error.PinCode && <span className='errormassDiv'>{error.PinCode}</span>}
                        </div>

                        <div className='edit-block-div BDE-edit'>
                        {proxyHouseAddress ? (
                            <div className='edit-block-div BDE-edit BDE-Per-Add'>
                                {EditDetails.EditDetails ? (
                                    <button onClick={(e) => HandleAddressEdit(e)} className='withdraw-money final-money'>Update</button> 
                                ):(
                                    <button onClick={(e)=>(DetailsEditing(e))} className='Bank-details-edit BDE-full'>Edit Details </button>
                                )}
                            </div>
                        ):(
                            <button onClick={(e) => HandleAddressSave(e)} className='withdraw-money final-money'>Save</button>
                        )}
                        </div>
    
                    </div>
                </form>
            ):("")}


            {personalEdit ?(
                <form className='bank-form' noValidate>
                    <div className="bank-info">
                    <h3><img src={next_icon} alt="" className='back-next' onClick={LL_Lose}  /><span className='gray-wallet'>Profile &nbsp;</span> /&nbsp; Personal Details</h3>

                        <div className='profile-label-input Per-Add-LP'>
                            <label className='profile-label' htmlFor="currUserName">Name</label> 
                            {proxyEmail ? (
                                <div className='edit-block-div'>
                                    {EditDetails.EditDetails ? (
                                        <input value={Name} className='profile-input' onChange={(e) =>setName(e.target.value)} type="text" />
                                    ):(
                                        <label className='profile-input'>{Name}</label>
                                    )}
                                </div>
                            ):(
                                <input className='profile-input' id='currUserName' placeholder='Enter your name' onChange={(e) =>setName(e.target.value)} type="text" />
                            )}
                            {error.Name && <span className='errormassDiv'>{error.Name}</span>}
                        </div>

                        <div className='profile-label-input Per-Add-LP'>
                            <label className='profile-label' htmlFor="currUserEmail">Email</label> 
                            {proxyEmail ? (
                                <label className='profile-input'>{Email}</label>
                            ):(
                                <input className='profile-input' id='currUserEmail' placeholder='Enter your Email' onChange={(e) =>setEmail(e.target.value)} type="text" />
                            )}
                            {error.Email && <span className='errormassDiv'>{error.Email}</span>}
                        </div>

                        <div className='profile-label-input Per-Add-LP'>
                            <label className='profile-label'>Phone no.</label>
                            <label className='profile-input'>{UserSignupData} </label>
                        </div>


                        <div className='edit-block-div BDE-edit'>
                        {proxyEmail ? (
                            <div className='edit-block-div BDE-edit BDE-Per-Add'>
                                {EditDetails.EditDetails ? (
                                 <button onClick={(e) => HandlePersonalEdit(e)} className='withdraw-money final-money'>Update</button> 
                                ):(
                                <button type='button' onClick={(e)=>(DetailsEditing(e))} className='Bank-details-edit BDE-full'>Edit Details </button>
                                )}
                            </div>
                        ):(
                            <button onClick={(e) => HandlePersonalSave(e)} className='withdraw-money final-money'>Save</button>
                        )}
                        </div>
                    </div>
                
                    
                       
                </form>
            ):("")}
            <img className='profile-greenwave' src={greenwave} alt="" />
        </div>
    )
}

export default Profile