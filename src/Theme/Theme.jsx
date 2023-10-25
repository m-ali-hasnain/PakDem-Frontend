import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans'].join(',')
   },
   palette: { 
    primary: {
     main: '#0E9494',
     background:'#ffffff'
    },
    secondary:{
      main:'#0E9494',
      background : '#ebebeb',
      text: '#ffffff',
      Button: '#f4fdff',
      hoverButton: "#ffffff",
      footer: '#d4d4d4'
    },
    text:{
      primary:'#000000'
    },
    status:{
      active:'#0E9494',
      inactive: '#F7CA18',
      cancelled : '#ff0000'
    },
    
  }
 })

export default theme;
