import axios from './axios';

import Iconify from '../components/Iconify';

export const sayhello = ()=>{ console.log('Funcs Loaded!');}





// My Axios Connection
export const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

  export const submitKYCData = async (fd) => {
    
    // Send the Request
    http.defaults.withCredentials = true;
    try {
      await http.get('/sanctum/csrf-cookie');
      // Register POST REQUEST
      const response = await http.post('/api/kyc/upload', fd);
      return response.data;
    } catch (error) {
      return {error:error};
    }
  }

 
  export const loadScript = (src) => {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.body.appendChild(tag);
    // document.body.removeChild(tag);
  }

// Get Transaction Type Text
export const transName = (param)=> {
  switch(param){
    case "1":
          return "Deposit";
        break;
    case "2":
        return "Acc. Activation";
      break;
    case "3":
        return "Investment";
      break;
    case "4":
        return "Pledge Donations";
      break;
    case "5":
        return "Admin Top Up";
      break;
    case "6":
        return "Inv. Return";
      break;
    case "7":
        return "Referral Bonus";
      break;
    case "8":
        return "BV Bonus";
      break;
    case "9":
        return "Pledge Received";
      break;
    case "10":
        return "Received Fund";
        break;
    case "11":
        return "Withdrawal";
      break;
    case "12":
        return "Admin Sub. Fund";
      break;
    case "13":
        return "N/A";
      break;
    case "14":
        return "N/A";
      break;
    case "15":
        return "N/A";
      break;
    case "16":
        return "N/A";
      break;
    case "17":
        return "N/A";
      break;
    case "18":
        return "N/A";
      break;
    case "19":
        return "Pledge Sent";
      break;
    case "20":
          return "Transferred Fund";
        break;
    case "25":
      return "POP Confirmed";
    break;
    case "26":
      return "Donation Cycle Complete";
    break;
    case "61":
      return "Support Replied";
    break;
    case "71":
      return "Private Message";
    break;
    default:
          return "N/A";

  }

}

// Get Transaction URL Text
export const transURL = (param)=> {
  switch(param){
    case "1":
          return "deposit";
        break;
    case "2":
        return "#";
      break;
    case "3":
        return "investments";
      break;
    case "4":
        return "donation/transactions";
      break;
    case "5":
        return "transactions";
      break;
    case "6":
        return "transactions";
      break;
    case "7":
        return "transactions";
      break;
    case "8":
        return "transactions";
      break;
    case "9":
        return "transactions";
      break;
    case "10":
        return "transactions";
        break;
    case "11":
        return "transactions";
      break;
    case "12":
        return "transactions";
      break;
    case "13":
        return "transactions";
      break;
    case "14":
        return "transactions";
      break;
    case "15":
        return "N/A";
      break;
    case "16":
        return "N/A";
      break;
    case "17":
        return "transactions";
      break;
    case "18":
        return "transactions";
      break;
    case "19":
        return "donation/transactions";
      break;
    case "20":
          return "transactions";
        break;
    case "25":
      return "#";
    break;
    case "26":
      return "donation/transactions";
    break;
    case "61":
      return "support";
    break;
    case "71":
      return "messages";
    break;
    default:
          return "donation/transactions";

  }

}

// Get KYC Type Text
export const kycName = (param)=> {
  switch(param){
    case "1":
          return "International Passport";
        break;
    case "2":
        return "National ID";
      break;
    case "3":
        return "Drivers License";
      break;
    default:
          return "N/A";

  }

}

// Get Transaction Type Text
export const transPointer = (param)=> {
  if(param > 0 && param <= 10){
      return <Iconify icon="akar-icons:arrow-forward-thick-fill" width={24} height={24} color="green" />;
  }else if(param >10 && param <21){
    return <Iconify icon="akar-icons:arrow-back-thick-fill" width={24} height={24} color="red" />;
  } else {
    return <Iconify icon="akar-icons:arrow-forward-thick-fill" width={24} height={24} color="green" />;
  }
}

// Get Notification Icon Type
export const notifPointer = (param)=> {
  if(param > 0 && param <= 10){
      return <Iconify icon="akar-icons:arrow-forward-thick-fill" width={24} height={24} color="green" />;
  }else if(param >10 && param <21){
    return <Iconify icon="akar-icons:arrow-back-thick-fill" width={24} height={24} color="red" />;
  } else {
    return <Iconify icon="akar-icons:arrow-forward-thick-fill" width={24} height={24} color="green" />;
  }
}

// Let's Write and Empty Checker Function
export const isEmpty = (str) => {
    return (!str || str.length === 0 );
}


// Let's convert JSON to FormData

export const convertJsonToFormData = (data) => {
    const formData = new FormData()
    const entries = Object.entries(data) // returns array of object property as [key, value]
    // https://medium.com/front-end-weekly/3-things-you-didnt-know-about-the-foreach-loop-in-js-ff02cec465b1

    for (let i = 0; i < entries.length; i++) {
      // don't try to be smart by replacing it with entries.each, it has drawbacks
      const arKey = entries[i][0]
      let arVal = entries[i][1]
      if (typeof arVal === 'boolean') {
        arVal = arVal === true ? 1 : 0
      }
      if (Array.isArray(arVal)) {
        console.log('displaying arKey')
        console.log(arKey)
        console.log('displaying arval')
        console.log(arVal)

        if (this.isFile(arVal[0])) {
          for (let z = 0; z < arVal.length; z++) {
            formData.append(`${arKey}[]`, arVal[z])
          }

          continue // we don't need to append current element now, as its elements already appended
        } else if (arVal[0] instanceof Object) {
          for (let j = 0; j < arVal.length; j++) {
            if (arVal[j] instanceof Object) {
              // if first element is not file, we know its not files array
              for (const prop in arVal[j]) {
                if (Object.prototype.hasOwnProperty.call(arVal[j], prop)) {
                  // do stuff
                  if (!isNaN(Date.parse(arVal[j][prop]))) {
                    // console.log('Valid Date \n')
                    // (new Date(fromDate)).toUTCString()
                    formData.append(
                      `${arKey}[${j}][${prop}]`,
                      new Date(arVal[j][prop])
                    )
                  } else {
                    formData.append(`${arKey}[${j}][${prop}]`, arVal[j][prop])
                  }
                }
              }
            }
          }
          continue // we don't need to append current element now, as its elements already appended
        } else {
          arVal = JSON.stringify(arVal)
        }
      }

      if (arVal === null) {
        continue
      }
      formData.append(arKey, arVal)
    }
    return formData
  }


export default sayhello;