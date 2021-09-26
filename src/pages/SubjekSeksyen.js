// Redundant: can be improved! Need 
// arrayColumns: ["nama_subjek", "kod_subjek", "bil_pelajar", "bil_pensyarah", "bil_seksyen"],  // same as that one:"seksyen_list":null
// Needs just one more columns     
import React from 'react'
import { useSelector } from 'react-redux';
import { selectSesiSemester } from '../components/TableDataSlice';
import TableData from '../components/TableData'

function SubjekSeksyen() {

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
    // after redux dispatch entity2 of the parent will get changed. 
    // but the child of this parent needs 2 changes to get correct props
    // DOM is re-rendered only once however as parent re-renders only once
    // so child must use it useEffect() which will render twice
    let { sesi, semester } = useSelector(selectSesiSemester);
    
    let entity2 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 2,
        entity: "subjek_seksyen",
        args: [{ name: "sesi", value: sesi }, { name: "semester", value: semester }],
        arrayColumns: [
            "nama_subjek",
            "bil_pelajar",
            "bil_pensyarah",
            "kod_subjek",
            "bil_seksyen",
        ],
        accordionColumns: [
            "seksyen",
            "bil_pelajar",
            "pensyarah"
        ],
        arraySelectIds: [],
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
                isAccordion={true}
                tableNum={2}
            />
        </>
    )

}

export default SubjekSeksyen
