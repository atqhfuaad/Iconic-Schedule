import React from 'react'
import TableData from '../components/TableData'

function SesiSemester() {
    const url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"
    let entity1 = {
        url,
        argNum: 0,
        entity: "sesisemester",
        args: [],
        arrayColumns: ["sesi", "semester", "sesi_semester_id", "tarikh_mula", "tarikh_tamat"],
        arraySelectIds: [],
        lengthToShow: -1
    }
    
    return (
        <>
            <TableData
                entityInfo={entity1}
                isTable={true}
                tableNum={1}
                willActionOccur={true}
            />
        </>
    )

}

export default SesiSemester



