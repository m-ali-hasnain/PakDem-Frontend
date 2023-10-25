import Axios from "./connection";

export const getExpenditures = async ( { startDate = null, endDate = null } ) => {
    try {
    const response = await Axios.get('/expenditure' , { params: {startDate , endDate}});
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

export const getdetails = async ( ExpenditureID  ) => {

    try {
      
    const response = await Axios.get('/expenditure/details' , { params: {ExpenditureID}});
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

