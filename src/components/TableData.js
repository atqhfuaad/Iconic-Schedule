// CONDENSE TABLE
import React, { useState, useEffect, Fragment } from 'react'
import { generateURL, generateLocalStorageName, sortByKey, getLengthToShow } from "./helper"
import TableRest from "./TableRest"
import DropdownHTML from "./DropdownHTML"
import TableAccordion from "./TableAccordion"
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { setFetchFirstTime, setAdminSessionId, selectFetchFirstTime } from "../pages/SessionIdSlice";
import { useSelector, useDispatch } from 'react-redux';
import { ExpandMore, ExpandLess } from '@material-ui/icons'


function TableData({ entityInfo, isTable = false, isAccordion = false, isDropDown = false, tableNum = 1, willActionOccur = false, willTitleOccur = true }) {

    let [jsonArray, setJsonArray] = useState([]);
    let fetchFirstTime = useSelector(selectFetchFirstTime);
    const dispatch = useDispatch();
    // after redux dispatch entity2 of the parent will get changed. 
    // but the child of this parent needs 2 changes to get correct props
    // DOM is re-rendered only once however as parent re-renders only once
    // so child must use it useEffect() which will render twice with props
    // is useEffect() dependency array
    let sortHandleChild = (stringIndex) => {
        setJsonArray(sortByKey(stringIndex, entityInfo, [...jsonArray], tableNum));
    };
    let [startOffset, setStartOffset] = useState(0);
    let length = parseInt(jsonArray.length);
    let [lengthToShow, setLengthToShow] = useState(parseInt(getLengthToShow()));
    // if (lengthToShow>length){lengthToShow=length;}
    let numberOfPagination = (length % lengthToShow === 0) ? length / lengthToShow : Math.ceil(length / lengthToShow)
    let indexPagination = [];
    for (let count = 0; count < numberOfPagination; count++) {
        indexPagination.push(count);
    }

    function displayPages(event, number) {
        let target= event.target;
        target.className+= " active";
        console.log({target})
        setStartOffset(number * parseInt(lengthToShow));

    }

    function add(a, b, c) {
        if (a + b <= c) return a + b;
        else return c;
    }

    useEffect(() => {

        // FETCH WILL ONLY OCCUR AS IT'S BASED ONCE BASED ON [ENTITYENFO]

        let mounted = true;
        let localStorageName = generateLocalStorageName(entityInfo);
        let fetchFromLocalStorage = localStorage.getItem(localStorageName);
        if (fetchFromLocalStorage !== null && fetchFromLocalStorage !== "") {
            fetchFromLocalStorage = [...JSON.parse(fetchFromLocalStorage)];
            setJsonArray(fetchFromLocalStorage);
        }
        else {
        let url = generateURL(entityInfo);
        // console.log(url)
        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (mounted) {
                    // localStorage.setItem(localStorageName, JSON.stringify(data));
                    dispatch(setFetchFirstTime(true));
                    // console.log(data)
                    setJsonArray([...data]);
                }
            })
            .catch(err => {
                if (fetchFirstTime) {
                    let willSessionId = entityInfo.args.findIndex(value => { return value.name === "session_id" })
                    // console.log({ willSessionId, fetchFirstTime });
                    if (willSessionId !== -1) {
                        dispatch(setFetchFirstTime(false));
                        dispatch(setAdminSessionId());
                    }
                }
            })
        return function cleanup() {
            mounted = false;
        }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entityInfo])

    if (isTable) {
        return (
            <>
                
                {
                    willTitleOccur &&
                    <Typography component="h2" variant="h6" color="primary" className="table-title">
                        Showing: entity: {entityInfo['entity'].replace(/_/g, " ")},
                        {entityInfo.args.map((value, index) => {
                        return (
                            <Fragment key={`${tableNum}${index}`} >
                                &nbsp;
                                {value['name'].replace(/_/g, " ")}:
                                    &nbsp;
                                {value['value']},
                            </Fragment>
                        )
                    })}
                    </Typography>
                }
                {
                entityInfo['entity']!=="pelajar" &&
                <div className="paginationDiv">
                    <div>
                        Showing maximum &nbsp;
                        <select
                            value={lengthToShow}
                            onChange={(event) => {
                                let selectValue = event.target.value;
                                setLengthToShow(selectValue);
                                localStorage.setItem("lengthToShow", selectValue)
                            }}
                        >
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 20 </option>
                            <option> 30 </option>
                            <option> 50 </option>
                            {/* <option> {lengthToShow} </option> */}
                        </select>
                        &nbsp;
                        items.  &nbsp; &nbsp;
                    </div>
                    <div className="paginationDivWrapper">
                    Total {length} items: [{startOffset + 1}...{add(startOffset, parseInt(lengthToShow), length)} ] &nbsp; &nbsp;
                        {

                            indexPagination.map((value, index) => {
                                if (index<9){
                                return (
                                    <Fragment  key={`pagination${index}`}>
                                        <span className="paginationSpan" id="spanPages" onClick={(event) => displayPages(event, index)} >
                                            {value + 1}
                                        </span>
                                    </Fragment>
                                )
                                }
                                else{
                                    return (
                                        <Fragment  key={`pagination${index}`}>
                                        <span className="paginationSpan paginationLargeSpan" id="spanPages" onClick={(event) => displayPages(event, index)} >
                                            {value + 1}
                                        </span>
                                    </Fragment>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                 }
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {
                                    entityInfo['arrayColumns'].map((value, index) => {
                                        return (
                                            <TableCell align="center" key={`${tableNum}${index}`} onClick={() => sortHandleChild(`${index}`)}>
                                                {value.replace(/_/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                                                <>
                                                    <span className={`sortIndicator none`}>
                                                        +
                                                    </span>
                                                    <span className={`sortFront`}>
                                                        <ExpandMore color="secondary" fontSize="small"/>
                                                    </span>
                                                    <span className={`sortBack none`}>
                                                        <ExpandLess color="secondary" fontSize="small"/>
                                                    </span>
                                                </>
                                            </TableCell>
                                        );
                                    })
                                }
                                {
                                    willActionOccur && <TableCell align="center">Action</TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        {
                            !isAccordion && entityInfo!=="pelajar" &&
                            <TableRest
                                entityInfo={entityInfo}
                                jsonArray={jsonArray}
                                tableNum={1}
                                willActionOccur={willActionOccur}
                                willTitleOccur={willTitleOccur}
                                startOffSet={startOffset}
                                lengthToShow={parseInt(lengthToShow)}
                            />
                        }
                         {
                            !isAccordion && entityInfo==="pelajar" &&
                            <TableRest
                                entityInfo={entityInfo}
                                jsonArray={jsonArray}
                                tableNum={1}
                            />
                        }
                    </Table>
                </TableContainer>

            </ >
        )
    }
    else if (isDropDown) {
        return (
            <>
                <DropdownHTML
                    key={tableNum}
                    entityInfo={entityInfo}
                    jsonArray={jsonArray}
                    willTitleOccur={willTitleOccur} />
            </>
        )
    }
    else if (isAccordion) {
        return (
            <TableAccordion
                entityInfo={entityInfo}
                jsonArray={jsonArray}
                tableNum={tableNum}
            />
        );
    }
    else {
        return (
            <Typography component="h2" variant="h6" color="primary">
                State whether you want table or dropdown menu, dev
            </Typography>
        )
    }
}

export default TableData
