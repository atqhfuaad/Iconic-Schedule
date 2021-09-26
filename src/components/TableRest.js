import React from 'react';
import { useHistory } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch } from 'react-redux';
import { setSesiSemester, setKodRuang, setIdKurikulum, setIdKurikulumSubjek } from './TableDataSlice';
import { Button, Typography } from '@material-ui/core';

function TableRest({ entityInfo, jsonArray, tableNum, willActionOccur = false, startOffSet, lengthToShow }) {
    /*
        Lift state up if n
        Props are Read-Only
        let sortHandleChild = (stringIndex)=>{
            jsonArray= sortByKey(stringIndex, entityInfo, jsonArray, tableNum);
        };
    */
    const dispatch = useDispatch();
    const history = useHistory();

    let handleChange = (event, jsonObject) => {
        if (entityInfo.entity === "sesisemester") {
            dispatch(setSesiSemester({ sesi: jsonObject['sesi'], semester: jsonObject['semester'] }));
            history.push('/~rbnm/subjek');
        }

        else if (entityInfo.entity === "ruang") {
            dispatch(setKodRuang({ kodRuang: jsonObject['kod_ruang'] }));     // dispatch(setSesiMasuk({ sesi_masuk }));
            // console.log(jsonObject['kod_ruang'])
            history.push('/~rbnm/ruang_timetable');
        }

        // kurikulum-->id_kurikulum 
        // gives next page=>
        // kurikulum_subjek-->id_kurikulum_subjek
        // gives next page=>
        // kurikulum_subjek_elektif

        else if (entityInfo.entity === "kurikulum") {
            // console.log({ jsonObject, obj: jsonObject['id_kurikulum'] })
            dispatch(setIdKurikulum(jsonObject['id_kurikulum']));     // dispatch(setSesiMasuk({ sesi_masuk }));
            history.push('/~rbnm/kurikulum_subjek');
        }

        else if (entityInfo.entity === "kurikulum_subjek") {
            // console.log({ jsonObject, obj: jsonObject['id_kurikulum_subjek'] })
            dispatch(setIdKurikulumSubjek(jsonObject['id_kurikulum_subjek']));     // dispatch(setSesiMasuk({ sesi_masuk }));
            history.push('/~rbnm/kurikulum_elektif');
        }

    }
    // console.log({ startOffSet, end: startOffSet + lengthToShow, lengthToShow })

    if (entityInfo.entity === "pelajar") {
        
        return (
            <>  
                {jsonArray.map((value, index) => {
                    if (value === null) {
                        value = {};
                        entityInfo.arrayColumns.forEach((val) => {
                            value[val] = "None";
                        });
                    }
                  
                    return (
                        <TableBody key={index} style={{ minWidth: "100%" }}>
                            <TableRow>
                                {entityInfo.arrayColumns.map((val, idx) => {
                                    return (
                                        <TableCell align="center" key={`${tableNum}${index}${idx}`} >{value[val]}</TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableBody>
                    )
                  
                }
                )}
            </>
        )
    }

    if (!willActionOccur) {
        return (
            <>
                {jsonArray.map((value, index) => {
                    if (value === null) {
                        value = {};
                        entityInfo.arrayColumns.forEach((val) => {
                            value[val] = "None";
                        });
                    }
                    if ((index >= startOffSet) && (index < (startOffSet + lengthToShow))) {
                        return (
                            <TableBody key={index} style={{ minWidth: "100%" }}>
                                <TableRow>
                                    {entityInfo.arrayColumns.map((val, idx) => {
                                        return (
                                            <TableCell align="center" key={`${tableNum}${index}${idx}`} >{value[val]}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableBody>
                        )
                    }
                    else {
                        return null;
                    }
                })}
            </>
        )
    }
    else if (willActionOccur) {
        return (
            <>
                {jsonArray.map((value, index) => {
                    if (value === null) {
                        value = {};
                        entityInfo.arrayColumns.forEach((val) => {
                            value[val] = "None";
                        });
                    }
                    if ((index >= startOffSet) && (index < (startOffSet + lengthToShow))) {

                        return (
                            <TableBody key={index} style={{ minWidth: "100%" }}>
                                <TableRow>
                                    {entityInfo.arrayColumns.map((val, idx) => {
                                        return (
                                            <TableCell align="center" key={`${tableNum}${index}${idx}`} >{value[val]}</TableCell>
                                        )
                                    })
                                    }
                                    <TableCell align="center">
                                        <Button size="small" variant="outlined" key={`buttonNew${tableNum}${index}`} onClick={(event) => handleChange(event, jsonArray[index])}>
                                            <Typography style={{ fontSize: 12 }}> Click </Typography>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    }
                    else {
                        return null;
                    }
                })}
            </>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}


export default TableRest
