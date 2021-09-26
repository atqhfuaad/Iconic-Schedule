import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { Divider, Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


export function HeaderFinal() {
  const [headerTitle] = useState("ICONIC 4 SCHEDULE APP");
  const [headerSections] = useState(
    [{ title: "Jadual Waktu", url: "/others" },
    { title: "Timetable", url: "/timetable" },
    { title: "Sesi & Sem", url: "/" }]);
  return (
    <>
      <Header title={headerTitle} sections={headerSections} />
    </>
  )
}

export function Header(props) {
  const classes = useStyles();
  const { title } = props;

  return (

    <React.Fragment>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
      >
      </Drawer>
      
      <Toolbar className={classes.toolbar}>
        
       
      </Toolbar>
      <Box m={1}>
        
       </Box>
      <Divider />
    </React.Fragment>
  );
}

// Header.propTypes = {
//   sections: PropTypes.array,
//   title: PropTypes.string,
// };