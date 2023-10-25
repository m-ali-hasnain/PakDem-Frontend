import Axios from "./connection";

export const getCashPayment = async (startDate = null) => {
    try {
      const response = await Axios.get('/CashPayment', { params: { startDate } });
      return response.data; // Return the response data
    } catch (error) {
     
    
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Not Authorized No Token.') {
          const errorMessage = error.response.data.message + ' Please Login First';
          alert(errorMessage);
          window.location.href = '/';
        } else if (error.response.data.message === 'UnAuthorized Token.') {
          const errorMessage = "You don't have access to this page.";
          alert(errorMessage);
          window.location.href = '/Home';
        } else {
          alert(error.response.data.message);
        }
      } else {
        alert("An error occurred. Please try again later.");
      }
      
      return null; // Return null in case of an error
    }
  };

  export const getCAPayment = async (startDate = null) => {
    try {
      const response = await Axios.get('/CAPayment', { params: { startDate} });
      return response.data; // Return the response data
    } catch (error) {
     
    
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Not Authorized No Token.') {
          const errorMessage = error.response.data.message + ' Please Login First';
          alert(errorMessage);
          window.location.href = '/';
        } else if (error.response.data.message === 'UnAuthorized Token.') {
          const errorMessage = "You don't have access to this page.";
          alert(errorMessage);
          window.location.href = '/Home';
        } else {
          alert(error.response.data.message);
        }
      } else {
        alert("An error occurred. Please try again later.");
      }
      
      return null; // Return null in case of an error
    }
  };

  export const getOnlinePayment = async (startDate = null) => {
    try {
      const response = await Axios.get('/OnlinePayment', { params: { startDate } });
      return response.data; // Return the response data
    } catch (error) {
     
    
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Not Authorized No Token.') {
          const errorMessage = error.response.data.message + ' Please Login First';
          alert(errorMessage);
          window.location.href = '/';
        } else if (error.response.data.message === 'UnAuthorized Token.') {
          const errorMessage = "You don't have access to this page.";
          alert(errorMessage);
          window.location.href = '/Home';
        } else {
          alert(error.response.data.message);
        }
      } else {
        alert("An error occurred. Please try again later.");
      }
      
      return null; // Return null in case of an error
    }
  };

  export const getPaymentSchedule = async ( userEnteredFileNo ) => {
    try {
      const response = await Axios.get('/PaymentSchedule', { params: { userEnteredFileNo } });
      return response.data; // Return the response data
    } catch (error) {
     
    console.log(error)
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Not Authorized No Token.') {
          const errorMessage = error.response.data.message + ' Please Login First';
          alert(errorMessage);
          window.location.href = '/';
        } else if (error.response.data.message === 'UnAuthorized Token.') {
          const errorMessage = "You don't have access to this page.";
          alert(errorMessage);
          window.location.href = '/Home';
        } else {
          alert(error.response.data.message);
        }
      }else if(error.response && error.response.status === 404){
        alert(error.response.data.message)
      } else {
        alert("Error Occured");
      }
      
      return null; // Return null in case of an error
    }
  };

  export const getFolder = async ( FileNo ) => {
    try {
      const response = await Axios.get('/allotmentForm/FileFolder', { params: { FileNo } });
      return response.data; 
    } catch (error) {
     
    
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Not Authorized No Token.') {
          const errorMessage = error.response.data.message + ' Please Login First';
          alert(errorMessage);
          window.location.href = '/';
        } else if (error.response.data.message === 'UnAuthorized Token.') {
          const errorMessage = "You don't have access to this page.";
          alert(errorMessage);
          window.location.href = '/Home';
        } else {
          alert(error.response.data.message);
        }
      } 
      
      else {
        alert("An error occurred. Please try again later.");
      }
      
      return null; // Return null in case of an error
    }
  };