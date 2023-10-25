import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getCommission } from './Api/AgentData';
import DataTable from '../../Components/Table';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Footer from '../../Components/Footer';

function AgentCommissionPage () {


    const navigate = useNavigate()
    const theme = useTheme();
    const [islogged , setislogged] = useState(null)
    const [noData, setnoData] = useState(false)
  
    const [data , setData] = useState(null);

    useEffect(() => {
        const fetchData = async (CNICNo) => {
          try {
            
            const responseData = await getCommission(CNICNo); 
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
            

        
        <Typography variant="h4" sx={{ flexGrow: 1 ,
                                         mb : '1%' ,
                                          }}>
             Agent Commission
        </Typography>
        </Box>
        
        {data && (
            <DataTable data = { data }  nav = 'Payments'
            isPayment = {true} />
        )}

         <Footer />
        </>)}
      
    </Box>
      );
            }

export default AgentCommissionPage;
