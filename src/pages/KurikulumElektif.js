import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectIdKurikulumSubjek } from '../components/TableDataSlice';
import TableData from '../components/TableData';
import { TextField } from '@material-ui/core';

function KurikulumSubjek() {
  
    const [id_kurikulum_subjek, setId_kurikulum_subjek] = useState(useSelector(selectIdKurikulumSubjek));
    const url = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
    let entity1 = {
        url,
        argNum: 1,
        entity: "kurikulum_subjek_elektif",
        args: [{ name: "id_kurikulum_subjek", value: id_kurikulum_subjek }],
        arrayColumns: [
            "s.nama_subjek",
            "s.kredit",
            "se.kod_subjek"
        ],
        arraySelectIds: ["id_kurikulum_subjek"],
        lengthToShow: 10
    }

    return (
        <>

            <TextField className="some-margin"
             onChange={(event) => { setId_kurikulum_subjek(event.currentTarget.value) }} 
             variant="outlined" 
            //  value={id_kurikulum}
             label="ID Kurikulum Subjek"
             value={id_kurikulum_subjek} 
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

export default KurikulumSubjek
