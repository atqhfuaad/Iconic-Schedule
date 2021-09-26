import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from "@material-ui/core/Icon";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import Switch from '@material-ui/core/Switch';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../pages/SignInUpSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: "lavendar",
    textAlign: "center"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "radial-gradient(circle at center center, rgba(7,255,250, 0.4) 0%, rgba(7,255,250, 0.4) 7%,transparent 7%, transparent 100%),linear-gradient(90deg, rgb(244,252,252),rgb(244,252,252)); background-size: 16px 16px"
  },
  drawerHeader: {
    backgroundImage: "radial-gradient(circle at center center, rgba(46,223,250, 0.99) 0%, rgba(46,223,250, 0.99) 7%,transparent 7%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255)); background-size: 16px 16px"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: 0,
  },
  '@media screen and (max-width: 1000px)': {

    appBarShift: {
      width: `calc(100%)`,
      marginLeft: "60vw",
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: "60vw",
    },
    drawerPaper: {
      width: "60vw",
    },
    content: {
      marginLeft: "-60vw"
    },
    appBar: {
      padding: "0px 10px"
    },
    '@media screen and (max-width: 600px)': {
      appBarShift: {
        width: `calc(100%)`,
        marginLeft: "80vw",
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawer: {
        width: "80vw",
      },
      drawerPaper: {
        width: "80vw",
      },
      content: {
        marginLeft: "-80vw"
      },
      appBar: {
        padding: "0px 10px"
      },
    }
}

}));

// let teacherSpecial = [{ text: 'Subjek', url: "/sesisemester", icon: "subject" },];
// professionString

const NavItem = ({ url, text, icon }) => {
  return (
    // <> </>
    <Link to={url}>
      <ListItem button key={`${text}${url}${icon}`}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText component={'span'} variant={'body2'}>
          {text}
        </ListItemText>
      </ListItem>
    </Link>
  )
}

export default function PersistentDrawerLeft({ professionString, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    dispatch(setAuthUser(null));
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_admin");
    window.location.href = "/~rbnm/"
  };

  let nonAdminLinks1= [
    { text: 'Profile', url: "/~rbnm/", icon: "home" },
    { text: 'User Timetable', url: "/~rbnm/timetable", icon: "today" },
  ]
  let adminLinks1= [
    { text: 'Profile', url: "/~rbnm/", icon: "home" }
  ]
  let finalLinks1=[];
  if (professionString==="Admin"){ finalLinks1= [...adminLinks1]; }
  else if (professionString==="Teacher"){ finalLinks1= [...nonAdminLinks1]; }
  else if (professionString==="Student"){ finalLinks1= [...nonAdminLinks1]; }


  let adminLinks2= [
    { text: "Subjek", url: "/~rbnm/subjek", icon: "school" },
    { text: "Pensyarah", url: "/~rbnm/pensyarah", icon: "school" },
    { text: "Pelajar", url: "/~rbnm/pelajar", icon: "school" },
    { text: "Pensyarah Subjek", url: "/~rbnm/pensyarah_subjek", icon: "school" },
    { text: "Pelajar Subjek", url: "/~rbnm/pelajar_subjek", icon: "school" },
    { text: 'Subjek Seksyen', url: "/~rbnm/subjek_seksyen", icon: "school" },
    { text: 'Kurikulum', url: "/~rbnm/kurikulum", icon: "school" },
    { text: 'Ruang', url: "/~rbnm/ruang", icon: "room_meeting" },
  ]
  let studentLinks2=[
    { text: 'Subjek Seksyen', url: "/~rbnm/subjek_seksyen", icon: "school" },
    { text: 'Kurikulum', url: "/~rbnm/kurikulum", icon: "school" },
    { text: 'Ruang', url: "/~rbnm/ruang", icon: "room_meeting" }, 
  ]
  let teacherLinks2=[
    { text: "Subjek", url: "/~rbnm/subjek", icon: "school" },
    { text: "Pensyarah Subjek", url: "/~rbnm/pensyarah_subjek", icon: "school" },
    { text: "Pelajar Subjek", url: "/~rbnm/pelajar_subjek", icon: "school" },
    { text: 'Subjek Seksyen', url: "/~rbnm/subjek_seksyen", icon: "school" },
    { text: 'Kurikulum', url: "/~rbnm/kurikulum", icon: "school" },
    { text: 'Ruang', url: "/~rbnm/ruang", icon: "room_meeting" }, 
  ]

  let finalLinks2=[];

  if (professionString==="Student"){ finalLinks2= [...studentLinks2]; }
  else if (professionString==="Teacher"){ finalLinks2= [...teacherLinks2]; }
  else if (professionString==="Admin"){ finalLinks2= [...adminLinks2]; }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <span
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide, "buttonSpan-outlined")}
            >
              <span className= "buttonSpan">
              <MenuIcon fontSize="small" />
              </span>
              <span className="md-below-invisible">
              MENU 
              </span>
            </span>
            <div style={{margin:"auto"}}>
              <Typography
                component="h3"
                variant="h3"
                color="inherit"
                align="center"
                className={classes.toolbarTitle}
              >
                ICONIC FOUR SCHEDULER  
              </Typography>
            </div>
          </Toolbar>
          <Divider />
          <div>
            <Typography align="center">
              Made by: School of Computing, Universiti Teknologi Malaysia.
          {/* <Button variant="outlined" >LOG OUT</Button> */}
            </Typography>
          </div>

        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          style={{ backgroundImage: "white" }}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List dense={true} disablePadding={true} className={classes.drawerHeader}>
            <>
              {finalLinks1.map(  ({ text, url, icon },index) => { 
                return (
                <NavItem text={text} url={url} icon={icon} key={`${index}firstNav`} />
              );})}
              {!Object.is(professionString, "Admin") &&
              <Divider />
              }
              {finalLinks2.map(({ text, url, icon }, index) => { 
                return (
                <NavItem text={text} url={url} icon={icon} key={`${index}secondNav`} />
              ) } )}
              <Divider />
              <ListItem button key="logout">
                <ListItemIcon>
  
                    <Switch
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                
                </ListItemIcon>
                <ListItemText>
                  Logout
                  </ListItemText>
              </ListItem>

              <Divider />
            </>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className="grid-container"/>
          <Grid container dense="true" component="div" className="paperMainGrid">

            <Grid item md={2} xs={12} sm={false} component="div" className="paperSidePart">

            </Grid>

            <Grid item md={8} xs={12} sm={12} component="div" className="paperMiddlePart">
              <div className="paddingGiver">
              <br />

              {children}
              </div>
            </Grid>

            <Grid item md={2} xs={12} sm={false} component="div" className="paperSidePart">

            </Grid>
          </Grid>
        </main>
      </div>
      <Footer />
    </>
  );
}
