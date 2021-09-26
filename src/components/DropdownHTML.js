import { useDispatch, useSelector } from 'react-redux';
import { setSesiSemester, setSesiMasuk, selectSesiSemester } from './TableDataSlice';
import React, { Fragment, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useLocation, useHistory } from 'react-router-dom';


function DropdownHTML({ entityInfo, jsonArray, willTitleOccur=true }) {
    
    const dispatch = useDispatch();
    let {sesi, semester} = useSelector(selectSesiSemester);
    let stringValue = `sesi ${sesi} semester ${semester}`;
    const location = useLocation();
    const history= useHistory();

    let handleChange = (event) => {
        let optionValue = event.target.value;
        
        if (entityInfo.entity === "kurikulum") {
            let sesi_masuk = optionValue.substring(11, 20);
            dispatch(setSesiMasuk({ sesi_masuk }));
        }
        else {
            let sesi = optionValue.substring(5, 14);
            let semester = optionValue.substring(24, 25);
            dispatch(setSesiSemester({ sesi, semester }));
            if (location.pathname==="/admin_graph"){
                // console.log({location:location.pathname});
                history.push(location.pathname)
            }
        }
    }

    useEffect(() => {
        let dropDownMenu= document.querySelector('.dropdownMenu');
        dropDownMenu.value=stringValue;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {willTitleOccur && <>
             {/* <span>Path : {location.pathname}</span> */}

                <Typography className="menu-title" component="h2" variant="h6" color="primary">
                    Choose for {entityInfo['entity'].replace(/_/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    {entityInfo.args.map((value, index) => {
                        return (
                            <Fragment key={`${value['name']}${index}`}>
                                {value['name']} {value['value']}
                            </Fragment>
                        )
                    })}
                </Typography>
            </>
            }
            <FormControl>
                <Select native onChange={handleChange} className="dropdownMenu">
                    
                    {jsonArray.map((value, index) => {
                        let str = "";
                        if (value === null) {
                            str = "No data";
                        }
                        else {
                            entityInfo.arrayDropdownColumns.forEach((val) => {
                                str += (val.replace(/_/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) + " " + value[val] + " ");
                            })
                        }
                        return (
                            <option value={str} key={`B${index}`}>
                                {str}
                            </option>
                        )
                    })
                    }

                </Select>
            </FormControl>
        </>
    )
}

export default DropdownHTML
