import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import TableData from '../components/TableData';

function PelajarSubjek() {

    const [no_matrik, setNo_matrik] = useState("B19EC0032");
    const url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"
    let entity1 = {
        url,
        argNum: 1,
        entity: "pelajar_subjek",
        args: [{ name: "no_matrik", value: no_matrik }],
        arrayColumns: [
            "nama_subjek",
            "kod_subjek",
            "tahun_kursus",
            "semester",
            "sesi",
            "seksyen"
        ],
        arraySelectIds: ["no_matrik"],
        lengthToShow: 10
    }

    return (
        <>

            <TextField className="some-margin"
                onChange={(event) => { setNo_matrik(event.currentTarget.value) }}
                variant="outlined"
                value={no_matrik}
                label="No. Matrik"
            />
            <TableData
                entityInfo={entity1}
                isTable={true}
                tableNum={1}
                willTitleOccur={false}
            />
        </>
    )
}

export default PelajarSubjek
