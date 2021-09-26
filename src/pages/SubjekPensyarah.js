import React from 'react'
import { useSelector } from 'react-redux';
import { selectSesiSemester, selectSubjekPensyarah } from '../components/TableDataSlice';
import TableData from '../components/TableData'

function SubjekPensyarah() {
    let entity1 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 0,
        entity: "sesisemester",
        args: [],
        arrayDropdownColumns: ["sesi", "semester"],
        arrayOtherColumns: ["sesi_semester_id", "tarikh_mula", "tarikh_tamat"],
        arraySelectIds: [],
        lengthToShow: -1
    }

    let { sesi, semester } = useSelector(selectSesiSemester);
    let { kodSubjek, seksyen } = useSelector(selectSubjekPensyarah);

    let entity2 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 2,
        entity: "subjek_pensyarah",
        args: [
        { name: "kod_subjek", value: kodSubjek },
        { name: "sesi", value: sesi },
        { name: "semester", value: semester }, 
        { name: "seksyen", value: seksyen }
        ],
        arrayColumns: [
            "semester",
            "seksyen",
            "nama",
            "sesi"
        ],
        arraySelectIds: [],
        lengthToShow: 10
    };

    return (
        <>
            <TableData
                entityInfo={entity1}
                isDropDown={true}
                tableNum={1}
            />

            <TableData
                entityInfo={entity2}
                isTable={true}
                tableNum={2}
            />
        </>
    )

}

export default SubjekPensyarah
