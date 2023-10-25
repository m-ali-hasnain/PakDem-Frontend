import Axios from "./connection";

export const getTransferFiles = async () => {
  

    try {
      const response = await Axios.get('/allotmentForm/TransferFile');
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

export const getTransferFile = async (FileNo) => {
  

    try {
      const response = await Axios.get('/allotmentForm/transfer/details' , 
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


export const updateTransfer = async (
                                    applicationNo,
                                    ApplicantName,
                                    FatherOrHusband ,
                                    CNICNo = null,
                                    ContactNo = null,
                                    Nok,
                                    NokSRelation = null,
                                    TransferAmount,
                                    TransferDate
                                    ) =>{
  try {
    
    await Axios.put('/allotmentForm/TransferFile' , {
                                                    applicationNo,
                                                    ApplicantName,
                                                    FatherOrHusband,
                                                    CNICNo,
                                                    ContactNo,
                                                    Nok,
                                                    NokSRelation,
                                                    TransferAmount,
                                                    TransferDate,
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

export const getrefundFile = async (FileNo) => {
  

         try {
              const response = await Axios.get('/allotmentForm/refundfile/details' , 
                        { 
                                          params : 
                                          {
                                              FileNo
                                          }
                                      });
                        console.log(response.data)
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