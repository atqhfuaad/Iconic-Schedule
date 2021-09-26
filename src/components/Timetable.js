import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core';

export function stringAbbrv (stringToAbbrev) { 
    try { return stringToAbbrev.match(/\b(\w)/g).join('') } catch { return "" } 
}
// INITIAL STATE CANNOT SET 
export function generateScheduleData() {
    let newArray = [];
    // 7 rows for 7 days/hari (1-7), 14 columns for 14 times/masa 
    for (let i = 0; i < 7; i++) {
        newArray.push([]);
        for (let j = 0; j < 12; j++) {
            newArray[i].push({});
        }
    }
    return newArray;
}

export function generateDayState() {
    return "SAT SUN MON TUE WED THU FRI".split(" ")
}

export function generateTimeState() {
    let newArray = [];
    for (let i = 0; i < 12; i++) {
        let time = i + 7;
        let timeString = "";
        if (time > 12) {
            timeString = `${time % 12} PM`;
        }
        else if (time === 12) {
            timeString = `${time} PM`;
        }
        else {
            timeString = `${time % 12} AM`;
        }
        newArray.push(timeString);
    }
    return newArray
}

export const useStyles = makeStyles({
    container: {
        padding: "2em 0em 0em",
        margin: "0.5em 1em",
    },
    "@media screen and (max-width: 960px)": {
        container: {
            padding: "2em 0.5em 2em",
            margin: "0.5em",
        }
    }
});
// py={2} px={8} mx={8} my={2}
export const useStylesCells = makeStyles({
    root: {
        width: "90px",
        height: "60px",
        fontSize: "1em",
        textAlign: "center",
        padding: "0px"
    },
    "@media screen and (max-width: 960px)": {
        root: {
            fontSize: "0.9em",
        }
    }
});

export const useStylesUglyCells = makeStyles({
    root: {
        width: "90px",
        height: "60px",
        fontSize: "0.85em",
        textAlign: "center",
        padding: "0px"
    },
    "@media screen and (max-width: 960px)": {
        root: {
            fontSize: "0.9em",
        }
    }
});

export function GenerateTimetable({ scheduleData, isRuangUglyTimetable=false, startIndex = 0, endIndex = 14 }) {
    let newTimeState= generateTimeState();
    let newDayState= generateDayState();
    let uglyDesign= useStylesUglyCells();
    let okayDesign= useStylesCells()
    let classesCell=(isRuangUglyTimetable)? uglyDesign: okayDesign;
    return (
        <>
            <TableContainer className="timetable">
        
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {
                                newTimeState.map((value, index) => {
                                    if ((index >= startIndex) && (index <= endIndex)) {
                                        return (
                                            <Fragment key={`timetableComp${index}`}>      
                                                {index === startIndex &&
                                                    <TableCell className={classesCell.root} />
                                                }
                                                <TableCell className={classesCell.root}>{value}</TableCell>
                                            </Fragment>
                                        )
                                    }
                                    else{
                                        return null
                                    }
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            scheduleData.map((row, rowIndex) => {
                                return (
                                    <TableRow key={`${rowIndex}timetable1Comp`}>
                                        <TableCell className={classesCell.root}> {newDayState[rowIndex]} </TableCell>
                                        { row.map((column, columnIndex) => {
                                            if ((columnIndex >= startIndex) && (columnIndex <= endIndex)) {
                                                return (
                                                    <Fragment key={`${columnIndex}tableCompComp`}>
                                                        {!isRuangUglyTimetable &&
                                                        <TableCell className={classesCell.root}>
                                                            {stringAbbrv(column['subjek'])} {column['seksyen']} <br />
                                                            {column['ruang']}
                                                        </TableCell>
                                                        }
                                                        {isRuangUglyTimetable &&
                                                        <TableCell className={classesCell.root}>
                                                            {column['subjek']} <br /> 
                                                            {column['seksyen']} 
                                                        </TableCell>
                                                        }
                                                    </Fragment>
                                                )
                                            }
                                            else{
                                                return null;
                                            }
                                        })
                                        }
                                    </TableRow>
                                )
                            }
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
