import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme/Theme';
import Modal from '@mui/material/Modal';
import { Link } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const navItems = [
  {name : 'Home' , link : "/Home"},
  {name : 'Create Main Form' , link : "/Create/Main"},
  {name : 'Main Form' , link : "MainAppForm"},
  {name: 'Refund Schedule' , link:  "/RefundSchedule"},
  {name: 'Create Main Refund',link: "/Create/Refund"},
  {name: 'Transfer Files',link: "/TransferFiles"},
  {name: 'Cash files',link: "/CashFiles"},
  {name: 'Installment files',link: "/InstallmentFiles"},
  {name: 'Token Money',link: "/TokenMoney"},
  {name: 'Registry Inteqal',link: "/RegistryInteqal"},
  {name : 'Regular Receipts' , link : '/RegularReceipt'},
  {name : 'Transfer Receipts' , link : '/TransferReceipt'},
  {name : 'Development Receipts' , link : '/DevelopmentReciept'},
  {name: 'Ledger',link: "/Ledger"},
  {name: 'Agent Voucher',link: "/AgentVouchers"},
  {name: 'Agent Payment List',link: "/AgentPaymentList"},
  {name: 'Application record',link: "/MultipleFiles"},
  {name: 'Receipt Record Finder',link: "/ReceiptFinder"},
  {name: 'Agent Wise File Update',link: "/AgentWiseFile"},

];

