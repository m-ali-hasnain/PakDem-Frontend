import React, { useEffect, useState } from "react";
import { Box ,Button,Typography } from "@mui/material";
import { getTokenMoney } from "../api/MainAppFrom";

import CreateIcon from '@mui/icons-material/Create';
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";


function TokenMoney() {


    const navigate = useNavigate()
    const theme = useTheme();

  const [data, setData] = useState(null);

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

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        
        const responseData = await getTokenMoney(); // Call the function to get the data
        setData(responseData); // Set the data in the state
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData(); // Call the async function to fetch and set the data
  }, []);

  //console.log(data); // Now data should have the response data from Axios

  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' }, 
       
    }}>
      <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        
        flexDirection:'row',
        
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Token Money 
        </Typography>
        
        </Box>
        <Button  sx={ButtonStyling}
                onClick={() => navigate('/Create/TokenMoney')}
            >
            Create Token <CreateIcon sx={{ml:1}} />
        </Button>
        <DataTable data = { data }  nav = 'TokenDetails'  isPayment = {false} />
    </Box>
    )
}

export default TokenMoney;
