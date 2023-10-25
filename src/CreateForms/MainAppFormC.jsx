import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CreateIcon from '@mui/icons-material/Create';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import { useEffect } from "react";
import AgentSelectorID from '../Components/AgentSelectorID';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { createMainAppForm , UpdateMainAppForm } from './Apis/MainAppFormApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateMainAppForm() {
  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()
  const [user, setUser] = React.useState('')


  


  const initialValues = data === undefined ?  {
    Date: null,
    FileNo: null,
    ApplicantName: null,
    Total_Installment: null,
    FatherOrHusband: null,
    PermanentAddress: null,
    Nok : null,
    TotalAmount : null,
    DownPayment : null,
    FileType : null,
    Area : null,
    PlotNo : null,
    PlotID : null,
    Phase : "",
    Block : "",
    PlotLocation : "",
    CNICNo : "",
    ContactNo : "",
    PermanentAddress : "",
    PostalAddress  : "",
    NoKFatherName : "",
    NokSRelation : "",
    NoKAddress : "",
    Refrence : "",
    ModeOfPayment : "",
    InvestorAmount : null,
    InvestorDownPayment : null,
    MonthlyInstallment : null,
    InvestorMonthlyInstallment : null,
    CornerCharges : null,
    GrandTotal : null,
    AppRemarks : "",
    RefMobileNo : "",
    Agent : "",
    CommissionPercentage : null,
    NoteNo : "",
    IsActive : true,
    IsPlotCancel : "",
    IsCurrentWith : false,
    PlotCategory : "",
    Discount : 0,
    PossesionStatus : false,
    SubAgent : null,
    SubAgentComm : null,
    Investor : null,
    Prepaired_By : 1,
    Prepaired_by_Name : "",
    DevelopmentChargesIncluded : false,
    DevelopmentAmount : null,
    DevelopmentChargesDate : null
  } :
  {
    Date:  null,
    FileNo: data.FileNo ,
    ApplicantName: data.ApplicantName,
    Total_Installment: data.Total_Installment,
    FatherOrHusband: data.FatherOrHusband,
    PermanentAddress: data.PermanentAddress,
    Nok : data.Nok,
    TotalAmount : data.TotalAmount,
    DownPayment : data.DownPayment,
    FileType : data.FileType,
    Area : data.Area,
    PlotNo : data.PlotNo,
    PlotID : data.PlotID,
    Phase : data.Phase,
    Block : data.Block,
    PlotLocation : data.PlotLocation,
    CNICNo : data.CNICNo,
    ContactNo : data.ContactNo,
    PermanentAddress : data.PermanentAddress,
    PostalAddress  : data.PostalAddress,
    NoKFatherName : data.NoKFatherName,
    NokSRelation : data.NokSRelation,
    NoKAddress : data.NoKAddress,
    Refrence : data.Refrence,
    ModeOfPayment : data.ModeOfPayment,
    InvestorAmount : data.InvestorAmount,
    InvestorDownPayment : data.InvestorDownPayment,
    MonthlyInstallment : data.MonthlyInstallment,
    InvestorMonthlyInstallment : data.InvestorMonthlyInstallment,
    CornerCharges : data.CornerCharges,
    GrandTotal : data.GrandTotal,
    AppRemarks : data.AppRemarks,
    RefMobileNo : data.RefMobileNo,
    Agent : data.Agent,
    CommissionPercentage : data.CommissionPercentage,
    NoteNo : data.NoteNo,
    IsActive : data.IsActive,
    IsPlotCancel : data.IsPlotCancel,
    IsCurrentWith : data.IsCurrentWith,
    PlotCategory : data.PlotCategory,
    Discount : data.Discount,
    PossesionStatus : data.PossesionStatus,
    SubAgent : data.SubAgent,
    SubAgentComm : data.SubAgentComm,
    Investor : data.Investor,
    Prepaired_By : data.Prepaired_By,
    Prepaired_by_Name : data.Prepaired_by_Name,
    DevelopmentChargesIncluded : data.DevelopmentChargesIncluded,
    DevelopmentAmount : data.DevelopmentAmount,
    DevelopmentChargesDate : null
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        FileNo: Yup.string().required("File No is required"),
        ApplicantName: Yup.string().required("Please Enter the ApplicantName"),
        Total_Installment: Yup.number().required("Total Installments is required!"),
        PermanentAddress: Yup.string().required("Permanent Address is required required!"),
        FatherOrHusband: Yup.string().required("Please Enter the Father or Husband Name"),
        Nok: Yup.string().required("Please Enter the Nok"),
        TotalAmount: Yup.number().required("Total Amount is required!"),
        DownPayment: Yup.number().required("Down Payment is required!"),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });

 


  const handleClick = async () => {
    

    if(values.DevelopmentAmount ){
     
      values.DevelopmentChargesIncluded = true
    }
    const UpdatedBy = null
    const RefundedStatus = null
    const RefundDate = null
    const DeductedAmount = null
    const InstallmentsForRefund = null
    const RefundAmount = null

    

    const UserID = localStorage.getItem("UserID")

  
      
      if (
         values.FileNo &&
        values.ApplicantName && values.Total_Installment &&
        values.PermanentAddress && values.FatherOrHusband &&
        values.TotalAmount && values.DownPayment 
        ) { 
  
            
        if(data) {
          const submission = await UpdateMainAppForm(
            UserID ,
            data.ApplicationNo, 
            values.Date , 
            values.FileNo,
            values.FileType,
            values.Area,
            values.PlotNo,
            values.PlotID,
            values.Phase,
            values.Block,
            values.Total_Installment,
            values.PlotLocation,
            values.ApplicantName,
            values.FatherOrHusband,
            values.CNICNo,
            values.ContactNo,
            values.PermanentAddress,
            values.PostalAddress,
            values.Nok,
            values.NoKFatherName,
            values.NokSRelation,
            values.NoKAddress,
            values.Refrence,
            values.ModeOfPayment,
            values.InvestorAmount,
            values.InvestorDownPayment,
            values.TotalAmount,
            values.DownPayment,
            values.MonthlyInstallment,
            values.InvestorMonthlyInstallment,
            values.CornerCharges,
            values.GrandTotal,
            values.AppRemarks,
            values.RefMobileNo,
            values.Agent,
            values.CommissionPercentage,
            values.NoteNo,
            values.IsActive,
            values.IsPlotCancel,
            values.IsCurrentWith,
            values.PlotCategory,
            values.Discount,
            values.PossesionStatus,
            values.SubAgent,
            values.SubAgentComm,
            values.Investor,
            values.Prepaired_By,
            values.Prepaired_by_Name,
            values.TransferAmount,
            values.TransferDate,
            values.DevelopmentChargesIncluded,
            values.DevelopmentAmount,
            values.DevelopmentChargesDate,
            UpdatedBy,
            RefundedStatus,
            RefundDate,
            DeductedAmount,
            InstallmentsForRefund,
            RefundAmount
            )
            
            if(submission) {
            alert('Application Form Updated')
            navigate(`/MainAppFormDetails/${data.ApplicationNo}`);
            }
            else{
            alert('Please Retry')
            }
        }
        else {
            
          const submission = await createMainAppForm(
                                                    UserID , 
                                                    values.Date , 
                                                    values.FileNo,
                                                    values.FileType,
                                                    values.Area,
                                                    values.PlotNo,
                                                    values.PlotID,
                                                    values.Phase,
                                                    values.Block,
                                                    values.Total_Installment,
                                                    values.PlotLocation,
                                                    values.ApplicantName,
                                                    values.FatherOrHusband,
                                                    values.CNICNo,
                                                    values.ContactNo,
                                                    values.PermanentAddress,
                                                    values.PostalAddress,
                                                    values.Nok,
                                                    values.NoKFatherName,
                                                    values.NokSRelation,
                                                    values.NoKAddress,
                                                    values.Refrence,
                                                    values.ModeOfPayment,
                                                    values.InvestorAmount,
                                                    values.InvestorDownPayment,
                                                    values.TotalAmount,
                                                    values.DownPayment,
                                                    values.MonthlyInstallment,
                                                    values.InvestorMonthlyInstallment,
                                                    values.CornerCharges,
                                                    values.GrandTotal,
                                                    values.AppRemarks,
                                                    values.RefMobileNo,
                                                    values.Agent,
                                                    values.CommissionPercentage,
                                                    values.NoteNo,
                                                    values.IsActive,
                                                    values.IsPlotCancel,
                                                    values.IsCurrentWith,
                                                    values.PlotCategory,
                                                    values.Discount,
                                                    values.PossesionStatus,
                                                    values.SubAgent,
                                                    values.SubAgentComm,
                                                    values.Investor,
                                                    values.Prepaired_By,
                                                    values.Prepaired_by_Name,
                                                    values.TransferAmount,
                                                    values.TransferDate,
                                                    values.DevelopmentChargesIncluded,
                                                    values.DevelopmentAmount,
                                                    values.DevelopmentChargesDate,
                                                    UpdatedBy,
                                                    RefundedStatus,
                                                    RefundDate,
                                                    DeductedAmount,
                                                    InstallmentsForRefund,
                                                    RefundAmount
                                                    )
          
            if(submission) {
              alert('Application Form created')
              navigate('/MainAppForm')
            }
            
       }
    }
      
      else{
        alert("Please fill required fields")
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '4%' , 
              paddingTop : { lg: '4%', md: '6%', sm: '8%', xs: '6%' }
     }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>{data ? "Edit " : "Create "} Main Application Form</Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>
        
        <Grid item lg={12} md={12} sm={12} xs={12}
          
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <Box>
                    <DatePicker
                      name='Date'
                      id="Date"
                      value={values.Date}
                      onChange={(value) => setFieldValue("Date", value, true)}
                      onBlur={handleBlur}
                      label="Date *" />
                  </Box>
                </Box>
                
                
              </DemoContainer>
            </LocalizationProvider>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="File No *"
                color='secondary'
                name='FileNo'
                value={values.FileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.FileNo && touched.FileNo ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.FileNo}</p>
              ) : null}
          </Grid>
          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >File Type</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="File Type"
                color='secondary'
                name='FileType'
                value={values.FileType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"General File"}>General File</MenuItem>
                <MenuItem value={"Deal File"}>Deal File</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Applicant Name *"
              color='secondary'
              name='ApplicantName'
              value={values.ApplicantName}
              onChange={handleChange}
              onBlur={handleBlur}

            />{errors.ApplicantName && touched.ApplicantName ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.ApplicantName}</p>
            ) : null}
 
            </Grid>

            

            <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Father Or Husband *"
              color='secondary'
              multiline
              name='FatherOrHusband'
              value={values.FatherOrHusband}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.FatherOrHusband && touched.FatherOrHusband ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.FatherOrHusband}</p>
            ) : null}
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="CNIC No"
                color='secondary'
                name='CNICNo'
                value={values.CNICNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>


          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Phone No"
                color='secondary'
                name='ContactNo'
                value={values.ContactNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Nok *"
                color='secondary'
                name='Nok'
                value={values.Nok}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.Nok && touched.Nok ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Nok}</p>
              ) : null}
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Relation to Nok"
                color='secondary'
                name='NokSRelation'
                value={values.NokSRelation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Postal Address"
                color='secondary'
                name='PostalAddress'
                value={values.PostalAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Permanent Address *"
              color='secondary'
              multiline
              name='PermanentAddress'
              value={values.PermanentAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.PermanentAddress && touched.PermanentAddress ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.PermanentAddress}</p>
            ) : null}
            </Grid>
          

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Phase"
                color='secondary'
                name='Phase'
                value={values.Phase}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Block"
                color='secondary'
                name='Block'
                value={values.Block}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>
          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Plot Location</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Plot Location"
                color='secondary'
                name='PlotLocation'
                value={values.PlotLocation}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"Corner"}>Corner</MenuItem>
                <MenuItem value={"Main Road"}>Main Road</MenuItem>
                <MenuItem value={"Main Road Corner"}>Main Road Corner</MenuItem>
                <MenuItem value={"Park View"}>Park View</MenuItem>
                <MenuItem value={"Park View Corner"}>Park View Corner</MenuItem>
              </Select>
          </FormControl>
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Plot Category</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Plot Category"
                color='secondary'
                name='PlotCategory'
                value={values.PlotCategory}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Residential"}>Residential</MenuItem>
                <MenuItem value={"Commercial"}>Commercial</MenuItem>
                <MenuItem value={"Mini Commercial"}>Mini Commercial</MenuItem>
              </Select>
          </FormControl>

          </Grid>


          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Plot Size"
                color='secondary'
                name='Area'
                value={values.Area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>


          

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Plot No"
                color='secondary'
                name='PlotNo'
                value={values.PlotNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>


          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Corner Charges"
                color='secondary'
                name='CornerCharges'
                value={values.CornerCharges}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Total Amount *"
                color='secondary'
                name='TotalAmount'
                value={values.TotalAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.TotalAmount && touched.TotalAmount ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.TotalAmount}</p>
              ) : null}
          </Grid>


          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Down Payment *"
                color='secondary'
                name='DownPayment'
                value={values.DownPayment}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.DownPayment && touched.DownPayment ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.DownPayment}</p>
              ) : null}
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Total Installments *"
              color='secondary'
              name='Total_Installment'
              value={values.Total_Installment}
              onChange={handleChange}
              onBlur={handleBlur}

            />{errors.Total_Installment && touched.Total_Installment ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.Total_Installment}</p>
            ) : null}
 
            </Grid>


            <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Monthly Installment"
                color='secondary'
                type='number'
                name='MonthlyInstallment'
                value={values.MonthlyInstallment}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Mode of Payment</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Mode Of Payment"
                color='secondary'
                name='ModeOfPayment'
                value={values.ModeOfPayment}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Installments"}>Installments</MenuItem>
               
              </Select>
          </FormControl>
          </Grid>

          <Grid item lg={3} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , width:{sm:'70%'} }}
        >
            <AgentSelectorID
              
              onConfirm={(selectedAgentID) => {
                setFieldValue("Agent", selectedAgentID);
              }}
            />
        </Grid>

        <Grid item lg={3} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
          <SubAgentSelectorID
                onConfirm={(selectedAgentID) => {
                  setFieldValue("SubAgent", selectedAgentID);
                }}
              />
        </Grid>


        <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Down Payment Commission"
                type='number'    
                color='secondary'
                name='GrandTotal'
                value={values.GrandTotal}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Down Payment Commission"
                type='number'    
                color='secondary'
                name='GrandTotal'
                value={values.GrandTotal}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Discount"
                color='secondary'
                name='Discount'
                value={values.Discount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Remarks"
                color='secondary'
                 name='AppRemarks'
                value={values.AppRemarks}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>


          {!data && <> <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" sx = {{marginTop:'1%'}}>
              Development Charges
            </Typography>
          </Grid>
   
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField sx={{  width: '100%' , marginTop:1 }}
                  id="outlined-multiline-flexible"
                  label="Development Charges"
                  color='secondary'
                  name='DevelopmentAmount'
                  value={values.DevelopmentAmount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}
            
          >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Box>
                      <DatePicker
                        name='Development Date'
                        id="Development Date"
                        
                        value={values.DevelopmentChargesDate}
                        onChange={(value) => setFieldValue("DevelopmentChargesDate", value, true)}
                        onBlur={handleBlur}
                        label="Development Date" />
                    </Box>
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            </>}

            <Box sx={{ width: {lg: '15%' , sm:'70%'}, marginTop: 4, alignSelf: 'flex-end' , mx:'auto' }}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                  {data ? "Update" : "Create"}
                </Button>
            </Box>
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default CreateMainAppForm;
