import React, { useEffect, useState } from "react";
import { Box, Button , Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { Formik, Form } from 'formik';
import {useMediaQuery} from "@mui/material";
import dayjs from 'dayjs';
import DateSelector from "../Components/DateSelector";
import { getDailyReport } from "../api/Reports";



function DailyReport() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);


    const initialValues = {
        starting: null,
        ending: null,
      };

      const fetchData = async ({startDate,endDate}) => {
        try {
            const responseData = await getDailyReport({ startDate: startDate, endDate: endDate }); 
            setData(responseData); // Set the data in the state
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
      



  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '5%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : '50vh'
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Daily Recovery Report
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleBlur, errors, touched }) => (
        <Form>
          <DateSelector values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} errors={errors} touched={touched} />
          <Button type="submit" variant="outlined" sx={{my:'2%'}}>Search</Button>
        </Form>
      )}
    </Formik>
        </Box>
        {data && 
        (<DataTable data = { data }  nav = '#' isPayment = {true} />)}

    </Box>
    )
}

export default DailyReport;
