import React , {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FileSelector from '../Components/fileselector';
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

import { createExpenditure } from './Apis/ExpenditureApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateExpenditure() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const initialValues =  {
    Date : null,
    ExpenseMainHead : null,
    ExpenseSubHead : null,
    ExpenseNature : null,
    ModeOfPayment : null,
    ExpenditureNature : null,
    PVNo: null,
    ToPayee:null,
    PayeeCNICNo : null,
    MobileNo : null ,
    Amount : null,
    Remarks : null
  } 

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        Amount: Yup.number().required("Amount is required!"),
        ExpenseNature: Yup.string().ensure().required("Expense Nature Head is required required!"),
        ExpenseSubHead: Yup.string().ensure().required("Expense Sub Head is required required!"),
       
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




const handleClick = async () => {
  
    if (values.Amount ) { 
        const submission =  createExpenditure(
                                                values.ExpenseMainHead,
                                                values.ExpenseSubHead,
                                                values.ExpenseNature,
                                                values.Date,
                                                values.Amount,
                                                values.Remarks,
                                                values.ExpenditureNature,
                                                values.PVNo,
                                                values.ModeOfPayment,
                                                values.ToPayee,
                                                values.PayeeCNICNo,
                                                values.MobileNo,
                                            )
            if(submission) {

                alert('Expenditure created')
                navigate('/Expenditure')

                }
                else {
                alert('Technical Error')
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
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          {data ? "Edit " : "Create "} Expenditure
        </Typography>
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
                        label="Date " />
                    </Box>
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
          </Grid>

        <Grid item lg={6} md = {6} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Expense Nature</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Expense Nature"
                color='secondary'
                name='ExpenseNature'
                value={values.ExpenseNature}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Cost of Land"}>Cost of Land</MenuItem>
                <MenuItem value={"Registry, Stamps and Taxes"}>Registry, Stamps and Taxes</MenuItem>
                <MenuItem value={"Development Expense"}>Development Expense</MenuItem>
                <MenuItem value={"Garden And Plants"}>Garden And Plants</MenuItem>
                <MenuItem value={"Daily Wages And Workers"}>Daily Wages And Workers</MenuItem>
                <MenuItem value={"Amount Refund to the Clients"}>Amount Refund to the Clients</MenuItem>
                <MenuItem value={"Commission Rewards and Gifts"}>Commission Rewards and Gifts</MenuItem>
                <MenuItem value={"Salary and Allowances"}>Salary and Allowances</MenuItem>
                <MenuItem value={"Stationary and Printings"}>Stationary and Printings</MenuItem>
                <MenuItem value={"Purchase , Repair & Maintenance of equipment"}>Purchase , Repair & Maintenance of equipment</MenuItem>
                <MenuItem value={"Software Expenses"}>Software Expenses</MenuItem>
                <MenuItem value={"Mess & Entertainment in Head Office"}>Mess & Entertainment in Head Office</MenuItem>
                <MenuItem value={"Mess & Entertainment on Site"}>Mess & Entertainment on Site</MenuItem>
                <MenuItem value={"Offices Rent"}>Offices Rent</MenuItem>
                <MenuItem value={"Utility Bills"}>Utility Bills</MenuItem>
                <MenuItem value={"Vehicle Purchase , Repair & Maintenace"}>Vehicle Purchase , Repair & Maintenace</MenuItem>
                <MenuItem value={"Vehicle Fuel"}>Vehicle Fuel</MenuItem>
                <MenuItem value={"Vehicle Rents"}>Vehicle Rents</MenuItem>
                <MenuItem value={"Furniture and Equipment"}>Furniture and Equipment</MenuItem>
                <MenuItem value={"Solar System"}>Solar System</MenuItem>
                <MenuItem value={"Miscellaneous Expense"}>Miscellaneous Expense</MenuItem>
                <MenuItem value={"Paid Sadqa "}>Paid to NGOs , Needy or Masjid o Madarassa</MenuItem>
                <MenuItem value={"Paid to Azeem Sb Directly"}>Paid to Azeem Sb Directly</MenuItem>
                <MenuItem value={"CEO Home Expense"}>CEO Home Expense</MenuItem>
                <MenuItem value={"Loan"}>Loan</MenuItem>
                <MenuItem value={"Paid to someone order by Azeem Sb detail not found"}>Paid to someone order by Azeem Sb detail not found</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
            {errors.ExpenseNature && touched.ExpenseNature ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ExpenseNature}</p>
            ) : null}

        </Grid>

        <Grid item lg={6} md = {6} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Expense Sub Head</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Expense Sub Head"
                color='secondary'
                name='ExpenseSubHead'
                value={values.ExpenseSubHead}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Land Purchasing Expenditure"}>Land Purchasing Expenditure</MenuItem>
                <MenuItem value={"Development Expenditure on Site"}>Development Expenditure on Site</MenuItem>
                <MenuItem value={"Daily Wages Expenditures"}>Daily Wages Expenditures</MenuItem>
                <MenuItem value={"Amount Refund to Clients"}>Amount Refund to Clients</MenuItem>
                <MenuItem value={"Commission, Rewards and Gifts"}>Commission, Rewards and Gifts</MenuItem>
                <MenuItem value={"Administration Expenditures"}>Administration Expenditures</MenuItem>
                <MenuItem value={"Charity"}>Charity</MenuItem>
                <MenuItem value={"Paid to CEO Directly"}>Paid to CEO Directly</MenuItem>
                <MenuItem value={"Paid to Someone by order CEO"}>Paid to Someone by order CEO</MenuItem>
                <MenuItem value={"CEO Home Expense"}>CEO Home Expense</MenuItem>
                <MenuItem value={"Loan"}>Loan</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>

              </Select>
            </FormControl>
            {errors.ExpenseSubHead && touched.ExpenseSubHead ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ExpenseSubHead}</p>
            ) : null}
        </Grid>

       

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Expenditure Nature"
                    color='secondary'
                    name='ExpenditureNature'
                    value={values.ExpenditureNature}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.ExpenditureNature && touched.ExpenditureNature ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ExpenditureNature}</p>
            ) : null}
          </Grid>  

         

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="PV No"
                    color='secondary'
                    name='PVNo'
                    value={values.PVNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>

          <Grid item lg={4} md = {4} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Mode Of Payment</InputLabel>
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
                <MenuItem value={"Online"}>Online</MenuItem>

              </Select>
            </FormControl>
        </Grid>

        <Grid item lg={4} md = {4} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Expense Main Head</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Expense Main Head"
                color='secondary'
                name='ExpenseMainHead'
                value={values.ExpenseMainHead}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Direct Expense"}>Direct Expense</MenuItem>
                <MenuItem value={"Indirect Expense"}>Indirect Expense</MenuItem>

              </Select>
            </FormControl>
        </Grid>

       

          <Grid item lg={4} md = {4} sm = {6} xs={12}>
          <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="To Payee"
                    color='secondary'
                    name='ToPayee'
                    value={values.ToPayee}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Payee CNIC No"
                    color='secondary'
                    name='PayeeCNICNo'
                    value={values.PayeeCNICNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid> 

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Mobile Number"
                    color='secondary'
                    name='MobileNo'
                    value={values.MobileNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Amount"
                    color='secondary'
                    name='Amount'
                    value={values.Amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            {errors.Amount && touched.Amount ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Amount}</p>
            ) : null}
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Remarks"
                    color='secondary'
                    name='Remarks'
                    value={values.Remarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>  


          

       
            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'2%'}}>
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

export default CreateExpenditure;
