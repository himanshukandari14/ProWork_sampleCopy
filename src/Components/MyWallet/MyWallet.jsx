import React,{ useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import './MyWallet.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

import next_icon from '../../assets/next.png'
import greenwave from '../../assets/greenwave.jpg'
import downarrowlatest from '../../assets/down-arrow-latest.png'
import { MyContext } from '../../ContextAPI.jsx';

function MyWallet() {
  const {
    URL,
    AdminURL,
    
    AccountHolderName, setAccountHolderName,
    BankName, setBankName,
    AccountNumber, setAccountNumber,
    AccountIFSC_code, setAccountIFSC_code,
    WithdrawAmount, setWithdrawAmount,
    
    proxyAccountNumber, setProxyAccountNumber,
    error, setErrors,
    UserSignupObjectID ,setUserSignupObjectID,
    UserSignupData ,setUserSignupData,
    User_Balance, setUser_Balance,

    EditDetails, setEditDetails, removeEditDetails

  } = useContext(MyContext);

  const [stopp, setStopp] = useState('')
  async function ShowWalletPage(){
    axios.get(`${URL}/prowork/signup`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
    .then(function(response){
      setUserSignupObjectID(response.data.UserObjectID)
      setUserSignupData(response.data.SignUpUser)
    })
  
    axios.get(`${URL}/prowork/bankdetails`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
    .then(function(response){
      async function setBankFields() {
        setAccountHolderName(response.data[0].AccountHolderName)
        setBankName(response.data[0].BankName)
        setAccountNumber(response.data[0].AccountNumber)
        setAccountIFSC_code(response.data[0].AccountIFSC_code)
      }
      setProxyAccountNumber(response.data[0].AccountNumber);
      // console.log(proxyAccountNumber)
      setBankFields();
      if(!( proxyAccountNumber == undefined) && EditDetails.EditDetails == undefined ){
        setBankFields();
      }
    })
    axios.get(`${URL}/prowork/withdraw`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
    .then(function(response){
      // console.log()
      setUser_Balance(response.data[0].User_Balance)
    })

    axios.get(`${URL}/prowork/withdrawal-history`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
    .then(function(response){
      console.log(response.data)

      let xxnn = response.data.map(item =>   
        <div key={item._id} className="balance-history">
          <h4>{item.Withdrawal_Status}<label htmlFor="" className='tranction'> {item.Withdrawal_Time} &nbsp;{item.Withdrawal_Date}</label></h4>
          <h4 className='bal-green-label tranction-amount'>-₹{item.Withdrawal_Balance}.00</h4>
        </div>
          
      )
      if(xxnn.length === 0){ setStopp(false) }
      else{ setStopp(xxnn) }

    })

  }

  const [bankEdit, setBankEdit] = useState(false)
  const [showWithdrawform, setShowWithdrawfrom] = useState(false)

  function BankEdit(){ 
    setBankEdit(true) 
    setShowWithdrawfrom(false)
    const bankform = document.querySelector('.Wallet-block')
    bankform.classList.add('blurr')
  }
  // console.log(AccountNumber)
  async function showWithdrawFrom(){
    if(AccountNumber){
   setShowWithdrawfrom(true) 
   setBankEdit(false)
   const bankform = document.querySelector('.Wallet-block')
    bankform.classList.add('blurr')
    }else{
      BankEdit()
    }
  }

  async function CC_Lose(){
    setShowWithdrawfrom(false)
    const bankform = document.querySelector('.Wallet-block')
    bankform.classList.remove('blurr')
  }
  async function LL_Lose() {
    setBankEdit(false)
    const bankform = document.querySelector('.Wallet-block')
    bankform.classList.remove('blurr')
  }
  // setUser_Balance(1500)
  async function HandleBankSave(e){
    e.preventDefault(); 
    // validateDetails();
    // if(Object.keys(ValidationErrors).length === 0){
      axios.post(`${URL}/prowork/bankdetails`, {AccountHolderName, BankName, AccountNumber, AccountIFSC_code, UserSignupObjectID})
      .then(function (response){ setTimeout(() => {
         toast.success("Bank Details stored successfully")
         setTimeout(() => {window.location.reload();}, 1000); }, 700); })

         axios.post(`${URL}/prowork/withdraw`,{User_Balance, UserSignupObjectID})
         .then(function(response){
         })
    // }
  }

  function DetailsEditing(e){
    e.preventDefault();
    setEditDetails('EditDetails', true,{maxAge: 3600*24*21}) }

  async function HandleBankEdit(e){
    e.preventDefault();
    // validateDetails();
    // if(Object.keys(ValidationErrors).length === 0){
      axios.patch(`${URL}/prowork/bankdetails`, {AccountHolderName, BankName, AccountNumber, AccountIFSC_code, UserSignupObjectID})
      .then(function (response){ removeEditDetails('EditDetails'); setTimeout(() => { toast.success("Information stored successfully") }, 700); })
    // }
  }

  async function HandleWithdraw(e){
    e.preventDefault();
    if(WithdrawAmount >= 300){
      const currentDate = new Date();
      const Withdrawal_Date = currentDate.toLocaleDateString();
      const Withdrawal_Time = currentDate.toLocaleTimeString();
      axios.patch(`${URL}/prowork/withdraw`, {AccountHolderName, BankName, AccountNumber, AccountIFSC_code, WithdrawAmount, Withdrawal_Date, Withdrawal_Time,  UserSignupObjectID})
      .then(function(response){toast.success("Your Withdrawal is Success")})
    }else{
      toast.error("min withdraw amount is 300")
    }
    
    axios.patch(`${AdminURL}/admin/withdrawals`, {AccountHolderName, BankName, AccountNumber, AccountIFSC_code, WithdrawAmount,  UserSignupObjectID})

    
  }
  
  
// console.log(proxyAccountNumber)
  return (
    <div id="MyWallet" onLoad={ShowWalletPage}>
      <Helmet><title>Pro Work - My Wallet</title></Helmet>

      <div className="balance-heading-withdraw">
        <h3 className="balance-heading">₹ {User_Balance}.00</h3>
              
        <div className="balance-withdraw">
          <button className='withdraw-money' onClick={showWithdrawFrom}>Withdraw</button>
        </div>
      </div>
      {bankEdit ? (
          <form className='bank-form' noValidate>
          <div className="bank-info">
            <h3><img src={next_icon} alt="" className='back-next' onClick={LL_Lose}/><span className='gray-wallet'>Wallet &nbsp;</span> /&nbsp; Account Details</h3>
      
            <div className='profile-label-input bank-li'>
              <label className='profile-label profile-label-category' htmlFor="currAccountHolderName">Holder Name</label> 
              {proxyAccountNumber ? (
                <div className='edit-block-div'>
                  {EditDetails.EditDetails ? (
                    <input value={AccountHolderName} className='profile-input' onChange={(e) =>setAccountHolderName(e.target.value)} type="text" />
                  ):(
                    <label className='profile-input'>{AccountHolderName}</label>
                  )}
                </div>
              ):(
                <input className='profile-input' id='currAccountHolderName' placeholder='Enter Account Holder Name' onChange={(e) =>setAccountHolderName(e.target.value)} type="text" />
              )}
              {error.AccountHolderName && <span className='errormassDiv'>{error.AccountHolderName}</span>}
            </div>
      
            <div className='profile-label-input bank-li'>
              <label className='profile-label profile-label-category' htmlFor="currBankName">Bank Name</label> 
              {proxyAccountNumber ? (
                <div className='edit-block-div'>
                  {EditDetails.EditDetails ? (
                    <input value={BankName} className='profile-input' onChange={(e) =>setBankName(e.target.value)} type="text" />
                  ):(
                    <label className='profile-input'>{BankName}</label>
                  )}
                </div>
              ):(
                <input className='profile-input' id='currBankName' placeholder='Enter Bank Name' onChange={(e) =>setBankName(e.target.value)} type="text" />
              )}
              {error.BankName && <span className='errormassDiv'>{error.BankName}</span>}
            </div>
      
            <div className='profile-label-input bank-li'>
              <label className='profile-label profile-label-category' htmlFor="currAccountNumber">Account Number</label> 
              {proxyAccountNumber ? (
                <div className='edit-block-div'>
                  {EditDetails.EditDetails ? (
                    <input value={AccountNumber} className='profile-input' onChange={(e) =>setAccountNumber(e.target.value)} type="text" />
                  ):(
                    <label className='profile-input'>{AccountNumber}</label>
                  )}
                </div>
              ):(
                <input className='profile-input' id='currAccountNumber' placeholder='Enter Your Account Number' onChange={(e) =>setAccountNumber(e.target.value)} type="number" />
              )}
              {error.AccountNumber && <span className='errormassDiv'>{error.AccountNumber}</span>}
            </div>

            <div className='profile-label-input bank-li'>
              <label className='profile-label profile-label-category' htmlFor="currAccountIFSC_code">IFSC Code</label> 
              {proxyAccountNumber ? (
                <div className='edit-block-div'>
                  {EditDetails.EditDetails ? (
                    <input value={AccountIFSC_code} className='profile-input' onChange={(e) =>setAccountIFSC_code(e.target.value)} type="text" />
                  ):(
                    <label className='profile-input'>{AccountIFSC_code}</label>
                  )}
                </div>
              ):(
                <input className='profile-input' id='currAccountIFSC_code' placeholder='Enter Banks IFSC Code' onChange={(e) =>setAccountIFSC_code(e.target.value)} type="text" />
              )}
              {error.AccountIFSC_code && <span className='errormassDiv'>{error.AccountIFSC_code}</span>}
            </div>
            
            <div className='edit-block-div BDE-edit'>
            {proxyAccountNumber ? (
              <div className='edit-block-div BDE-edit'>
                {EditDetails.EditDetails ? (
                 <button onClick={(e) => HandleBankEdit(e)} className='withdraw-money final-money'>Update</button> 
                ):(
                  <button onClick={(e)=>(DetailsEditing(e))} className='Bank-details-edit BDE-full'>Edit Details </button>
                )}
              </div>
            ):(
              <button onClick={(e) => HandleBankSave(e)} className='withdraw-money final-money'>Save</button>
            )}
            </div>
    
          </div>
        </form>
        ):("")}

        {showWithdrawform ? (
          <div className="withdraw-form">
            <form className="withdraw-content">
              <div className='withdraw-details'>
                <h3><img src={next_icon} alt="" className='back-next' onClick={CC_Lose}/><span className='gray-wallet'>Wallet &nbsp;</span> /&nbsp; Withdraw</h3>
                <div className='withdraw-amount-li'>
                  <label htmlFor="">Enter Amount:</label>
                  <input type="number" placeholder='Enter the amount' className='withdraw-amount' onChange={(e) =>setWithdrawAmount(e.target.value)}/>
                </div>
                <div className='confirm-bank-details'>
                  <h3>Confirm Bank Details</h3>
                  <fieldset>
                    <legend>Holder Name</legend>
                    {AccountHolderName}
                  </fieldset>
                  <fieldset>
                    <legend>Bank Name</legend>
                    {BankName}
                  </fieldset>
                  <fieldset>
                    <legend>Account Number</legend>
                    {AccountNumber}
                  </fieldset>
                  <fieldset>
                    <legend>IFSC Code</legend>
                    {AccountIFSC_code}
                  </fieldset>
                  <button onClick={BankEdit} className='Bank-details-edit'>Edit</button>
                </div>
              </div>
              <button className="withdraw-money final-money" onClick={(e) => HandleWithdraw(e)}>Withdraw</button>
            </form>
          </div>
        ):("")}

      <div className="Wallet-block">
        <h3 className='wallet-block-h3'><Link to='/my-profile'><span className='dullgray-wallet'>My Profile</span></Link> <img src={next_icon} className='next_arrow' alt=""/> Wallet </h3>
        <h1 className='wall-tag-name'>Wallet</h1>

        <div className="Wallet-content">

          <div className=" balance-blockk">
            <div className="same-block" onClick={BankEdit}>
              <h3>Accounts Details </h3>
              <h5>Edit Now</h5>        
              <img src={next_icon} className='next_icon' alt="" />
            </div>
          </div>

          <div className=" balance-bk">
            <h4>Withdrawals</h4>
            {stopp ? (""):(<h3 className='all-bookings'>No Booking done yet...</h3>)}
            <div className="privious-withdraws"> {stopp}</div>
            <h3 className='fi'><span>Previous</span> &nbsp;&nbsp;&nbsp;&nbsp; Next</h3>
          </div>
          
        </div>
      </div>
      <img className='profile-greenwaveee' src={greenwave} alt="" />
    </div>
  )
}

export default MyWallet