import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BackHand, CoPresentOutlined } from '@mui/icons-material';
import Footer from '../Components/Footer';





export default  function AgentHome() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [islogged , setislogged] = useState(null)

    useEffect(() => {
        const LoggedIn = localStorage.getItem("LoggedIn")
        if(!LoggedIn){
            alert('Please Login First')
            navigate('/')
            setislogged(false)
        }
        else{
            setislogged(true)
        }
    })

    const ButtonStyling = {
        color: theme.palette.secondary.text,
        backgroundColor: theme.palette.secondary.main,
        fontWeight: 'bold',
        width: { lg: '70%', md: '85%', sm: '85%', xs: '90%' },
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
      };

      const Item = styled(Paper)(({ theme }) => ({

        padding: { lg : theme.spacing(1)},
        textAlign: 'center',
        color: theme.palette.secondary.main,
        display:'flex',
        flexDirection:'column',
        border:'1px solid white' , borderRadius:20,
        boxShadow:10,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:'10%',
        padding:'10%'

      }));

    const handleLogOut = () => {
        localStorage.removeItem("LoggedIn");
        localStorage.removeItem("Name")
        navigate('/')
    }

    return(
        <Box sx ={{
            
            backgroundColor : theme.palette.secondary.background,
            minHeight : islogged ? "100vh" : 'auto',
        }}>
            {islogged && (<>
            <Box sx={{
                display: 'inline-block', textAlign: 'center', padding: '2%' 
            }}>
                <Typography variant='h4' sx={{ fontSize: '2rem' }}>
                    Agent Portal
                </Typography>
                <Divider
                    sx={{ height: 5, backgroundColor: theme.palette.primary.main }}
                />
            </Box>
            <Box sx={{
                display:'flex',
                justifyContent:'flex-end',
                marginX:'15%',
                marginY:1
            }}>
                <Button
                    variant='outlined'
                        onClick={handleLogOut}
                        >
                            log out
                            
                    </Button>

            </Box>
            <Grid container  >
                <Grid container item spacing={3} sx ={{
                        marginBottom:'2%',
                        justifyContent:'center',
                        
                        }}>
                    <Grid item lg={4} md={4} sm={6} xs={12} >
                    <Item >
                        <Typography variant='h5'
                            sx = {{
                                color: theme.palette.text.primary,
                                padding:'2%'
                            }}
                            >
                            View My Data
                        </Typography>
                        <Button
                            sx={ButtonStyling}
                            onClick={() => navigate('/AgentFiles')}
                        >
                            View My Files
                            <VisibilityIcon
                                sx ={{ marginLeft:1}}
                            />
                        </Button>

                        <Button
                            sx={ButtonStyling}
                            onClick={() => navigate('/AgentCommissionPage')}

                        >
                            
                            View My Commission
                            <VisibilityIcon  sx={{marginLeft:1}}  />
                            
                        </Button>
                    

                    </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
            </>)}
            
        </Box>
    )

}