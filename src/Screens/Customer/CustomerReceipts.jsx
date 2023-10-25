import React, { useEffect, useState } from "react";
import { Box ,Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../../Components/Table";
import { getRecipts } from "./Api/MainFormCustomer";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Footer from "../../Components/Footer";


function CustomerReceipt() {


    const navigate = useNavigate()
    const theme = useTheme();

   

  const [data, setData] = useState(null);
  const [islogged , setislogged] = useState(null)

  useEffect(() => {
  
    const fetchData = async (CNICNo) => {
      try {
        
        const responseData = await getRecipts(CNICNo); // Call the function to get the data
        setData(responseData); // Set the data in the state
      } catch (error) {
        // Handle error if needed
      }
    };

    const CNICNo =  localStorage.getItem("CNICNo")
        if(!CNICNo){
          setislogged(false)
            alert('Please Login First')
            navigate('/')
        }
        else{
          setislogged(true)
            fetchData(CNICNo); 
        }
  }, []);

  return (
    <Box>
        <Box 
    sx={{
        display: 'flex',
        backgroundColor: islogged ? theme.palette.secondary.background : 'white',
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' }, 
        minHeight: data ? 'auto' :  '50vh'
       
    }}>
        {islogged && ( 
          <>
            <Box sx={{
                        display:'flex',
                        justifyContent:"flex-start",
                        color: theme.palette.primary.main,
                        ml:'5%',
                    }}>
                        <ArrowBackIosIcon onClick = {()=> navigate('/CustomerHome')} />
            </Box>
            <Box sx={{
              backgroundColor: theme.palette.secondary.background,
              justifyContent:'center',
              flexDirection:'row',
              mx:'auto'
              
              }}
          >
            
              <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
                  Customer Receipt
              </Typography>
              </Box>
            <DataTable data = { data }  nav = 'ReceiptDetails'  isPayment = {true} />
            <Footer />
          </>
        ) }
    </Box>
    </Box>
    )
}

export default CustomerReceipt;
