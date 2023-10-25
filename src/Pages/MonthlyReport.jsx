import React, { useEffect, useState } from "react";
import { Box, Button , Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { Formik, Form } from 'formik';
import {useMediaQuery} from "@mui/material";
import dayjs from 'dayjs';
import DateSelector from "../Components/DateSelector";
import { getMonthlyReport } from "../api/Reports";
import CreateIcon from '@mui/icons-material/Create';





function MonthlyReport() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [AE,setAE] = useState(null)
    const [receivedData, setReceivedData] = useState(null)
    const [COL, setCOL] = useState(null);
    const [SDC, setSDC] = useState(null);


    const initialValues = {
        starting: null,
        ending: null,
      };

      const fetchData = async ({startDate,endDate}) => {
        try {
            const responseData = await getMonthlyReport({ startDate: startDate, endDate: endDate }); 
            setData(responseData.monthWiseReport); // Set the data in the state
            setAE(responseData.AdministrationExpense);
            setReceivedData(responseData.totalReceivedAmount)
            setCOL(responseData.CostOfLand)
            setSDC(responseData.SiteDevelopmentCost)
        } catch (error) {
          // Handle error if needed
        }
      };
    
      const handleSubmit = (values) => {
        
        const { starting, ending } = values;

        if(starting == null || ending == null){
            alert("Please select a date range")
        }
        else {
            const startingDate = dayjs(starting).format('YYYY-MM-DD');
            const endingDate = dayjs(ending).format('YYYY-MM-DD');
            if (endingDate < startingDate) {
                alert('Ending date should be greater than or equal to the starting date.');
                } 
            else {
                fetchData({ startDate: startingDate, endDate: endingDate }); 
                }
            }
      };
      
      if (data && data.length > 0) {
        // Calculate the sums
        var sumTotalReceivedAmount = data.reduce((sum, item) => sum + item.Total_Received_Amount, 0)
        var sumOfficeExpense = data.reduce((sum, item) => sum + item.Office_Expence, 0)
        var sumNetAmount  = data.reduce((sum, item) => sum + item.Net_Amount, 0)
      
        console.log("Sum of Total_Received_Amount:", sumTotalReceivedAmount);
        console.log("Sum of Office_Expence:", sumOfficeExpense);
        console.log("Sum of Net_Amount:", sumNetAmount);
      } else {
        console.log("The data is null or empty. No sums can be calculated.");
      }

      const isScreenLarge = useMediaQuery(theme.breakpoints.up('lg'));
        const isScreenMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
        const isScreenSmall = useMediaQuery(theme.breakpoints.down('sm'));
        const isScreenExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));


        const ButtonStyling = {
          alignSelf: 'start' , paddingX :2 , paddingY:1,
          marginLeft:'5%',
          border:'2px solid black',
          justifyContent:'start',
          color:theme.palette.text.primary,
          alignItems:'start',
          ':hover': {
              backgroundColor: theme.palette.secondary.hoverButton,
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main
            },}
            
  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : 247
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Monthly Report
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleBlur, errors, touched }) => (
        <Form>
          <DateSelector values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} errors={errors} touched={touched} />
          <Button type="submit" variant="outlined" sx={{mt:'2%'}} >
            Search
          </Button>
        </Form>
      )}
        </Formik>
        </Box>
        <Button  sx={ButtonStyling}
                onClick={() => navigate('/Create/MonthlyReport')}
            >
            Create Monthly Report <CreateIcon sx={{ml:1}} />
        </Button>
        {data && (<DataTable data = { data }  nav = 'Expenditure/Details' isPayment = {true} />)}
        {data && 
            <Box sx={{display:'flex' , flexDirection:'column'}}>
                <Box sx={{
                    backgroundColor: theme.palette.text.primary ,
                    color:theme.palette.primary.background,
                    padding:'1%',
                    mx:'4%',
                    border:1,
                    borderRadius:5,
                    boxShadow:10,
                    mb:'2%'
               }}>
                <Box >
                    <Typography variant={isScreenLarge || isScreenMedium ? 'h5' : isScreenSmall || isScreenExtraSmall ? 'h6' :'h6'} sx={{ 
                        flexGrow: 1, mb:'1%',
                        fontFamily:'sans-serif',
                        fontWeight:'bold'
                        }}>
                        Grand Monthly Total
                    </Typography>
                </Box>
                <Box sx={{display:'flex' , flexDirection:{sm:'row' , xs:'column'}}}>
                    <Typography variant="h6" sx={{ flexGrow: 1, mb:'1%' }}>
                        Received Amount : {sumTotalReceivedAmount}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1, mb:'1%' }}>
                        Office Expenses : {sumOfficeExpense}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1, mb:'1%' }}>
                        Net Amount : {sumNetAmount}
                    </Typography>
                </Box >
                </Box>
                <Box sx={{display:'flex' , flexDirection:{sm:'row' , xs:'column'} , mb:'2%'}}>
                {receivedData.map((item, index) => (
                    <Typography key={index} variant='h6' sx={{ flexGrow: 1 }}>
                      {item.ModeOfPayment} : {item.TotalReceivedAmount}
                    </Typography>
                ))}

                </Box>
                <Box sx={{display:'flex' , flexDirection:{sm:'row' , xs:'column'}}}>
                    <Typography variant='h6' sx={{ flexGrow: 1, mb:'1%' }}>
                        Administration Expense : {AE}
                    </Typography>
                    <Typography variant='h6' sx={{ flexGrow: 1, mb:'1%' }}>
                        Site Development : {SDC}
                    </Typography>
                    <Typography variant='h6' sx={{ flexGrow: 1, mb:'1%' }}>
                        Cost of Land : {COL}
                    </Typography>
                </Box>
            </Box> }
    </Box>
    )
}

export default MonthlyReport;
