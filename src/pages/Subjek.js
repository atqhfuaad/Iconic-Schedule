import React from 'react'
import { useSelector } from 'react-redux';
import { selectSesiSemester } from '../components/TableDataSlice';
import TableData from '../components/TableData'

function Subjek() {
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
    // after redux dispatch entity2 of the parent will get changed. 
    // but the child of this parent needs 2 changes to get correct props
    // DOM is re-rendered only once however as parent re-renders only once
    // so child must use it useEffect() which will render twice
    let { sesi, semester } = useSelector(selectSesiSemester);
    // console.log({ sesi, semester });
    let entity2 = {
        url,
        argNum: 2,
        entity: "subjek",
        args: [{ name: "sesi", value: sesi }, { name: "semester", value: semester }],
        arrayColumns: ["nama_subjek", "kod_subjek", "bil_pelajar", "bil_pensyarah", "bil_seksyen"],
        arraySelectIds: ["sesi", "semester"],
        lengthToShow: 10
    }
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

export default Subjek
