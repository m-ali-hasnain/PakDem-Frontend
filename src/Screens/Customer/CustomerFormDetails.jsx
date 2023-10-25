import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getSingleDetails } from './Api/MainFormCustomer';
import GetCard from '../../Components/Card';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function CustomerFormDetails () {


    const navigate = useNavigate()
    const theme = useTheme();
  
    const [data , setData] = useState(null);
    const [islogged , setislogged] = useState(null)

    useEffect(() => {
        const fetchData = async (CNICNo) => {
          try {
            
            const responseData = await getSingleDetails(CNICNo); // Call the function to get the data
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
      

    
    const status = data?.status

    const reason = data?.reason

    const bg = status === 'active'
    ? theme.palette.status.active
    : status === 'inactive'
    ? theme.palette.status.inactive
    : theme.palette.status.cancelled;


    return (
        <Box
          sx={{
            display: 'flex',
            backgroundColor: islogged ? theme.palette.secondary.background : 'white',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: { lg: '4%', md: '6%', sm: '15%', xs: '8%' },
            
          }}
        >
           {islogged && ( <><Box sx={{
                    display:'flex',
                    justifyContent:"flex-start",
                    color: theme.palette.primary.main,
                    ml:'5%',
                }}>
                    <ArrowBackIosIcon onClick = {()=> navigate('/CustomerHome')} />
                </Box>
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding:'1%'
            }}
          >
            <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
              Your File Details
            </Typography>
            
            <Box sx = {{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    alignItems:'center', // Align items at flex start,
                    ml:'5%',
                    mb:'1%'
                        }}>
            <Typography variant="h6" 
            sx={{ 
              backgroundColor : bg,
              color:theme.palette.primary.background,
              width:{ md: '22%', sm:'25%' , xs:'90%' }
                         }}>
                <span 
                    style={{fontFamily:'sans-serif' , fontWeight:'bold'}}>
                    Status : </span>
                <span 
                    
                    >
                    {status}</span>
                
            </Typography>
            <Typography variant="p" sx={{ flexGrow: 1 }} />
            </Box>
            <Box sx = {{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    alignItems:'center', 
                    ml:'5%'
                        }}>
            <Typography variant="p" style={{fontFamily:'sans-serif' , fontWeight:'bold'}} >
                {reason} 
            </Typography>
            <Typography variant="p" sx={{ flexGrow: 1 }} />

            </Box>
            
          </Box>
          <GetCard data={data} nav='Main' isExp={false} />
          </>)}
        </Box>
      );
            }

export default CustomerFormDetails;
