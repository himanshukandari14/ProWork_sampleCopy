import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import toast from 'react-hot-toast'

import './Category.css'
import '../Profile/Profile.css'

import Close from '../../assets/close.png';
import next_icon from '../../assets/next.png'
import ProWorkLogo from '../../../public/android-chrome-512x512.png'

import { MyContext } from '../../ContextAPI.jsx';
import { navSignUpBtn } from '../../func.jsx';
import { categoryList } from '../../assets/CategoryList'

export let CategoryURL;
function Category() {
  CategoryURL = window.location.href;

  const {
    URL,
    Name, setName,
    Email, setEmail,
    HouseAddress, setHouseAddress,
    Landmark, setLandmark,
    PinCode, setPinCode,
    proxyEmail, setProxyEmail,
    error, setErrors,
    UserSignupObjectID ,setUserSignupObjectID,
    UserSignupData ,setUserSignupData,

    EditDetails, setEditDetails, removeEditDetails,
    SessionID
    
  } = useContext(MyContext);

  

  async function CategoryPage() {
    document.querySelector(".bookService").disabled = true;

    axios.get(`${URL}/prowork/signup`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
    .then(function(response){
      setUserSignupObjectID(response.data.UserObjectID)
      setUserSignupData(response.data.SignUpUser)
    })
    
    axios.get(`${URL}/prowork/personaluserdetails`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
    .then(function(response){
      setName(response.data[0].Name)
      setProxyEmail(response.data[0].Email)

      axios.get(`${URL}/prowork/addressuserdetails`, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }, })
      .then(function(response1){
        setHouseAddress(response1.data[0].HouseAddress)
        setLandmark(response1.data[0].Landmark)
        setPinCode(response1.data[0].PinCode)      
        if(!( proxyEmail == undefined) && EditDetails.EditDetails == undefined){
          setHouseAddress(response1.data[0].HouseAddress)
          setLandmark(response1.data[0].Landmark)
          setPinCode(response1.data[0].PinCode) 
        }
      }  
    )

    
        
    })
    if(!proxyEmail){
      console.log("jj")
      document.querySelector('.category-space').disabled = true;
      document.querySelector(".category-space").classList.add('opacityhalf');
      console.log("MMM")
    }
    if(proxyEmail){
      document.querySelector('.category-space').disabled = false;
      document.querySelector(".category-space").classList.add('opacityfull');
      
    }
    
  }

  const [ random, setRandom] = useState("");
  function randomInteger(min, max) {
    setRandom(Math.floor(Math.random() * (max - min + 1)) + min);
    document.querySelector(".bookService").disabled = false;
  }

  const [BookServiceBtn, setBookServiceBtn] = useState(false)
  const [BookServiceNextBtn, setBookServiceNextBtn] = useState(false)
  async function ServiceBooking() {
    if(SessionID.SessionID == undefined){
      toast.error('Login First') 
      setTimeout(() => { navSignUpBtn() }, 800);
    }else{
      setBookServiceBtn(true)
      const mn = document.querySelector('.CategoryBlock');
      const bookService = document.querySelector('.bookService');
      const trandom = document.querySelector('.total-random-price');
      bookService.classList.add('movefun1')
      trandom.classList.add('movefun')
      mn.classList.add('blurr')
      // BodyRoutes.classList.remove('nonblurr')
    }
  }
  function ServiceBookingClose(){
    const BodyRoutes = document.querySelector('.CategoryBlock');
    BodyRoutes.classList.remove('blurr')
    // BodyRoutes.classList.add('nonblurr')

    const trandom = document.querySelector('.total-random-price');
    trandom.classList.remove('movefun')
    const bookService = document.querySelector('.bookService');
    bookService.classList.remove('movefun1')
    setBookServiceBtn(false)
  }

  async function ServiceBookingNext() {
    setBookServiceBtn(false)
    setBookServiceNextBtn(true)
  }
  async function ServiceBookingNextClose() {
    setBookServiceBtn(true)
    setBookServiceNextBtn(false)
  }

  let Razorpay_Service_Amount, Razorpay_Travel_Amount, Razorpay_Total_Amount, Payers_Name, Booking_Category;

  function checkOut({Payers_Name, Booking_Category, Razorpay_Service_Amount, Razorpay_Travel_Amount, Razorpay_Total_Amount}){
    const currentDate = new Date();
    const Booking_Date = currentDate.toLocaleDateString();
    const Booking_Time = currentDate.toLocaleTimeString();
    axios.post(`${URL}/mybooking`, {Booking_Category, Razorpay_Service_Amount, Razorpay_Travel_Amount, Razorpay_Total_Amount, Booking_Date, Booking_Time, UserSignupObjectID:UserSignupObjectID})
    // axios.post(`${URL}/booking/admin`, {Booking_Category, Razorpay_Service_Amount, Razorpay_Travel_Amount, Razorpay_Total_Amount, Booking_Date, Booking_Time, UserSignupObjectID:UserSignupObjectID})
    
    
    axios.post(`${URL}/payment/checkout`, {Payers_Name, Razorpay_Total_Amount})
    .then(function (response){
      let options = {
        "key": "rzp_test_YlsIMKyGXhS3ih",
        "amount": response.data.order.amount,
        "currency": "INR",
        "name": "Pro Work",
        "description": "Test Transaction",
        "image": ProWorkLogo,
        "order_id": "",
        "callback_url": `${URL}/payment/payment-verification`,
        "prefill": {
          "name": Name,
          "email": Email,
          "contact": UserSignupData,
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#052716"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open()

    })

  }
  return (
    <div id='Category' onLoad={CategoryPage}>
      <Helmet><title>Pro Work - Category</title></Helmet>

      {categoryList.map((item, index) =>{
        if(CategoryURL == item.URL){
          return(
            <div key={index} className="CategoryBlock">
              <h1 className='CategoryBlock-h1'><h1 className='CategoryBlock-h1h1'>Book Our Experienced {item.Category}</h1></h1>
              <div className='CategoryBlock-img-div'>
                <div className="CategoryBlock-img-div-inner">
                  <img className="CategoryBlock-img" src={item.image} alt="" />
                </div> 
              </div>

              <div className='service_final'>
                <label className='chooseTile' htmlFor=""> Choose a Service</label>
                <div className='service_final_block'>
                  <table className='service_table'>

                    <tbody>
                    <tr>
                      <th>Select</th>
                      <th className='Service'>Service</th>
                      <th className='price_Range'>Price range</th>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="service1" name='services' value={random} onClick={() =>(randomInteger((item.service_Price1_low), (item.service_Price1_high)))}/></td>
                      <td className='table_data'><label htmlFor="service1" onClick={() =>(randomInteger((item.service_Price1_low), (item.service_Price1_high)))}>{item.service1}</label></td>
                      <td className='price_Range_data'><h4>{item.service_Price1}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="service2" name='services' value={random} onClick={() =>(randomInteger((item.service_Price2_low), (item.service_Price2_high)))}/></td>
                      <td className='table_data'><label htmlFor="service2" onClick={() =>(randomInteger((item.service_Price2_low), (item.service_Price2_high)))}>{item.service2}</label></td>
                      <td className='price_Range_data'><h4>{item.service_Price2}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="service3" name='services' value={random}onClick={() =>(randomInteger((item.service_Price3_low), (item.service_Price3_high)))} /></td>
                      <td className='table_data'><label htmlFor="service3" onClick={() =>(randomInteger((item.service_Price3_low), (item.service_Price3_high)))}>{item.service3}</label></td>
                      <td className='price_Range_data'><h4>{item.service_Price3}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="service4" name='services' value={random} onClick={() =>(randomInteger((item.service_Price4_low), (item.service_Price4_high)))}/></td>
                      <td className='table_data'><label htmlFor="service4" onClick={() =>(randomInteger((item.service_Price4_low), (item.service_Price4_high)))}>{item.service4}</label></td>
                      <td className='price_Range_data'><h4>{item.service_Price4}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="service5" name='services' value={random} onClick={() =>(randomInteger((item.service_Price5_low), (item.service_Price5_high)))}/></td>
                      <td className='table_data'><label htmlFor="service5" onClick={() =>(randomInteger((item.service_Price5_low), (item.service_Price5_high)))}>{item.service5}</label></td>
                      <td className='price_Range_data'><h4>{item.service_Price5}</h4></td>
                    </tr>
                    </tbody>

                  </table>
                </div>           

                <button className='bookService' onClick={ServiceBooking}>Book Serivce</button>
                {random?(
                  <h4 className='total-random-price'>
                  <table>
                      <tbody>
                      <tr>
                        <td className='final-amount'>Total amount</td>
                        <td className='final-amount-price'>Rs.{random}.00</td>
                      </tr>
                      </tbody>
                    </table>
                  </h4>
                ):(
                  <h4 className='total-random-price'>
                    <table>
                      <tbody>
                      <tr>
                        <td className='final-amount'>Total amount</td>
                        <td className='final-amount-price'>Rs.000</td>
                      </tr>
                      </tbody>
                    </table>
                  </h4>)}
                
              </div>
            </div>
          )
        }
      })}

      {BookServiceBtn ? (
          
        <form className='bank-form' noValidate>
          <div className="bank-info">
            <h3><img src={next_icon} alt="" className='back-next' onClick={ServiceBookingClose}  /><span className='gray-wallet'>Service &nbsp;</span> /&nbsp; Confirm Address</h3>

            <div className='profile-label-input'>
              <label className='profile-label profile-label-category' htmlFor="currUserHouse">House Address</label> 
              {proxyEmail ? (
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

            <div className='profile-label-input'>
              <label className='profile-label profile-label-category' htmlFor="currUserLandmark">Landmark</label> 
              {proxyEmail ? (
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

            <div className='profile-label-input'>
              <label className='profile-label profile-label-category' htmlFor="currUserPin">Pin Code</label> 
              {proxyEmail ? (
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

            <div className='edit-block-div BDE-edit BDE-Per-Add'>
              {proxyEmail ? (
                <div className='edit-block-div BDE-edit BDE-Per-Add'>
                  {EditDetails.EditDetails ? (
                    <button onClick={(e) => HandleBankEdit(e)} className='withdraw-money final-money'>Update</button> 
                  ):(
                    <button /**onClick={DetailsEditing} */ className='Bank-details-edit BDE-full'>Edit Details </button>
                  )}
                </div>
              ):(
                <button onClick={(e) => HandleBankSave(e)} className='withdraw-money final-money'>Save</button>
              )}
    
            
            <button className='withdraw-money final-money category-space' onClick={ServiceBookingNext} type='button'>Next &nbsp; <div className='aarrow-doleft'></div></button>
          </div>
          </div>
        </form>
        
      ):("")}
      {BookServiceNextBtn ?(
        <div className='bank-form'>
          <div className="bank-info">
            <h3><img src={next_icon} alt="" className='back-next' onClick={ServiceBookingNextClose}  /><span className='gray-wallet'>Confirm Address &nbsp;</span> /&nbsp; Summary</h3>
            <div className="finalbookdes"><h3>Service man will reach your home between 2 - 4 hours</h3></div>
            <div className="includeonly gray-wallet"><h5>*Include Service charge only</h5></div>
            <div className='allSumary'>
              {categoryList.map((item, index) =>{
                if(CategoryURL == item.URL){
                return(
                  <div key={index} className="CategoryBlockx CategoryBlockSummary">
                    <div className="wiallsum"><h4>Booking:</h4><h4>{item.Category}</h4></div>
                    <div className="wiallsum"><h4>Your contact Number:</h4> <h4>{UserSignupData}</h4></div> 
                    <div className="wiallsum"><h4>Service Charge:</h4><h4>Rs.{random}.00</h4></div>
                    <div className="wiallsum wiallsumlasts"><h4>Travel Charge:</h4><h4>Rs.{item.Travel}.00</h4></div>
                    <div className="wiallsum"><h4>Total Amount:</h4><h4>Rs.{random+item.Travel}.00</h4></div>
                    <button className='withdraw-money final-money final-book'
                    onClick={()=>checkOut({
                      Razorpay_Service_Amount: random, 
                      Razorpay_Travel_Amount:item.Travel, 
                      Razorpay_Total_Amount: (random + item.Travel)*100,
                      Payers_Name: Name,  
                      Booking_Category: item.Category})}>
                    Book Now</button>
                  </div>          
                )
              }
            })}
          </div>
        </div>
        </div>
      ):("")}
    </div>
  )
}

export default Category