import React from 'react'
import TimeTable from './StudentTimeTable'
import { useSelector } from 'react-redux';
import { selectSesiSemester } from '../components/TableDataSlice';
import { selectKodRuang } from '../components/TableDataSlice';
import TableData from '../components/TableData'
import { Typography } from '@material-ui/core';

function RuangTimetable() {
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
    let { sesi, semester } = useSelector(selectSesiSemester);
    let { kodRuang } = useSelector(selectKodRuang);
    let ruangInfo={sesi, semester, kodRuang}
    // console.log(ruangInfo)
    return (
        <>
            <TableData
                entityInfo={entity1}
                isDropDown={true}
                tableNum={1}
            />
            <div className="some-margin">
            <Typography variant="h5">
                Ruang: {kodRuang}, Sesi: {sesi}, Semester: {semester}
            </Typography>
            </div>
            {// HTML won't be re-rendered if object's properties change.
            //  <TimeTable ruangInfo={{ sesi, semester, kod_ruang: "N28-105-01" }} isAbbrev={false} />
            } 
            <TimeTable ruangInfo={ruangInfo} isRuangUglyTimetable={true} />
        </>
    )
}

export default RuangTimetable
