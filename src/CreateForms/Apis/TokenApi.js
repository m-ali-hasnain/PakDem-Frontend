import Axios from "./connection";

export const createToken = async(
                                        FileNo,
                                        Total_Installment = 0,
                                        ApplicantName = "not mentioned",
                                        FatherOrHusband = "not mentioned",
                                        CNICNo =  "not mentioned",
                                        ContactNo = "not mentioned",
                                        PermanentAddress = "not mentioned",
                                        Nok = "not mentioned",
                                        TotalAmount = 0,
                                        ReceivedAmount = 0,
                                        AmountReceivedForPlot =  "not mentioned",
                                        ModeOfPayment = "not mentioned",
                                        Prepaired_By = "not mentioned",
                                        Prepaired_by_Name = "not mentioned",
                                        Remarks = "no remarks",

) =>
{
    try {
        await Axios.post('/allotmentForm/CreateTokenMoney' ,  {
                FileNo,Total_Installment,ApplicantName,FatherOrHusband,
                CNICNo,ContactNo,PermanentAddress,Nok,TotalAmount,ReceivedAmount,
                AmountReceivedForPlot,ModeOfPayment,Prepaired_By,Prepaired_by_Name,
                Remarks,
                                            }
                                        )

                                        return true;
                        
                                      } catch (error) {
                                        if (error.response && error.response.status === 400) {
                                            if (error.response.data.message === 'File number already exists') {
                                              alert('File number already exists');
                                            } else {
                                              alert(error.response.data.message);
                                            }
                                          } else if (error.response && error.response.status === 401) {
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