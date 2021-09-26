import React from 'react'
import { selectAdminSessionId } from '../pages/SessionIdSlice';
import { useSelector } from 'react-redux';
import { selectSesiSemester } from '../components/TableDataSlice';
import TableData from '../components/TableData'

function Pensyarah() {
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

    // http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pensyarah&session_id=480216810538698&sesi=2019/2020&semester=1

    let { sesi, semester } = useSelector(selectSesiSemester);
    let adminSessionId = useSelector(selectAdminSessionId);

    let entity2 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 3,
        entity: "pensyarah",
        args: [
            { name: "session_id", value: adminSessionId },
            { name: "sesi", value: sesi },
            { name: "semester", value: semester },
        ],
        arrayColumns: [
            "bil_seksyen",
            "bil_subjek",
            "no_pekerja",
            "bil_pelajar",
            "nama"
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
            
            <br />
           
            <TableData
                entityInfo={entity2}
                isTable={true}
                tableNum={2}
            />
        </>
    )

}

export default Pensyarah

/*

*/