import React from 'react'
import { selectAdminSessionId } from '../pages/SessionIdSlice';
import { useSelector } from 'react-redux';
import { selectSesiSemester, selectSubjekPelajar } from '../components/TableDataSlice';
import TableData from '../components/TableData'

function SubjekPelajar() {
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
    let { kodSubjek, seksyen } = useSelector(selectSubjekPelajar);
    let adminSessionId  = useSelector(selectAdminSessionId);
    
    // http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=subjek_pelajar
    // &session_id=???&sesi=2019/2020&semester=2&kod_subjek=SCSJ2253&seksyen=2

    // session id 
    // http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=authentication&login=ad2021&password=scsx3104

    let entity2 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 5,
        entity: "subjek_pelajar",
        args: [
            // session_id=???&
            // sesi=yyyy/yyyy&
            // semester=[1|2]&
            // kod_subjek=???
            // &seksyen=???
            { name: "session_id", value: adminSessionId },
            { name: "sesi", value: sesi },
            { name: "semester", value: semester },
            { name: "kod_subjek", value: kodSubjek },
            { name: "seksyen", value: seksyen }
        ],

        arrayColumns: [
            "kod_fakulti",
            "nama",
            "kod_kursus",
            "no_kp",
            "status",
            "tahun_kursus"
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
                className="some-top-margin"
                entityInfo={entity2}
                isTable={true}
                tableNum={2}
                willTitleOccur={true}
            />
        </>
    )
}

export default SubjekPelajar
