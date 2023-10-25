import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import GetCard from '../../Components/Card';
import PrintIcon from '@mui/icons-material/Print';

function MainForm (applicationData) {


    const navigate = useNavigate()
    const theme = useTheme();
    
    const location = useLocation();

    const [data , setData] = useState(null);

    useEffect(()=>{
        setData(applicationData)
    },[applicationData])



    

      

    
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
        </Box>
      );
            }

export default MainForm;
