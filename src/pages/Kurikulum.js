import React from 'react'
import { useSelector } from 'react-redux';
import { selectSesiMasuk } from '../components/TableDataSlice';
import TableData from '../components/TableData'

export function Kurikulum() {
    let entity1 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 0,
        entity: "kurikulum",
        args: [],
        arrayDropdownColumns: ["sesi_masuk"],
        arrayOtherColumns: [],
        arraySelectIds: [],
        lengthToShow: -1
    }
    // after redux dispatch entity2 of the parent will get changed. 
    // but the child of this parent needs 2 changes to get correct props
    // DOM is re-rendered only once however as parent re-renders only once
    // so child must use it useEffect() which will render twice

    let { sesi_masuk } = useSelector(selectSesiMasuk);
    let entity2 = {
        url:"http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 1,
        entity: "kurikulum",
        args: [{ name: "cohort", value: sesi_masuk }],
        arrayColumns: ["tahun_masuk", "sesi_masuk", "kod_kurikulum", "id_kurikulum", "nama_kurikulum"],
        arraySelectIds: [],
        lengthToShow: 10
    }

    return (
        <>
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
                    willActionOccur={true}
                />
            </>
        </>
    )

}
    // kurikulum-->id_kurikulum 
    // gives next page =>
    // kurikulum_subjek-->id_kurikulum_subjek
    // gives next page=>
    // kurikulum_subjek_elektif
