import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { getCashPayment } from "../api/Payments";
import dayjs from 'dayjs';
import SingleDateSelector from "../Components/SingleDate";


function CashPayment() {


    const navigate = useNavigate()
    const theme = useTheme();

  const [data, setData] = useState(null);

  const initialValues = {
    starting: null,
  }

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        
        const responseData = await getCashPayment(); // Call the function to get the data
        setData(responseData); // Set the data in the state
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (values) => {
        
    const { starting } = values;

    if(starting == null){
        alert("Please select a date range")
    }
    else {
        const startingDate = dayjs(starting).format('YYYY-MM-DD');
          getRecord(startingDate)
           }
        
  };

  const getRecord = async (startDate) => {
    try {
        
      const responseData = await getCashPayment(startDate); // Call the function to get the data
      setData(responseData); // Set the data in the state
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
       
    }}>
      <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Cash Payments
        </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue, handleBlur, errors, touched }) => (
            <Form >
              <Box sx = {{display : 'flex' , flexDirection : 'row'}}>
              <SingleDateSelector values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} errors={errors} touched={touched} />
              <Button type="submit" variant="outlined" 
                  sx = {{ml:'5%' , height:'90%' , mt:'5%'}}
              >
                Search
              </Button>
              </Box>
            </Form>
          )}
            </Formik>

        </Box>
        <DataTable data = { data }  nav = 'Payments' isPayment = {true} />
    </Box>
    )
}

export default CashPayment;
