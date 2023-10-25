import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getSingleDetails } from '../api/MainAppFrom';
import GetCard from '../Components/Card';
import PrintIcon from '@mui/icons-material/Print';

function MainAppFormDetails () {


    const navigate = useNavigate()
    const theme = useTheme();
    
    const location = useLocation();

     const legderData = useLocation().state?.ledger

    const id = location.pathname?.split('/').pop();

    const applicationData = useLocation.state?.applicationData
    const [data , setData] = useState(null);



    

    useEffect(() => {

    
       
        const fetchData = async () => {
          try {
            
            const responseData = await getSingleDetails(id); // Call the function to get the data
            setData(responseData); // Set the data in the state
          } catch (error) {
            // Handle error if needed
          }
        };
    
        if(id){
        fetchData(); 
        }
      }, []);
      

    
    const status = data?.status

    const reason = data?.reason

    const bg = status === 'active' || 'Cleared'
    ? theme.palette.status.active
    : status === 'inactive'
    ? theme.palette.status.inactive
    : theme.palette.status.cancelled;


    return (
        <Box
          sx={{
            display: 'flex',
            backgroundColor: theme.palette.secondary.background,
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: { lg: '4%', md: '6%', sm: '15%', xs: '8%' },
            
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding:'1%'
            }}
          >
            <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
              Main App Form Details
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
              border : 1,
              borderColor : bg,
              borderRadius:3,
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
            {data && <Box sx= {{display:'flex' , justifyContent: "flex-end" , mr:"6%"}}>
              <Button onClick={() => navigate('/PrintMainForm' , { state: { data: data } })} variant='contained' >
                    Print <PrintIcon sx={{ml:1}} />
              </Button>
            </Box>}
            
          </Box>
          <GetCard data={data} nav='Main' isExp={false} />
          {
            legderData && 
            (
              <Box sx = {{ 
              display:'flex',flexDirection:'row',justifyContent:'center',
              }}>
                  <Box sx = {{ width:'80%', border : 3,
                    display:'flex',flexDirection:'row',justifyContent:'space-evenly',
                    padding:'2%',marginBottom:'3%',borderRadius:3}}>
                        <Typography variant='h6' > 
                          Total Amount : {legderData.total_amount}
                        </Typography>
                        <Typography variant='h6' > 
                          Received Amount : {legderData.received_amount}
                        </Typography>
                        <Typography variant='h6' > 
                          Balance Amount : {legderData.balance_amount}
                        </Typography>
                  </Box>
              </Box>
            )
          }
        </Box>
      );
            }

export default MainAppFormDetails;
