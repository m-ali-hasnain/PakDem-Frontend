import React, { useEffect, useState } from "react";
import { Box, Button , Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import DateSelector from "../Components/DateSelector";
import { getExpenditures } from "../api/expenditures";
import CreateIcon from '@mui/icons-material/Create';



function Expenditure() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);

    const initialValues = {
        starting: null,
        ending: null,
      };

      const fetchData = async ({startDate,endDate}) => {
        try {
            const responseData = await getExpenditures({ startDate: startDate, endDate: endDate }); 
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
          },
        }


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
             Expenditures
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleBlur, errors, touched }) => (
        <Form>
          <DateSelector values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} errors={errors} touched={touched} />
          <Button type="submit">Search</Button>
        </Form>
      )}
    </Formik>
        </Box>
        <Button  sx={ButtonStyling}
                onClick={() => navigate('/Create/Expenditure')}
            >
            Create Expenditure <CreateIcon sx={{ml:1}} />
        </Button>
        {data && <DataTable data = { data }  nav = 'Expenditure/Details' isPayment = {false} />}
    </Box>
    )
}

export default Expenditure;
