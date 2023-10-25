import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { FormRow1 , FormRow2 } from '../Components/FormRow';
import { CoPresentOutlined } from '@mui/icons-material';
import BasicModal from '../Components/Modal';





export default  function Home() {

    const [user,setUser] = useState('');
    const [open, setOpen] = useState(false);
    const [noUser,setNoUser] = useState(null)
    const navigate = useNavigate()
    const theme = useTheme();
    const [notStaff,setNotStaff] = useState(null)

    useEffect( () => {
        const userType =  localStorage.getItem('type')

        if(userType == null) {
            setNoUser(true)
        }

        else if(userType == 1) {
            setUser("Admin")
            setNotStaff(true)
            setNoUser(false)
        }
        else if(userType == 2){
            setUser("Staff")
            setNotStaff(false)
            setNoUser(false)
        }
        else if(userType == 3){
            setUser("Cashier")
            setNotStaff(true)
            setNoUser(false)
        }
        else if(userType == 4){
            setUser("Finance Manager")
            setNotStaff(true)
            setNoUser(false)
        }
    })

    const ButtonStyling = {
        color: theme.palette.secondary.text,
        backgroundColor: theme.palette.secondary.main,
        fontWeight: 'bold',
        width: '30%',
        alignSelf: 'center',
        boxShadow: 10,
        my: 1,
        ':hover': {
          backgroundColor: theme.palette.secondary.hoverButton,
          color: theme.palette.secondary.main,
        },
        border: 1,
        borderRadius: 3,
        borderColor: theme.palette.secondary.Button,
      };


  return (
    <>
    <Box sx={{
        display: 'flex',
        backgroundColor:noUser ? "white" : theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop:{lg:'1%' , md:'2%' , sm:'3%' , xs:'2%'}
       
    }} >
       <Box>
        {/* Centered Typography */}
        <Box sx={{
            display: 'inline-block', textAlign: 'center',
            marginTop: 2, padding: '2%', 
        }}>
            <Typography variant='h4' sx={{ fontSize: '2rem' }}>
                {user} Portal
            </Typography>
            <Divider
                sx={{ height: 5, backgroundColor: theme.palette.primary.main }}
            />
        </Box>
        
       
        
            <Box sx={{
                display: 'flex', justifyContent: 'space-around',
                mb:{ lg : '1%' , md : '2%' , sm : '3%' , xs: "4%"},
                mt:{sm:'1%' , xs:'1%'}
            }}>
                <Button
                    sx={{
                        color: theme.palette.secondary.text,
                        backgroundColor: theme.palette.secondary.main,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        boxShadow: 10,
                        my: 1,
                        ':hover': {
                            backgroundColor: theme.palette.secondary.hoverButton,
                            color: theme.palette.secondary.main,
                        },
                        border: 1,
                        borderRadius: 3,
                        paddingLeft: 1,
                        paddingRight: 1,
                        paddingTop: 1,
                        paddingBottom: 1,
                        borderColor: theme.palette.secondary.Button,
                        paddingX:8
                    }}
                    onClick={() => {navigate('/Folder')}}
                    
                >
                    File Folder
                </Button>
                <Button
                    sx={{
                        color: theme.palette.secondary.text,
                        backgroundColor: theme.palette.secondary.main,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        boxShadow: 10,
                        my: 1,
                        ':hover': {
                            backgroundColor: theme.palette.secondary.hoverButton,
                            color: theme.palette.secondary.main,
                        },
                        border: 1,
                        borderRadius: 3,
                        paddingLeft: 1,
                        paddingRight: 1,
                        paddingTop: 1,
                        paddingBottom: 1,
                        borderColor: theme.palette.secondary.Button,
                        paddingX:8
                    }}
                    onClick={() => {navigate('/UploadImage')}}
                    
                >
                    Upload Image
                </Button>
        {user === "Admin" && (   <BasicModal />
        )}
            </Box>
        
    </Box>
       {noUser ? 
        (<Box>
            <Box sx={{ display: 'inline-block', textAlign: 'center', marginTop: 2, padding: '2%', marginBottom : 1, }}>
                <Typography variant='h4' sx={{ fontSize: '2rem' }}>
                    Login To access Portal
                </Typography>
            </Box>
            <Box sx={{  textAlign: 'center', marginTop: 2, padding: '2%', marginBottom : 1, }}>
                <Button
                    onClick={() => {navigate('/')}}
                    sx={ButtonStyling}
                >
                    login
                </Button>
            </Box>
       </Box>) 
       : 
       (<Box sx={{ flexGrow: 1 , margin:'0% 3%',
        paddingBottom : !notStaff ? '5%' : 'auto'
        //If footer nahi dalte to
            } }>
            <Grid container  >
                <Grid container item spacing={3} sx ={{marginBottom:'2%'}}>
                    <FormRow1 />
                    {notStaff && (
                        <FormRow2 />
                    )} 
                </Grid>
               
            </Grid>
        </Box>)}

    </Box>
    </>

  );
}