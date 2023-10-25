import Axios from "./connection";



export const getMainAppFormDetails = async () => {
  

  try {
    const response = await Axios.get('/allotmentForm/mainform/Files');
    
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

export const getMainAppForms = async () => {
  

  try {
    const response = await Axios.get('/allotmentForm/mainform');
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

export const getTokenMoney = async () => {
  

  try {
    const response = await Axios.get('/allotmentForm/TokenMoney');
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

export const getCashFiles = async () => {
  

  try {
    const response = await Axios.get('/allotmentForm/Cashmainform');
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
    } else {
      alert("An error occurred. Please try again later.");
    }
    
    return null; // Return null in case of an error
  }
  
};

export const getInstallmentFiles = async () => {
  

  try {
    const response = await Axios.get('/allotmentForm/installmentFiles');
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
    } else {
      alert("An error occurred. Please try again later.");
    }
    
    return null; // Return null in case of an error
  }
  
};


export const getSingleDetails = async (ApplicationNo) => {
  try {
    
    const response = await Axios.get('/allotmentForm/mainform/details' , {
                                      params: { ApplicationNo },
                                     });

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

export const getApplicationFormRecord = async (selectedFileNos) => {
  try {
    const response = await Axios.get('/allotmentForm/mainform/Files' , {
                                      params: { selectedFileNos },
                                     });

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