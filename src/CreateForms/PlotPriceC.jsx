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

import { createPlotPrice,updatePlotPrice } from './Apis/PlotsApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreatPlotPrice() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()


  const [selectedFile, setSelectedFile] = useState('');

  if(data){
    var val = data.sold
  }
  else{
    var val = false
  }


    
  


  const initialValues = data === undefined ? {
    PlotCategory : null,
    PlotSize : null,
    PlotPrice : null,
    MonthlyInstallments: null,
    TotalMonthlyInstallments:null,
    Extra15Percent : null,
    Plots:null
  } : {
    PlotCategory : data.Plot_Category,
    PlotSize : data.Plot_Size,
    PlotPrice : data.Plot_Price,
    MonthlyInstallments: data.Monthly_Installment,
    TotalMonthlyInstallments:data.Total_Monthly_Installments,
    Extra15Percent : data.Extra_15_Percent
  }

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        PlotPrice: Yup.string().required("Plot Price is required"),
      

       
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (values.PlotPrice ) { 
        if(data){
            const submission = updatePlotPrice(
                                        data.PlotPriceID,
                                        values.PlotCategory,
                                        values.PlotSize,
                                        values.PlotPrice,
                                        values.MonthlyInstallments,
                                        values.TotalMonthlyInstallments,
                                        values.Extra15Percent
                
            )
            if(submission){
                alert('Plot updated')
                navigate(`/PlotPrice/details/${data.PlotPriceID}`)
            }
            else{
                alert('not updated')
            }
        }
        else{
            const submission =   createPlotPrice(
                                        values.PlotCategory,
                                        values.PlotSize,
                                        values.PlotPrice,
                                        values.MonthlyInstallments,
                                        values.TotalMonthlyInstallments,
                                        values.Extra15Percent
                                        )
                if(submission) {

                alert('Plot Price created')
                navigate('/PlotPrices')

                }
                else {
                alert('Technical Error')
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
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          {data ? "Edit " : "Create "} Plot Price
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>

        <Grid item lg={4} md = {4} sm = {6} xs={12}>
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
                <MenuItem value={"3 Marla"}>3 Marla Res</MenuItem>
                <MenuItem value={"5 Marla"}>5 Marla Res</MenuItem>
                <MenuItem value={"7 Marla"}>7 Marla Res</MenuItem>
                <MenuItem value={"10 Marla"}>10 Marla Res</MenuItem>
                <MenuItem value={"1 kanal Res"}>1 kanal Res</MenuItem>
                <MenuItem value={"2.5 Marla Com"}>2.5 Marla Com</MenuItem>
                <MenuItem value={"5 Marla Com"}>5 Marla Com</MenuItem>
                <MenuItem value={"10 Marla Com"}>10 Marla Com</MenuItem>
                <MenuItem value={"1 Kanal Com"}>1 Kanal Com</MenuItem>
              </Select>
            </FormControl>

        </Grid>

        <Grid item lg={4} md = {4} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Plot Size</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Plot Size"
                color='secondary'
                name='PlotSize'
                value={values.PlotSize}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"17 x 40"}>17 x 40</MenuItem>
                <MenuItem value={"25 x 70"}>25 x 70</MenuItem>
                <MenuItem value={"35 x 70"}>35 x 70</MenuItem>
                <MenuItem value={"40 x 70"}>40 x 70</MenuItem>
                <MenuItem value={"50 x 90"}>50 x 90</MenuItem>
                <MenuItem value={"50 x 50"}>50 x 50</MenuItem>
              </Select>
            </FormControl>
        </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Plot Price"
                    color='secondary'
                    name='PlotPrice'
                    value={values.PlotPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.PlotPrice && touched.PlotPrice ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.PlotPrice}</p>
            ) : null}
          </Grid>  

         

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Monthly Installments"
                    color='secondary'
                    name='MonthlyInstallments'
                    value={values.MonthlyInstallments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>

          <Grid item lg={4} md = {4} sm = {6} xs={12}>
          <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Total Monthly Installments"
                    color='secondary'
                    name='TotalMonthlyInstallments'
                    value={values.TotalMonthlyInstallments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Extra 15 Percent"
                    color='secondary'
                    name='Extra15Percent'
                    value={values.Extra15Percent}
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

export default CreatPlotPrice;
