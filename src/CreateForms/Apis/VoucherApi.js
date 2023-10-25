import Axios from "./connection";


export const createVoucher = async(
                                    FileNo,
                                    VoucherDate = null,
                                    Agent = null,
                                    Amount = null,
                                    Description = null,
                                    CommissionPercentage = null,
                                    CommissionType = null,
                                    BBF = null,
                                    VoucherNo = null,
                                    ) => {
    try {

        await Axios.post('/AgentVouchers/createVoucher' , {
                                                            FileNo,
                                                            VoucherDate,
                                                            Agent,
                                                            Amount,
                                                            Description,
                                                            CommissionPercentage,
                                                            CommissionType,
                                                            BBF,
                                                            VoucherNo,
                                                          })

      return true;
        
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
          
          return false; 
        }                    
                                    
}