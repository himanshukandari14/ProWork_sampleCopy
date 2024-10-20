import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
export const MyContext = createContext(null);

const MyContextProvider = (props) =>{
    const URL = 'http://localhost:1500';
    const AdminURL = 'http://localhost:5001'

    const [LoginFirst, setLoginFirst,] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [HouseAddress, setHouseAddress] = useState("")
    const [Landmark, setLandmark] = useState("")
    const [PinCode, setPinCode] = useState("")

    const [AccountHolderName, setAccountHolderName] = useState("")
    const [BankName, setBankName] = useState("")
    const [AccountNumber, setAccountNumber] = useState("")
    const [AccountIFSC_code, setAccountIFSC_code] = useState("")
    const [WithdrawAmount, setWithdrawAmount] = useState("")


    const [proxyAccountNumber, setProxyAccountNumber] = useState("");
    const [proxyEmail, setProxyEmail] = useState("");
    const [proxyHouseAddress, setProxyHouseAddress] = useState("");
    const [error, setErrors] = useState({})

    const [User_Balance, setUser_Balance] = useState(0.00)
    const [OTP, setOTP] = useState(true)
    const [OTP_Value, setOTP_Value] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [WhatsAppNumber, setWhatsAppNumber] = useState("")
    const [rrr, setrrr] = useState(false)

    const [UserSignupObjectID ,setUserSignupObjectID] = useState('');
    const [UserSignupData ,setUserSignupData] = useState('');
    const [RegisterW, setRegisterW] = useState(false);


    const [SessionID, setSessionID, removeSessionID] = useCookies(['SessionID'])
    const [EditDetails, setEditDetails, removeEditDetails] = useCookies(['EditDetails'])
    

    const contextValue = {
        URL,
        AdminURL,

        Name, setName,
        Email, setEmail,
        HouseAddress, setHouseAddress,
        Landmark, setLandmark,
        PinCode, setPinCode,
        rrr, setrrr,
        LoginFirst, setLoginFirst,
        AccountHolderName, setAccountHolderName,
        BankName, setBankName,
        AccountNumber, setAccountNumber,
        AccountIFSC_code, setAccountIFSC_code,
        WithdrawAmount, setWithdrawAmount,

        proxyAccountNumber, setProxyAccountNumber,
        proxyEmail, setProxyEmail,  
        proxyHouseAddress, setProxyHouseAddress,
        error, setErrors,      

        OTP, setOTP,
        OTP_Value, setOTP_Value,
        PhoneNumber, setPhoneNumber,
        WhatsAppNumber, setWhatsAppNumber,

        UserSignupObjectID ,setUserSignupObjectID,
        UserSignupData ,setUserSignupData,

        User_Balance, setUser_Balance,
        RegisterW, setRegisterW,

        SessionID, setSessionID, removeSessionID,
        EditDetails, setEditDetails, removeEditDetails
    }

    return(
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}
export default MyContextProvider;
