import Axios from "./connection";

export const getRegistryInteqalFiles = async () => {
  

    try {
      const response = await Axios.get('/allotmentForm/RegitryInteqal');
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

export const getRegistryInteqal = async (FileNo) => {
  

    try {
      const response = await Axios.get('/allotmentForm/registryInteqal/details' , 
      { 
        params : 
        {
            FileNo
        }
    });
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


export const updateRegistryInteqal = async (
                                            applicationNo,
                                            registry_Ineqal_Charges = null,
                                            Registry_Date = null,
                                            Registry_Number = null,
                                            Inteqal_Number = null,
                                            inteqal_date = null
                                    ) =>{
  try {
    
    await Axios.put('/allotmentForm/RegitryInteqal' , {
                                                        applicationNo,
                                                        registry_Ineqal_Charges,
                                                        Registry_Date,
                                                        Registry_Number,
                                                        Inteqal_Number,
                                                        inteqal_date
    })

    return true

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
                                    }