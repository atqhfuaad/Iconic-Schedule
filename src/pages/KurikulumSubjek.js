import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIdKurikulum } from '../components/TableDataSlice';
import TableData from '../components/TableData';

function KurikulumElektif() {

    const [id_kurikulum] = useState(useSelector(selectIdKurikulum));
    const url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"
    let entity1 = {
        url,
        argNum: 1,
        entity: "kurikulum_subjek",
        args: [{ name: "id_kurikulum", value: id_kurikulum }],
        arrayColumns: [
            "id_kurikulum_subjek",
            "nama_subjek",
            "kod_subjek",
            "semester_ambil",
            "tahun_ambil",
            "kredit",
        ],
        arraySelectIds: ["id_kurikulum"],
        lengthToShow: 10
    }

    return (
        <>
            <TextField className="some-margin"
                variant="outlined" 
                value={id_kurikulum}
                label="ID Kurikulum"
            />
            <TableData
                entityInfo={entity1}
                isTable={true}
                tableNum={1}
                willActionOccur={true}
            />
        </>
    )
}

export default KurikulumElektif
