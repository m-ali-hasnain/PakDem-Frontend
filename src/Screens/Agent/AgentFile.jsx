import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../../Components/Table";
import { getFiles } from "./Api/AgentData";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



function AgentFiles() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [islogged , setislogged] = useState(null)
    const [noData, setnoData] = useState(false)
  
    const [data , setData] = useState(null);

    useEffect(() => {
        const fetchData = async (AgentName) => {
          try {
            
            const responseData = await getFiles(AgentName); 
            if(responseData.length === 0){
                
                setnoData(true)
            }
            setData(responseData); // Set the data in the state
          } catch (error) {
            // Handle error if needed
          }
        };
        const LoggedIn = localStorage.getItem("LoggedIn")
        if(!LoggedIn){
            alert('Please Login First')
            navigate('/')
            setislogged(false)
        }
        else{
            const AgentName = localStorage.getItem('Name')
            
            setislogged(true)

            fetchData(AgentName)
        }
        
      }, []);
      

    


  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: islogged ? theme.palette.secondary.background : 'white',
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : 247,
        paddingBottom:'1%'
       
    }}>
        {islogged && (
        <>
        <Box sx={{
                    display:'flex',
                    justifyContent:"flex-start",
                    color: theme.palette.primary.main,
                    ml:'5%',
                }}>
                    <ArrowBackIosIcon onClick = {()=> navigate('/AgentHome')} />
                </Box>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Agent Wise File Details
        </Typography>
        </Box>
        
        {data && 
        <DataTable data = { data }  nav = 'Payments' isPayment = {true} />
        }
        </>)
        }
    </Box>
    )
}

export default AgentFiles;
