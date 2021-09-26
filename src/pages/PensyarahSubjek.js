import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import TableData from '../components/TableData';

function PensyarahSubjek() {

    const [no_pekerja, setNo_pekerja] = useState("27474");
    const url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"
    let entity1 = {
        url,
        argNum: 1,
        entity: "pensyarah_subjek",
        args: [{ name: "no_pekerja", value: no_pekerja }],
        arrayColumns: [
            "sesi",
            "semester",
            "kod_subjek",
            "nama_subjek", 
           "seksyen",
            "bil_pelajar",
        ],
        arraySelectIds: ["no_pekerja"],
        lengthToShow: 10
    }

    return (
        <>

            <TextField className="some-margin"
                onChange={(event) => { setNo_pekerja(event.currentTarget.value) }}
                variant="outlined" 
                value={no_pekerja}
                label="No. Pekerja"
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

export default PensyarahSubjek
