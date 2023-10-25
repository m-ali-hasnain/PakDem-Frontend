import Axios from "./connection";


export const registerInvestor = async(
                                    RegistrationDate = null,
                                    Name = null,
                                    CNICNo = null,
                                    SpouseName = null,
                                    CompanyName = null,
                                    CompanyAddress = null,
                                    OfficeNo = null,
                                    ContactNo = null,
                                    Email = null,
                                    RegistrationAs = 2,
                                    UserName = null,
                                    Password = null
                                    ) => {
    try {

        await Axios.post('/RegistrationOfInvestor/createRegistration' , {
                                                        RegistrationDate,
                                                        Name,
                                                        CNICNo,
                                                        SpouseName,
                                                        CompanyName,
                                                        CompanyAddress,
                                                        OfficeNo,
                                                        ContactNo,
                                                        Email,
                                                        RegistrationAs,
                                                        UserName,
                                                        Password,
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


export const registerAgent = async(
                                    RegistrationDate = null ,
                                    AgentName = null,
                                    AgentCNICNo  = null,
                                    AgentFatherName = null,
                                    CompanyName = null,
                                    CompanyAddress = null,
                                    OfficeNo = null,
                                    Phone = null,
                                    Email = null,
                                    CommissionPercentage = null,
                                    DownPaymentCommission = null,
                                    InstallmentCommission = null,
                                    OpeningBalance = null,
                                    OpeningBalanceDate = null
                                    ) => {
try {

    await Axios.post('/Agents/createAgent' , {
                                                RegistrationDate,
                                                AgentName,
                                                AgentCNICNo,
                                                AgentFatherName,
                                                CompanyName,
                                                CompanyAddress,
                                                OfficeNo,
                                                Phone,
                                                Email,
                                                CommissionPercentage,
                                                DownPaymentCommission,
                                                InstallmentCommission,
                                                OpeningBalance,
                                                OpeningBalanceDate
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