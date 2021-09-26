import React from 'react'
import UserInfo from '../components/Info'
import TableData from '../components/TableData'

function Profile({ profession, loginName, isAdmin=false }) {
    let entityStudent = null;
    let entityTeacher = null;
    entityStudent={
        url: "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        argNum: 1,
        entity: "pelajar_subjek",
        args: [{ name: "no_matrik", value: loginName }],
        arrayColumns: [ "sesi","semester", "kod_subjek", "nama_subjek", "seksyen", "tahun_kursus"],
        arraySelectIds: [],
        lengthToShow: 10
    }
    
    // copy objects effortlessly
    entityTeacher= {...entityStudent,
        entity: "pensyarah_subjek",
        args: [{ name: "no_pekerja", value: loginName }],
        arrayColumns: [ "sesi","semester", "kod_subjek", "nama_subjek", "seksyen", "bil_pelajar", "kod_fakulti"] 
    }


    if ((profession === "Student" || profession === "Teacher" )) {
        return (
            <>
                { !isAdmin &&
                <UserInfo />
                }
                { (profession === "Student")
                    &&
                    <>
                        <TableData entityInfo={entityStudent} isTable={true} tableNum={1} />

                    </>
                }
                { (profession === "Teacher")
                    &&
                    <>
                        <TableData entityInfo={entityTeacher} isTable={true} tableNum={2} />
                    </>
                }
            </>
        )
    }
    else {
        return <div>We'll kill you, hacker</div>
    }
}

export default Profile


    // ?entity=k&no_matrik=A18CS3026
    //   "sesi":"2020/2021",
    //   "":5,
    //   "":"SCSJ3104",
    //   "":2,
    //   "nama_subjek":"Pembangunan Aplikasi",
    //   "status":"-",
    //   "":1,
