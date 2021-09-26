import React, { useState } from 'react'
import { selectAdminSessionId } from '../pages/SessionIdSlice';
import { useSelector } from 'react-redux';
import { selectSesiSemester, selectOffset, selectLimit, setLimit, setOffset } from '../components/TableDataSlice';
import TableData from '../components/TableData'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

function Pelajar() {

    let entity1 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 0,
        entity: "sesisemester",
        args: [],
        arrayDropdownColumns: ["sesi", "semester"],
        arrayOtherColumns: ["sesi_semester_id", "tarikh_mula", "tarikh_tamat"],
        arraySelectIds: [],

    }

    // pelajar   -> entity=pelajar&session_id=???&sesi=yyyy/yyyy&semester=[1|2]&limit=num_&offset=num_

    let { sesi, semester } = useSelector(selectSesiSemester);
    let adminSessionId = useSelector(selectAdminSessionId);
    let [limit, setLimit2] = useState(useSelector(selectLimit));
    let [offset, setOffset2] = useState(useSelector(selectOffset));

    let entity2 = {
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 5,
        entity: "pelajar",
        args: [
            { name: "session_id", value: adminSessionId },
            { name: "sesi", value: sesi },
            { name: "semester", value: semester },
            { name: "limit", value: limit },
            { name: "offset", value: offset },
        ],
        arrayColumns: [
            "kod_fakulti",
            "kod_kursus",
            "nama",
            "no_matrik",
            "tahun_kursus"
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

            <div className="paginationDiv">
                <div>
                    [{offset}...{limit} items] &nbsp; &nbsp;
                    Limit &nbsp;
                    <select
                        value={limit}
                        onChange={(event) => {
                            let selectValue = parseInt(event.target.value);
                            setLimit(selectValue);
                            setLimit2(selectValue);
                        }}
                    >
                        <option> 10 </option>
                        <option> 25 </option>
                        <option> 50 </option>
                        <option> 100 </option>
                    </select>
                        &nbsp;
                        items.  &nbsp; &nbsp;
                    </div>
                <div className="paginationDivWrapper">
                    <form>
                        <Input size="small" id="inputOffset" label="Standard" />
                        <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                let inputElement = document.getElementById('inputOffset');

                                let inputValue = inputElement.value;
                                if (inputValue.trim() !== "") {
                                    setOffset(parseInt(inputValue));
                                    setOffset2(parseInt(inputValue));
                                }
                            }}
                        >Set Offset</Button>
                        <Button
                            size="small"
                            color="secondary"
                            variant="outlined"
                            onClick={() => { setOffset(offset + 100); setOffset2(offset + 100) }}
                        >Next 100</Button>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => { setOffset(offset + 200); setOffset2(offset + 200) }}
                        >Next 200</Button>
                    </form>

                </div>
            </div>

            <TableData
                entityInfo={entity2}
                isTable={true}
                tableNum={2}

            />
        </>
    )

}

export default Pelajar

/*

*/

