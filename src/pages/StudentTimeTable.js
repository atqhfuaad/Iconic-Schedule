import React, { useState, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Menu, MenuItem, Grid } from '@material-ui/core';
import produce from "immer"
import { useMediaQuery } from 'react-responsive'
import { generateScheduleData, GenerateTimetable } from "../components/Timetable";

// 2 BETTER SOLUTIONS ARE:
// STORING STRINGS INSTEAD OF OBJECTS AS STATES. WHENEVER OBJECT IS NEEDED.
// LAZY LOADING TO STORE INITIAL OBJECT.

function TimeTable({ userInfo = undefined, ruangInfo, isRuangUglyTimetable = false }) {
    // “Create” wouldn’t be quite accurate because the state is only created the first time our component renders.
    // During the next renders, useState gives us the current state. 

    // However, unlike this.setState in a class, updating a state letiable always replaces it instead of merging it.

    // login_name: "B19EC0032", session_id: "120270029700626", full_name: "NUR ATIQAH BINTI MOHD FUA'AD", description: "Pelajar FSKSM"
    // "status":"-",  "semester":1, "kod_subjek":"SCSJ3104", "nama_subjek":"Pembangunan Aplikasi", "kod_kursus":"SCSJ", "seksyen":5, "tahun_kursus":2, "sesi":"2020/2021"
    const isBelowMD960 = useMediaQuery({
        query: '(max-width: 960px)'
    })
    const isAboveMD960 = useMediaQuery({
        query: '(min-width: 960px)'
    })
    // let [userInfo] = useState(() => JSON.parse(localStorage.getItem("auth_user")));
    let [entityData, setEntityData] = useState([]);
    let [scheduleData, setScheduleData] = useState(() => generateScheduleData());
    let [currentIndex, setCurrentIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    
    function changeSesiSemester(idx, entityDataObj) {
        setAnchorEl(null);
        setScheduleData( generateScheduleData() );
        try {
            entityDataObj[idx].forEach((value, index) => {
                let subjek = value['nama_subjek'];
                let seksyen = value['seksyen'];
                // console.log({ subjek, seksyen })
                if (seksyen === undefined || subjek === undefined) return
                let url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=jadual_subjek`;
                url = `${url}&sesi=${value['sesi']}&semester=${value['semester']}&kod_subjek=${value['kod_subjek']}`;
                url = `${url}&seksyen=${value['seksyen']}`;
                fetch(url)
                    .then((data) => { return data.json(); })
                    .then((data) => {
                        data.forEach((val) => {
                            setScheduleData( 
                                produce(newScheduleData => {
                                    let indexHari = parseInt(val['hari']);
                                    let indexMasa = parseInt(val['masa'] - 1);
                                    if (!(isNaN(indexHari) || isNaN(indexMasa))) {
                                        newScheduleData[indexHari][indexMasa] = {
                                            ruang: val['ruang']['nama_ruang_singkatan'],
                                            seksyen,
                                            subjek
                                        }
                                    }
                                }
                                )
                            )
                        })
                    });
            })

            setCurrentIndex(idx)
        }
        finally { }
        // setScheduleData(proxyScheduleData)
    }

    // DEEP COPY OCCURRED NO!!!!
    // let [newArrayString, setNewArrayString] = useState("");

    /// ONLY SETSTATE REUPDATED
    /// BUT WE TRIED TO WITHOUT SETSTATE NOOOO!


    useEffect(() => {
        let url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=";

        if (!Object.is(userInfo, undefined)) {
            if (userInfo.profession === "Student") {
                url = `${url}pelajar_subjek&no_matrik=${userInfo['loginName']}`;
            }
            else if ((userInfo.profession === "Teacher")) {
                url = `${url}pensyarah_subjek&no_pekerja=${userInfo['loginName']}`;
            }
            fetch(url)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    let newEntityDataObjek = [[]], newSesiSemester = [], index = -1, newSesi = "", newSemester = "";
                    data.forEach((value) => {
                        if (value['sesi'] === newSesi && value['semester'] === newSemester) {
                            newEntityDataObjek[index].push(value);
                        }
                        else {
                            index++;
                            newSemester = value['semester'];
                            newSesi = value['sesi'];
                            // newEntityDataObjek.push([]);
                            newEntityDataObjek[index] = [{ ...value }];
                            newSesiSemester.push({ sesi: newSesi, semester: newSemester });
                        }
                    });
                    let string = JSON.stringify(newEntityDataObjek);
                    let object = JSON.parse(string);
                    setEntityData(() => {
                        // if (object[0]['nama_subjek']!==undefined && object[0]['nama_subjek']!==undefined){
                        changeSesiSemester(currentIndex, object);
                        return object;
                        // }
                        // else{
                        //     return [];
                        // }
                    })
                })
            // won't work: setSync is asynchronous. You gotta use other letiables
            // changeSesiSemester(0);
            // setSesiSemester(newSesiSemester);
        }
        if (!Object.is(ruangInfo, undefined)) {
            let url=`http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=jadual_ruang`
            url=`${url}&sesi=${ruangInfo.sesi}&semester=${ruangInfo.semester}&kod_ruang=${ruangInfo.kodRuang}`
            // console.log(url)
            fetch(url)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    setScheduleData( generateScheduleData() );
                    data.forEach((val) => {
                        setScheduleData(
                            produce(newScheduleData => {
                                let indexHari = parseInt(val['hari']);
                                let indexMasa = parseInt(val['masa'] - 1);
                                if (!Object.is(val['subjek'], null)) {
                                    if (!(isNaN(indexHari) || isNaN(indexMasa))) {
                                        newScheduleData[indexHari][indexMasa] = {
                                            subjek: val['subjek']['kod_subjek'],
                                            seksyen: val['subjek']['seksyen']
                                        }
                                    }
                                }
                            }))
                    }
                    )

                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ruangInfo])

    return (
        <>
            {(entityData.length !== 0 && !Object.is(userInfo, undefined)) &&
                <Fragment>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Typography color="primary">
                            Showing for: sesi {entityData[currentIndex][0]['sesi']} semester {entityData[currentIndex][0]['semester']}  <br />
                        </Typography>

                        <Box mt={2}>
                            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup={true} onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                            }}>
                                Change semester
                        <> </>
                            </Button>
                        </Box>
                    </Grid>
                </Fragment>
            }
            {!Object.is(userInfo, undefined) &&
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => {
                        setAnchorEl(null);
                    }}
                >
                    {/* onClick={() => { changeSesiSemester(index) }} */}
                    {
                        entityData.map((value, index) => {
                            return (
                                <MenuItem onClick={() => changeSesiSemester(index, entityData)} key={`${index}`}>
                                    Sesi {value[0]['sesi']}&nbsp; Semester {value[0]['semester']}
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
            }
            {isAboveMD960 &&
                <GenerateTimetable scheduleData={scheduleData} isRuangUglyTimetable={isRuangUglyTimetable} />
            }
            {isBelowMD960 &&
                <Fragment>
                    <Box mt={2}>
                        <Typography textAlign="center" color="textPrimary">
                            Morning Classes
                            </Typography >
                        <GenerateTimetable scheduleData={scheduleData} isRuangUglyTimetable={isRuangUglyTimetable} startIndex={0} endIndex={5} />
                    </Box>
                    <Box mt={2} id="night">
                        <Typography textAlign="center" color="textPrimary">
                            Evening Classes
                            </Typography>
                        <GenerateTimetable scheduleData={scheduleData} isRuangUglyTimetable={isRuangUglyTimetable} startIndex={7} endIndex={13} />
                    </Box>
                </Fragment>
            }

            <div>
                <Box fontSize={10}>
                    Each table cell will show: <br />
                    <Box>
                        [Subject-Section] <br />[Room Name]
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default TimeTable
