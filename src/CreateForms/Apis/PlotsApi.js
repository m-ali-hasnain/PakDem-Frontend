import Axios from "./connection";

export const createPlot = async (
                                ProjectID = null,
                                PlotPrice = 1,
                                PlotNo = null ,
                                Plots = null ,
                                PlotSize = null,
                                Street = null,
                                Phase = null,
                                Block = null,
                                Category = null,
                                PlotLocation = null,
                                Amount = null,
                                PlotStatus = null,
                                sold = false
                                ) => {
    try {

        await Axios.post('/Plots/createPlot' ,  {
                                ProjectID,
                                PlotPrice,
                                PlotNo,
                                Plots,
                                PlotSize,
                                Street,
                                Phase,
                                Block,
                                Category,
                                PlotLocation,
                                Amount,
                                PlotStatus,
                                sold
                                }
                        )

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
          
          return false; 
        }  
                                }

export const createPlotPrice = async (
    PlotCategory = null,
    PlotSize = null,
    PlotPrice = null,
    MonthlyInstallment = null,
    TotalMonthlyInstallments = null,
    Extra15Percent = null
                                    ) => {
        try {
    
            await Axios.post('/plotprice/createPlotPrice' ,  {
                                            PlotCategory,
                                            PlotSize,
                                            PlotPrice,
                                            MonthlyInstallment,
                                            TotalMonthlyInstallments,
                                            Extra15Percent
                                    }
                            )
    
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
              
              return false; 
            }  
                                    }


export const createCacellationLetter = async( PlotID = null,
                                              CancellationDate = null,
                                              AmountNotPaid = null,
                                              ReasonForCancellation = null
                                              ) =>
  {
    try {
      await Axios.post('/PlotCancellationLetters/create' ,  {
        PlotID,
        CancellationDate,
        AmountNotPaid,
        ReasonForCancellation
          }
      )

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
        
        return false; 
      } 
                                    }

export const createAllotment = async(AllotmentDate = null, FileNo) =>
                                    {
                                      try {
                                        await Axios.post('/PlotAllotment/create' ,  {
                                          AllotmentDate,
                                          FileNo
                                            }
                                        )
                                  
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
                                          
                                          return false; 
                                        } 
                                                                      }


export const updatePlotPrice = async (
                                        PlotPriceID ,
                                        PlotCategory = null,
                                        PlotSize = null,
                                        PlotPrice = null,
                                        MonthlyInstallment = null,
                                        TotalMonthlyInstallments = null,
                                        Extra15Percent = null
                                                                        ) => {
    try {
                                        
        await Axios.put('/plotprice/update' ,  {
            PlotPriceID,
            PlotCategory,
            PlotSize,
            PlotPrice,
            MonthlyInstallment,
            TotalMonthlyInstallments,
            Extra15Percent
                                                            }
                 )
                                        
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
                                                  
                                                  return false; 
                                                }  
                                                                        }
                             

export const updatePlot = async (
                                    PlotID,
                                    ProjectID = null,
                                    PlotPrice = 1,
                                    PlotNo = null ,
                                    Plots = null ,
                                    PlotSize = null,
                                    Street = null,
                                    Phase = null,
                                    Block = null,
                                    Category = null,
                                    PlotLocation = null,
                                    Amount = null,
                                    PlotStatus = null,
                                    sold = false
                                    ) => {
        try {
    
            await Axios.put('/Plots/update' ,  {
                                    PlotID,
                                    ProjectID,
                                    PlotPrice,
                                    PlotNo,
                                    Plots,
                                    PlotSize,
                                    Street,
                                    Phase,
                                    Block,
                                    Category,
                                    PlotLocation,
                                    Amount,
                                    PlotStatus,
                                    sold
                                    }
                            )
    
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
              
              return false; 
            }  
                                    }

export const deletePlot = async(PlotID)=>{
    try {
        const response = await Axios.delete('/Plots/delete' ,{ params : { PlotID }});
        alert(response.data.message)
        if(response.data.success) {
        return true
        }
        else{
        return false
        }
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

export const deletePlotPrice = async(PlotPriceID)=>{
  try {
      const response = await Axios.delete('/plotprice/delete' ,{ params : { PlotPriceID }});
      alert(response.data.message)
      if(response.data.success) {
      return true
      }
      else{
      return false
      }
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

