import React, { useState } from 'react'
import TableData from '../components/TableData'
import { useSelector } from 'react-redux';
import { selectSesiSemester } from '../components/TableDataSlice';
import UserInfo from '../components/Info';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import GraphComponents from '../components/GraphComponents';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));


function AdminGraph({ sesi, semester, graphType }) {
    let [willShowGraph] = useState(true);
    if (willShowGraph) {
        if (graphType === "bil_pelajar") {
            return (
                <>
                    <GraphComponents xAxis='kod_subjek' yAxis='bil_pelajar' height={800} sesi={sesi} semester={semester} />
                </>
            );
        }
        else if (graphType === "bil_seksyen") {
            return (
                <>
                    <GraphComponents xAxis='kod_subjek' yAxis='bil_seksyen' height={460} sesi={sesi} semester={semester} />
                </>
            );
        }
        else if (graphType === "bil_pensyarah") {
            return (
                <>
                    <GraphComponents xAxis='kod_subjek' yAxis='bil_pensyarah' height={800} sesi={sesi} semester={semester} />
                </>
            );
        }
    }
    else {
        return null;
    }
}


export default function AdminProfile() {
    const classes = useStyles();
    const [willShowFirst, setWillShowFirst] = useState(false);
    const [willShowSecond, setWillShowSecond] = useState(false);
    const [willShowThird, setWillShowThird] = useState(false);
    let { sesi, semester } = useSelector(selectSesiSemester);
    const url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"
    let entity1 = {
        url,
        argNum: 0,
        entity: "sesisemester",
        args: [],
        arrayDropdownColumns: ["sesi", "semester"],
        arrletayOtherColumns: ["sesi_semester_id", "tarikh_mula", "tarikh_tamat"],
        arraySelectIds: [],
        lengthToShow: -1
    }
    return (
        <>
            <br/>
            <br/>
            <Typography variant="h5" color="primary">
                User Details
            </Typography>
            <UserInfo />
            <br />
            <Grid container direction="row" justify="space-around" alignItems="center">
                <Grid item md={8} xs={12}>
                    <Typography variant="h5" color="primary">
                        Usage Reports and statistics
                    </Typography>
                </Grid>
                <div className="md-above-invisible"><br/></div>
                <Grid item md={4} xs={12}>
                    <TableData
                        entityInfo={entity1}
                        isDropDown={true}
                        tableNum={1}
                        willTitleOccur={false}
                    />
                </Grid>
            </Grid>
            <div className={classes.root}>
                <br />
             
                <List dense={true} component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={() => { setWillShowFirst(!willShowFirst) }}>
                        <ListItemIcon>
                            <MultilineChartIcon />
                        </ListItemIcon>
                        <ListItemText> Bil Pelajar: Show data for the number of students in each subject.
                        <Button onClick={() => { setWillShowFirst(!willShowFirst) }}>
                                {willShowFirst ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                        </ListItemText>
                    </ListItem>
                    {
                        willShowFirst &&
                        <AdminGraph sesi={sesi} semester={semester} graphType="bil_pelajar" />
                    }

                    <ListItem button onClick={() => { setWillShowSecond(!willShowSecond) }}>
                        <ListItemIcon>
                            <MultilineChartIcon />
                        </ListItemIcon>
                        <ListItemText> Bil Pensyarah: Show data for the number of teachers in each subject.
                        <Button onClick={() => { setWillShowSecond(!willShowSecond) }}>
                                {willShowSecond ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                        </ListItemText>
                    </ListItem>
                    {
                        willShowSecond &&
                        <AdminGraph sesi={sesi} semester={semester} graphType="bil_pensyarah" />
                    }

                    <ListItem button onClick={() => { setWillShowThird(!willShowThird) }}>
                        <ListItemIcon>
                            <MultilineChartIcon />
                        </ListItemIcon>
                        <ListItemText> Bil Seksyen: Show data for the number of sections in each subject.
                        <Button onClick={() => { setWillShowThird(!willShowThird) }}>
                                {willShowThird ? <ExpandLess /> : <ExpandMore />}

                            </Button>
                        </ListItemText>
                    </ListItem>
                    {
                        willShowThird &&
                        <AdminGraph sesi={sesi} semester={semester} graphType="bil_seksyen" />
                    }

                </List>
               
            </div>

        </>
    )
}



// That means you need to call this function this.props.history.goBack(); inside the component that is wrapped by < Route/>

