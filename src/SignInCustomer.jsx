import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Components/Copyright';
import { LoginCustomer } from './api/Login';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleImage from './assets/google.png'
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function SignInCustomer() {

    const navigate = useNavigate()

    const theme = useTheme()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('CNIC') === '' || data.get('FileNo') === '' ) {
            if(data.get('CNIC') === '')
                alert('Please Enter CNIC')
            else if(data.get('FileNo') === ''){
                alert('Please Enter File Number')
            }
        }
        else
        {
            const result = await LoginCustomer(data.get('CNIC') , data.get('FileNo'))
            if(result){
                    navigate('/CustomerHome')
            }
        }
    };

  return (
    <Box 
        sx={{
            backgroundImage: 'url(/Bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover',
            minHeight: '100vh',
            maxHeight : 'auto'
        }}
    >
        <Typography  variant="h4" sx = {{
                color : 'black' ,
                 padding:'1%' ,
                 fontFamily:'sans-serif',
                 fontWeight : 'Bold'
                 }}>
                Welcome to Customer Login
        </Typography>
        <Typography  variant="h4" sx = {{
                color : 'black' ,
                 padding:'0.5%' ,
                 fontFamily:'sans-serif',
                 fontWeight : 'Bold'
                 }}>
                PAK DEM (SMC) Pvt. Ltd
        </Typography>
        <Grid container component="main" 
            sx={{ flexGrow: 1, 
            }}>
            <Grid   item xs={10} sm={8} md={5} lg={4} 
                    component={Paper}  square
                    sx = {{
                        marginLeft : 'auto',
                        marginRight : 'auto',
                        borderRadius : 5,
                        marginTop:1,
                        boxShadow:15,
                        paddingBottom : '2%'
                    }}
                    >
                <Box sx={{
                    display:'flex',
                    justifyContent:"flex-start",
                    color: theme.palette.primary.main,
                    ml:3,
                    mt:3
                }}>
                    <ArrowBackIosIcon onClick = {()=> navigate('/')} />
                </Box>
            <Box
                sx={{
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"
                    sx={{paddingY : 3}}
                >
                    Sign In As Customer
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="CNIC"
                    label="Enter CNIC"
                    name="CNIC"
                    autoComplete="CNIC"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="FileNo"
                    label="Enter File Number"
                    name="FileNo"
                    autoComplete="FileNo"
                    autoFocus
                />
                <Button
                    type="submit"          
                    variant="contained"
                    sx={{ 
                        mt: 2, mb: 2  , 
                        color : 'white' ,
                        backgroundColor: theme.palette.primary.main ,
                        padding: '2% 10%',
                        fontSize:'15px'
                    }}
                >
                    Sign In
                </Button>
             

            </Box>
          </Box>
            </Grid>
        </Grid>
      </Box>

  );
}