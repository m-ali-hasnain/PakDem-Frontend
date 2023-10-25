import Axios from "./connection";


export const createExpenditure = async(
                                        ExpenseMainHead = null,
                                        ExpenseSubHead = null,
                                        ExpenseNature = null,
                                        ExpDate = null,
                                        Amount = null,
                                        Remarks = null,
                                        ExpenditureNature = null,
                                        PVNo = null,
                                        ModeOfPayment = null,
                                        ToPayee = null,
                                        PayeeCNICNo = null,
                                        MobileNo = null,
                                    ) => {
    try {

        await Axios.post('/expenditure/createExpenditure' , {
                                                            ExpenseMainHead,
                                                            ExpenseSubHead,
                                                            ExpenseNature,
                                                            ExpDate,
                                                            Amount,
                                                            Remarks,
                                                            ExpenditureNature,
                                                            PVNo,
                                                            ModeOfPayment,
                                                            ToPayee,
                                                            PayeeCNICNo,
                                                            MobileNo,
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