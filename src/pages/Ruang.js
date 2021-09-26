import {  Divider } from '@material-ui/core';
import React from 'react'
import TableData from '../components/TableData';

function Ruang() {
    let entity2 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 1,
        entity: "ruang",
        args: [{ name: "kod_fakulti", value: "FSKSM" }],
        arrayColumns: [
            "nama_ruang_singkatan",
            "nama_ruang",
            "kod_jabatan",
            "kapasiti",
            "kod_ruang"
        ],
        arraySelectIds: [],
        lengthToShow: 10
    }


    return (
        <>
            <TableData
                entityInfo={entity2}
                isTable={true}
                tableNum={1}
                willActionOccur={true}
            />

            <Divider />
            {/* <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item md={6}>
                    <Typography color="primary"> kod fakulti &nbsp;
                    <Input margin="dense" name="kod_fakulti" onChange={(event) => { handleInputChange(event) }}
                            placeholder={`${kod_fakulti}`} />
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography color="primary"> kod ruang like  &nbsp;
                    <Input margin="dense" name="kod_ruang_like" onChange={(event) => { handleInputChange(event) }}
                            placeholder={`${kod_ruang_like}`} />
                    </Typography>
                </Grid> 
            </Grid>*/}

            {/* <TableData
                    entityInfo={entity1}
                    isTable={true}
                    tableNum={1}
                /> */}



        </>
    )
}

export default Ruang

