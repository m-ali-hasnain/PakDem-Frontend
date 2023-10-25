import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from "react-router-dom";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';


export default function BasicModal() {

    const theme = useTheme();
    const navigate = useNavigate()

    //

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ButtonStyling = {
    color: theme.palette.secondary.text,
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
    width: { lg: '100%', md: '100%', sm: '100%', xs: '100%' },
    alignSelf: 'center',
    boxShadow: 10,
    my: 2,
    ':hover': {
      backgroundColor: theme.palette.secondary.hoverButton,
      color: theme.palette.secondary.main,
    },
    border: 1,
    borderRadius: 3,
    paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 2,
                paddingBottom: 2,
    borderColor: theme.palette.secondary.Button,
  };

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg: "20%" , md : "40%" , sm : "50%" , xs : "50%"},
    bgcolor: theme.palette.primary.background,
    boxShadow: 50,
    p: 8,
    borderRadius:5,

    

  };

  return (
    <Box 
 
    >
      
      <Button 
        
        sx={{
            alignSelf: 'end' , paddingX :2 , paddingY:1,
            border:'2px solid black',
            color:theme.palette.text.primary,
            ':hover': {
                backgroundColor: theme.palette.secondary.hoverButton,
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main
              },
            }}
        onClick={handleOpen}
        >
            track Activities
            <GpsFixedIcon  sx={{marginLeft:1}}  />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            bgcolor: 'background.surface',
            
          }}
      >
        <Box sx={style}>
                <Button
                        id="transition-modal-title"
                        sx={ButtonStyling}
                        onClick={() => navigate('/MainFormTracking')}
                    >
                        Main Form Tracking
                        <GpsFixedIcon  sx={{marginLeft:1}}  />
                    
                </Button>

                <Button
                        id="transition-modal-description"
                        sx={ButtonStyling}
                        onClick={() => navigate('/ReceiptTracking')}
                    >
                        Receipt Tracking
                        <GpsFixedIcon  sx={{marginLeft:1}}  />
                </Button>
        
        </Box>
      </Modal>
    </Box>
  );
}