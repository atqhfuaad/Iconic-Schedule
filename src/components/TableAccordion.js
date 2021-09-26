import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch } from 'react-redux';
import { setSubjekPelajar, setSubjekPensyarah } from './TableDataSlice';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import { Button, Collapse, Divider, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


function TableAccordion({ entityInfo, jsonArray, tableNum }) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > *': {
                borderBottom: 'unset',
            },
        },
        root2: {
            margin: "12px",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        insideAccordion:{
            margin: "10px 5vw 0", width: "80%"
        },
        '@media screen and (max-width: 1000px)': {
            insideAccordion:{ 
            width: "90%"
            }
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();


    function handleClick(index, isExpandMore) {
        /**
         * CLICKING SVG/ ICONS ALWAYS HAS PROBLEMS!
         * AS SVG/ ICONS HAVE A PATH ON WHICH CLICKS OCCUR AS WELL AS THE ATTACHED ONCLICK EVENT 
         * 
         */

        let idDisplayElement = `display${index}`;
        let idIconExpandMore = `iconExpandMore${index}`;
        let idIconExpandLess = `iconExpandLess${index}`;
        let element, sibling;
        let displayElement = document.getElementById(idDisplayElement);
        if (isExpandMore) {
            element = document.getElementById(idIconExpandMore);
            sibling = document.getElementById(idIconExpandLess);
        }
        else {
            sibling = document.getElementById(idIconExpandMore);
            element = document.getElementById(idIconExpandLess);
        }
        element.classList.toggle("none");
        sibling.classList.toggle("none");
        displayElement.classList.toggle("none")
    }

    function handlePelajar(kod_subjek, seksyen) {
        // console.log({kod_subjek, seksyen})
        dispatch(setSubjekPelajar({ kodSubjek: kod_subjek, seksyen }));
        history.push('/~rbnm/subjek_pelajar');

    }
    function handlePensyarah(kod_subjek, seksyen) {
        // console.log({kod_subjek, seksyen})
        dispatch(setSubjekPensyarah({ kodSubjek: kod_subjek, seksyen }));
        history.push('/~rbnm/subjek_pensyarah');

    }

    return (
        <>
            <TableContainer className="table-title" component={Paper} style={{ marginBottom: "10px" }}>
                <Table size="small" aria-label="collapsible table">
                    <TableHead>
                        <TableRow style={{ color: "white !important", backgroundColor: "rgb(76, 255, 228)" }}>
                            <TableCell align="center" key={`${tableNum}last`} />
                            {
                                entityInfo['arrayColumns'].map((value, index) => {
                                    return (
                                        <TableCell align="center" key={`${tableNum}${index}`} >
                                            {value.replace(/_/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                                        </TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            jsonArray.map((value, indexJsonArray) => {
                                if (value === null) {
                                    value = {};
                                    entityInfo.arrayColumns.forEach((val) => {
                                        value[val] = "None";
                                    });
                                }
                                if (value['seksyen_list'] === null) {
                                    value['seksyen_list'] = [{ seksyen: "-", "bil_pelajar": "-", "pensyarah": "-" }];
                                }
                                return (
                                    <Fragment key={indexJsonArray}>
                                        <TableRow className={classes.root}>
                                            <TableCell align="center" key={`${tableNum}last`} aria-label="expand row">
                                                <Typography variant="button">
                                                    <ExpandMoreIcon fontSize="small" id={`iconExpandMore${indexJsonArray}`} onClick={() => { handleClick(indexJsonArray, true) }} />
                                                    <ExpandLessIcon fontSize="small" id={`iconExpandLess${indexJsonArray}`} className="none" onClick={() => { handleClick(indexJsonArray, false) }} />
                                                </Typography>
                                            </TableCell>
                                            {entityInfo.arrayColumns.map((val, idx) => {
                                                return (
                                                    <TableCell align="center" key={`${tableNum}${indexJsonArray}${idx}`} >
                                                        {value[val]}
                                                    </TableCell>
                                                )
                                            })
                                            }

                                        </TableRow>
                                      
                                        <TableRow>
                                            <TableCell className="none" id={`display${indexJsonArray}`} colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <Collapse in={true} timeout="auto" unmountOnExit>
                                                <Divider />
                                                    <div className="insideAccordion">
                                                        <Typography variant="overline" gutterBottom={true} color="primary">
                                                            View subject and section for this subject
                                                        </Typography>

                                                        <TableContainer className="some-miserly-margin">
                                                            <Table size="small" >

                                                                <TableHead>

                                                                    <TableRow className="tableRowNoBorder" style={{ color: "white !important", backgroundColor: "rgb(76, 255, 228)" }}>

                                                                        <TableCell align="center"> Seksyen </TableCell>
                                                                        <TableCell align="center" > Bil Pelajar </TableCell>
                                                                        <TableCell align="center" > Pensyarah </TableCell>
                                                                        {
                                                                            value['seksyen_list'][0]['seksyen'] !== "-" &&
                                                                            <>
                                                                                <TableCell align="center">
                                                                                    Action Pelajar
                                                                            </TableCell>
                                                                                <TableCell align="center">
                                                                                    Action Pelajar
                                                                            </TableCell>
                                                                            </>
                                                                        }
                                                                    </TableRow>
                                                                </TableHead>
                                                                {
                                                                    <TableBody>

                                                                        {
                                                                            value['seksyen_list'].map((valueObject, indexValueObject) => {
                                                                                if (valueObject === null || valueObject === undefined) return null;

                                                                                return (
                                                                                    <TableRow className="tableRowNoBorder" key={`tableAccordion${indexValueObject}`} >
                                                                                        <TableCell align="center">{valueObject['seksyen']} </TableCell>
                                                                                        <TableCell align="center">{valueObject['bil_pelajar']} </TableCell>
                                                                                        <TableCell align="center">{valueObject['pensyarah']} </TableCell>

                                                                                        {value['seksyen_list'][0]['seksyen'] !== "-" &&
                                                                                            <>
                                                                                                <TableCell align="center">
                                                                                                    <Button size="small" variant="outlined" key={`buttonNew${tableNum}${indexValueObject}`}
                                                                                                        onClick={() => handlePelajar(value['kod_subjek'], valueObject['seksyen'])}>
                                                                                                        <Typography style={{ fontSize: 12 }}>
                                                                                                            Pelajar
                                                                                </Typography>
                                                                                                    </Button>
                                                                                                </TableCell>
                                                                                                <TableCell align="center">
                                                                                                    <Button size="small" variant="outlined" key={`buttonNew${tableNum}${indexValueObject}`}
                                                                                                        onClick={() => handlePensyarah(value['kod_subjek'], valueObject['seksyen'])}>
                                                                                                        <Typography style={{ fontSize: 12 }}>
                                                                                                            Pensyarah
                                                                                 </Typography>
                                                                                                    </Button>
                                                                                                </TableCell>
                                                                                            </>
                                                                                        }
                                                                                    </TableRow>
                                                                                )
                                                                            })
                                                                        }
                                                                    </TableBody>

                                                                }
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>

                                )
                            }
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default TableAccordion
