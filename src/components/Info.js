import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../pages/SignInUpSlice';
import { Divider } from '@material-ui/core';

export function Info() {
    return (
        <>
            <UserInfo />
        </>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        padding: '0vh',
        margin: '0vh'
    },
    "@media screen and (max-height: 960px)": {
        root: {
            padding: "0px",
            margin: "0px",
        },
        smallText: {
            fontSize: "0.2em",
        }
    }
}));


export default function UserInfo({ dense = false }) {
    const classes = useStyles();
    let { loginName: login_name, fullName: full_name, description, profession } = useSelector(selectAuthUser);
    let userInfo = { login_name, full_name, description, profession };
    return (
        <div className={`some-margin ${classes.root}}`}>
            <List dense={dense} disablePadding={true} aria-label="main mailbox folders">
                {
                    Object.entries(userInfo).map((val, index) => {
                        let [property, objectValue] = val;
                        return (
                            <Fragment key={`object ${index}`}>
                                <ListItem className={classes.root}>
                                    <ListItemText className={classes.smallText}>
                                        {property.replace(/_/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                                        : {objectValue}
                                    </ListItemText>
                                </ListItem>
                            </Fragment>
                        );
                    })
                }

            </List>
            <br />
            <Divider />
        </div>
    );
}