export default function DrawerAppBar() {
  const [userExists, setUserExists] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [allotmentMenuAnchorEl, setAllotmentMenuAnchorEl] = useState(null);
  const [receiptsMenuAnchorEl, setReceiptsMenuAnchorEl] = useState(null);
  const [otherAnchorEl, setOtherAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const exists = await localStorage.getItem('LoggedIn');
      setUserExists(exists);
    };
    checkUser();
  }, []);

  const handleAllotmentMenuOpen = (event) => setAllotmentMenuAnchorEl(event.currentTarget);
  const handleAllotmentMenuClose = () => setAllotmentMenuAnchorEl(null);
  const handleReceiptsMenuOpen = (event) => setReceiptsMenuAnchorEl(event.currentTarget);
  const handleReceiptsMenuClose = () => setReceiptsMenuAnchorEl(null);
  const handleOthersMenuOpen = (event) => setOtherAnchorEl(event.currentTarget);
  const handleOthersMenuClose = () => setOtherAnchorEl(null);

  const [createMainAppMenuOpen, setCreateMainAppMenuOpen] = useState(false);

  const handleCreateMainAppMenuOpen = () => {
    setCreateMainAppMenuOpen(true);
  };

  const handleCreateMainAppMenuClose = () => {
    setCreateMainAppMenuOpen(false);
  };

  const handleCreateMainAppSubItem = (subItem) => {
    // Handle click on the sub-menu items
    // You can add your desired logic here for each sub-menu item
    console.log(`Clicked on: ${subItem}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = () => {
    if (userExists) {
      localStorage.removeItem('LoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('type')
      localStorage.removeItem('UserID')
    }
    navigate('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}></Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href={item.link} sx={{ textDecoration: 'none', color: 'black' }}>
                {item.name}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <Button
          sx={{
            color: theme.palette.secondary.text,
            backgroundColor: theme.palette.secondary.main,
            fontWeight: 'bold',
            ':hover': {
              backgroundColor: theme.palette.secondary.hoverButton,
              color: theme.palette.secondary.main,
            },
            border: 1,
            borderRadius: 3,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 1,
            paddingBottom: 1,
            borderColor: theme.palette.secondary.Button,
          }}
          onClick={handleClick}
        >
          {userExists ? 'Log out' : 'Login'}
        </Button>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', color: 'red' }}>
        <AppBar component="nav" sx={{ backgroundColor: theme.palette.secondary.main, padding: '1%', }}>
          <Toolbar>
            <IconButton
              color={theme.palette.primary.background}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" component="div" 
                onClick={() => { navigate('/Home'); }}
                   sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row',
                    textAlign: 'center', alignItems: 'center' }} >
              <span style={{ color: theme.palette.secondary.text, fontWeight: 'bolder', fontStyle: 'oblique' }}>PAK
                <span style={{ color: theme.palette.secondary.text }}>DEM</span></span>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button onClick={() => { navigate('/Home'); }} sx={{ color: theme.palette.secondary.text, fontWeight: 'bold', marginRight: 4, ':hover': { borderBottom: '4px solid #ffffff' } }}>
                Home
              </Button>
              {/* Button with dropdown for Allotment Forms */}
              <Button
                onClick={handleAllotmentMenuOpen}
                
                sx={{
                  color: theme.palette.secondary.text,
                  fontWeight: 'bold',
                  marginRight: 4,
                  ':hover': { borderBottom: '4px solid #ffffff' },
                }}
              >
                Allotment Forms
              </Button>
              <Menu
                anchorEl={allotmentMenuAnchorEl}
                open={Boolean(allotmentMenuAnchorEl)}
                onClose={handleAllotmentMenuClose}
                MenuListProps={{onMouseLeave: handleAllotmentMenuClose}}
              >
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/MainAppForm" sx={{ textDecoration: 'none', color: 'black' }}>
                    Main Application Forms
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/Create/Main"
                    sx={{ textDecoration: 'none', color: 'black' }}>
                    Create Main Application
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/RefundSchedule" sx={{ textDecoration: 'none', color: 'black' }}>
                    Refund Schedule
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/Create/Refund" sx={{ textDecoration: 'none', color: 'black' }}>
                    Create Main Refund
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/TransferFiles" sx={{ textDecoration: 'none', color: 'black' }}>
                    Transfer Files
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/CashFiles" sx={{ textDecoration: 'none', color: 'black' }}>
                    Cash Files
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/InstallmentFiles" sx={{ textDecoration: 'none', color: 'black' }}>
                    Installment Files
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/TokenMoney" sx={{ textDecoration: 'none', color: 'black' }}>
                    Token Money
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAllotmentMenuClose}>
                  <Link href="/RegistryInteqal" sx={{ textDecoration: 'none', color: 'black' }}>
                    Registry / Inteqal
                  </Link>
                </MenuItem>
              </Menu>
              <Button onClick={handleReceiptsMenuOpen} 
                  sx={{ color: theme.palette.secondary.text, fontWeight: 'bold',
                     marginRight: 4, ':hover': { borderBottom: '4px solid #ffffff'
                      } }}>
                Receipts
              </Button>
              {/* Button with dropdown for Others */}
              <Menu
                anchorEl={receiptsMenuAnchorEl}
                open={Boolean(receiptsMenuAnchorEl)}
                onClose={handleReceiptsMenuClose}
                MenuListProps={{onMouseLeave: handleReceiptsMenuClose}}
              >
                <MenuItem onClick={handleReceiptsMenuClose}>
                  <Link href="/RegularReceipt" sx={{ textDecoration: 'none', color: 'black' }}>
                    Regular Receipts
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleReceiptsMenuClose}>
                  <Link href="/TransferReceipt" sx={{ textDecoration: 'none', color: 'black' }}>
                    Transfer Receipts
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleReceiptsMenuClose}>
                  <Link href="/DevelopmentReciept" sx={{ textDecoration: 'none', color: 'black' }}>
                    Development Charges
                  </Link>
                </MenuItem>
              </Menu>
              <Button onClick={() => { navigate('/LedgerReport'); }} sx={{ color: theme.palette.secondary.text, fontWeight: 'bold', marginRight: 4, ':hover': { borderBottom: '4px solid #ffffff' } }}>
                Ledger
              </Button>
              <Button onClick={handleOthersMenuOpen} 
                  sx={{ color: theme.palette.secondary.text, fontWeight: 'bold',
                     marginRight: 4, ':hover': { borderBottom: '4px solid #ffffff'
                      } }}>
                Misc.
              </Button>
              <Menu
                anchorEl={otherAnchorEl}
                open={Boolean(otherAnchorEl)}
                onClose={handleOthersMenuClose}
                MenuListProps={{onMouseLeave: handleOthersMenuClose}}

              >
                <MenuItem onClick={handleOthersMenuClose}>
                  <Link href="/AgentVouchers" sx={{ textDecoration: 'none', color: 'black' }}>
                  Agent Payment Voucher
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleOthersMenuClose}>
                  <Link href="/AgentPaymentList" sx={{ textDecoration: 'none', color: 'black' }}>
                  Agent Payment list
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleOthersMenuClose}>
                  <Link href="/MultipleFiles" sx={{ textDecoration: 'none', color: 'black' }}>
                  Application Record Multiple Files
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleOthersMenuClose}>
                  <Link href="/ReceiptFinder" sx={{ textDecoration: 'none', color: 'black' }}>
                  Receipt Record Finder
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleOthersMenuClose}>
                  <Link href="/AgentWiseFile" sx={{ textDecoration: 'none', color: 'black' }}>
                  Agent Wise File Update
                  </Link>
                </MenuItem>
              </Menu>
              <Button
                sx={{
                  
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.secondary.hoverButton,

                  fontWeight: 'bold',
                  
                  ':hover': {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.Button,
                    
                  },
                  border: 1,
                  borderRadius: 3,
                  paddingLeft: 4,
                  paddingRight: 4,
                  paddingTop: 1,
                  paddingBottom: 1,
                  borderColor: theme.palette.secondary.Button,
                }}
                onClick={handleClick}
              >
                {userExists ? 'Log out' : 'Login'}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
