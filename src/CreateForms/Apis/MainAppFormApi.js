import Axios from "./connection";

export const createMainAppForm = async (UserID,
                                        date = null,
                                        FileNo,
                                        FileType = null,
                                        Area  = null,
                                        PlotNo  = null,
                                        PlotID  = null,
                                        Phase  = null,
                                        Block = null,
                                        Total_Installment,
                                        PlotLocation = null,
                                        ApplicantName,
                                        FatherOrHusband,
                                        CNICNo = null,
                                        ContactNo = null,
                                        PermanentAddress,
                                        PostalAddress = null,
                                        Nok,
                                        NoKFatherName = null,
                                        NokSRelation = null,
                                        NoKAddress = null,
                                        Refrence = null,
                                        ModeOfPayment = null,
                                        InvestorAmount = null,
                                        InvestorDownPayment = null,
                                        TotalAmount,
                                        DownPayment,
                                        MonthlyInstallment  = null,
                                        InvestorMonthlyInstallment = null,
                                        CornerCharges = null,
                                        GrandTotal = null,
                                        AppRemarks = null,
                                        RefMobileNo = null,
                                        Agent = null,
                                        CommissionPercentage = null,
                                        NoteNo = null,
                                        IsActive = null,
                                        IsPlotCancel = null,
                                        IsCurrentWith = null,
                                        PlotCategory = null,
                                        Discount = null,
                                        PossesionStatus = null,
                                        SubAgent = null,
                                        SubAgentComm = null,
                                        Investor = null,
                                        Prepaired_By = null,
                                        Prepaired_by_Name = null,
                                        TransferAmount = null,
                                        TransferDate = null,
                                        DevelopmentChargesIncluded = null,
                                        DevelopmentAmount = null,
                                        DevelopmentChargesDate = null,
                                        UpdatedBy = null,
                                        RefundedStatus = null,
                                        RefundDate = null,
                                        DeductedAmount = null,
                                        InstallmentsForRefund = null,
                                        RefundAmount = null,
                                        ) => {
  

    try {
       await Axios.post('/allotmentForm/CreatemainForm' , 
        {
            UserID,
            date,
            FileNo,
            FileType,
            Area,
            PlotNo,
            PlotID,
            Phase,
            Block,
            Total_Installment,
            PlotLocation,
            ApplicantName,
            FatherOrHusband,
            CNICNo,
            ContactNo,
            PermanentAddress,
            PostalAddress,
            Nok,
            NoKFatherName,
            NokSRelation,
            NoKAddress,
            Refrence,
            ModeOfPayment,
            InvestorAmount,
            InvestorDownPayment,
            TotalAmount,
            DownPayment,
            MonthlyInstallment,
            InvestorMonthlyInstallment,
            CornerCharges,
            GrandTotal,
            AppRemarks,
            RefMobileNo,
            Agent,
            CommissionPercentage,
            NoteNo,
            IsActive,
            IsPlotCancel,
            IsCurrentWith,
            PlotCategory,
            Discount,
            PossesionStatus,
            SubAgent,
            SubAgentComm,
            Investor,
            Prepaired_By,
            Prepaired_by_Name,
            TransferAmount,
            TransferDate,
            DevelopmentChargesIncluded,
            DevelopmentAmount,
            DevelopmentChargesDate,
            UpdatedBy,
            RefundedStatus,
            RefundDate,
            DeductedAmount,
            InstallmentsForRefund,
            RefundAmount,
      });
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
      
      return false; // Return null in case of an error
    }
    
  };



  export const UpdateMainAppForm = async (
                                          UserID,
                                          ApplicationNo,
                                          date = null,
                                          FileNo,
                                          FileType = null,
                                          Area  = null,
                                          PlotNo  = null,
                                          PlotID  = null,
                                          Phase  = null,
                                          Block = null,
                                          Total_Installment,
                                          PlotLocation = null,
                                          ApplicantName,
                                          FatherOrHusband,
                                          CNICNo = null,
                                          ContactNo = null,
                                          PermanentAddress,
                                          PostalAddress = null,
                                          Nok,
                                          NoKFatherName = null,
                                          NokSRelation = null,
                                          NoKAddress = null,
                                          Refrence = null,
                                          ModeOfPayment = null,
                                          InvestorAmount = null,
                                          InvestorDownPayment = null,
                                          TotalAmount,
                                          DownPayment,
                                          MonthlyInstallment  = null,
                                          InvestorMonthlyInstallment = null,
                                          CornerCharges = null,
                                          GrandTotal = null,
                                          AppRemarks = null,
                                          RefMobileNo = null,
                                          Agent = null,
                                          CommissionPercentage = null,
                                          NoteNo = null,
                                          IsActive = null,
                                          IsPlotCancel = null,
                                          IsCurrentWith = null,
                                          PlotCategory = null,
                                          Discount = null,
                                          PossesionStatus = null,
                                          SubAgent = null,
                                          SubAgentComm = null,
                                          Investor = null,
                                          Prepaired_By = null,
                                          Prepaired_by_Name = null,
                                          TransferAmount = null,
                                          TransferDate = null,
                                          DevelopmentChargesIncluded = null,
                                          DevelopmentAmount = null,
                                          DevelopmentChargesDate = null,
                                          UpdatedBy = null,
                                          RefundedStatus = null,
                                          RefundDate = null,
                                          DeductedAmount = null,
                                          InstallmentsForRefund = null,
                                          RefundAmount = null,
                                          ) => {
        try {
            await Axios.put('allotmentForm/mainform/update' , 
                                                    {
                                                        UserID,
                                                        ApplicationNo,
                                                        date,
                                                        FileNo,
                                                        FileType,
                                                        Area,
                                                        PlotNo,
                                                        PlotID,
                                                        Phase,
                                                        Block,
                                                        Total_Installment,
                                                        PlotLocation,
                                                        ApplicantName,
                                                        FatherOrHusband,
                                                        CNICNo,
                                                        ContactNo,
                                                        PermanentAddress,
                                                        PostalAddress,
                                                        Nok,
                                                        NoKFatherName,
                                                        NokSRelation,
                                                        NoKAddress,
                                                        Refrence,
                                                        ModeOfPayment,
                                                        InvestorAmount,
                                                        InvestorDownPayment,
                                                        TotalAmount,
                                                        DownPayment,
                                                        MonthlyInstallment,
                                                        InvestorMonthlyInstallment,
                                                        CornerCharges,
                                                        GrandTotal,
                                                        AppRemarks,
                                                        RefMobileNo,
                                                        Agent,
                                                        CommissionPercentage,
                                                        NoteNo,
                                                        IsActive,
                                                        IsPlotCancel,
                                                        IsCurrentWith,
                                                        PlotCategory,
                                                        Discount,
                                                        PossesionStatus,
                                                        SubAgent,
                                                        SubAgentComm,
                                                        Investor,
                                                        Prepaired_By,
                                                        Prepaired_by_Name,
                                                        TransferAmount,
                                                        TransferDate,
                                                        DevelopmentChargesIncluded,
                                                        DevelopmentAmount,
                                                        DevelopmentChargesDate,
                                                        UpdatedBy,
                                                        RefundedStatus,
                                                        RefundDate,
                                                        DeductedAmount,
                                                        InstallmentsForRefund,
                                                        RefundAmount,
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

};


export const DeleteMainAppform = async ( UserID , applicationNo ) => {
  try {
    
    const response = await Axios.delete('/allotmentForm/mainform/delete' ,{ params : { UserID , applicationNo}});

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
    
    return null; 
  }
  }