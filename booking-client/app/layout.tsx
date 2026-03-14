'use client'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from '@mui/material/CssBaseline';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import theme from '@/src/theme';
import Toast from "@/src/components/toast/Toast";
import GlobalContext from "@/src/contexts/GlobalContext";

import SideMenu from "@/src/components/sideMenu/SideMenu";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toastProps, setToastProps] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "info" | "warning" | "error",    
    setProps: () => {}
  });

  const [open, setOpen] = useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  return (
    <html lang="en" className={roboto.variable}>      
      <body>      
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <GlobalContext.Provider value={{ toastProps, setToastProps}}>
            <CssBaseline />
            <Toast
              open={toastProps.open}
              message={toastProps.message}
              severity={toastProps.severity}
              setProps= {setToastProps}
              />
            <Box sx={{ display: 'flex' }}>
              <AppBar position="fixed" open={open}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                      {
                        mr: 2,
                      },
                      open && { display: 'none' },
                    ]}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                    Propiedades - IA Booking
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <SideMenu />        
                
              </Drawer>
              <Main open={open}>
                <DrawerHeader />        
                {children}
              </Main>
            </Box>
          </GlobalContext.Provider>
        </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}

