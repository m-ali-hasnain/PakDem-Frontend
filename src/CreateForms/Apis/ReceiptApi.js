import Axios from "./connection";

export const createReceipt = async(UserID,
                                    FileNo,
                                    date = null,
                                    ReceivedAmount ,
                                    ReceivedDifferenceAmount = null,
                                    ReceivedFrom = null,
                                    Amount_For_The_Month_Of = null,
                                    AmountReceivedForPlot = '1',
                                    ModeOfPayment,
                                    Receipt,
                                    Phase = null,
                                    Block = null,
                                    Plot_No = null,
                                    Prepaired_By ,
                                    Prepaired_by_Name,
                                    Remarks = null,
                                    Balancamount = null,
                                    ReceiptCatgory = null,
                                    ReceiptStatus = null,
                                    NextDueDate = null,
                                    AgentID = null,
                                    AgentName = null,
                                    CommAmount = null,
                                    CommRemarks = null,
                                    ReceiptType ,
                                    Online_Method = null,
                                    Method_ID = null
                                    ) => {

     try {
        await Axios.post('/receipt/createReceipt' , 
                                             {
                                    UserID,
                                    FileNo,
                                    date  ,
                                    ReceivedAmount ,
                                    ReceivedDifferenceAmount  ,
                                    ReceivedFrom ,
                                    Amount_For_The_Month_Of  ,
                                    AmountReceivedForPlot ,
                                    ModeOfPayment,
                                    Receipt,
                                    Phase ,
                                    Block   ,
                                    Plot_No     ,
                                    Prepaired_By ,
                                    Prepaired_by_Name,
                                    Remarks     ,
                                    Balancamount    ,
                                    ReceiptCatgory  ,
                                    ReceiptStatus  ,
                                    NextDueDate  ,
                                    AgentID  ,
                                    AgentName ,
                                    CommAmount,
                                    CommRemarks ,
                                    ReceiptType ,
                                    Online_Method,
                                    Method_ID
                                           });
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
                                           
                                           return false; // Return null in case of an error
                                         }                    
                                    }

export const updateReceipt = async(
                                        UserID,
                                        receiptId,
                                        ReceiptNo,
                                        FileNo,
                                        date = null,
                                        ReceivedAmount ,
                                        ReceivedDifferenceAmount = null,
                                        ReceivedFrom = null,
                                        Amount_For_The_Month_Of = null,
                                        AmountReceivedForPlot = '1',
                                        ModeOfPayment,
                                        Receipt,
                                        Phase = null,
                                        Block = null,
                                        Plot_No = null,
                                        Prepaired_By ,
                                        Prepaired_by_Name,
                                        Remarks = null,
                                        Balancamount = null,
                                        ReceiptCatgory = null,
                                        ReceiptStatus = null,
                                        NextDueDate = null,
                                        AgentID = null,
                                        AgentName = null,
                                        CommAmount = null,
                                        CommRemarks = null,
                                        ReceiptType 
                                        ) => {
    
         try {
            await Axios.put('/receipt/update' , 
                                                 {
                                                    UserID,
                                                    receiptId,
                                                    ReceiptNo,
                                                    FileNo,
                                                    date,
                                                    ReceivedAmount,
                                                    ReceivedDifferenceAmount,
                                                    ReceivedFrom,
                                                    Amount_For_The_Month_Of,
                                                    AmountReceivedForPlot,
                                                    ModeOfPayment,
                                                    Phase,
                                                    Block,
                                                    Plot_No,
                                                    Prepaired_By,
                                                    Prepaired_by_Name,
                                                    Remarks,
                                                    Balancamount,
                                                    ReceiptCatgory,
                                                    ReceiptStatus,
                                                    NextDueDate,
                                                    AgentID,
                                                    AgentName,
                                                    CommAmount,
                                                    CommRemarks,
                                                    ReceiptType, 
                                               });
            return true; 
                                             } 
    catch (error) {
                                                
                                               
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
                    