export function generateLocalStorageName(obj) {
    let localStorageName = "";
    if (obj.argNum === 0) {
        localStorageName = `${obj.entity}`;
    }
    else if (obj.argNum === 1) {
        localStorageName = `${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
    }
    else if (obj.argNum === 2) {
        localStorageName = `${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        localStorageName = `${localStorageName}&${obj.args[1].name}=${obj.args[1].value}`;
    } 
    else if (obj.argNum === 3) {
        localStorageName = `${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        localStorageName = `${localStorageName}&${obj.args[1].name}=${obj.args[1].value}`
        localStorageName = `${localStorageName}&${obj.args[2].name}=${obj.args[2].value}`;
    }
    else if (obj.argNum === 4) {
        localStorageName = `${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        localStorageName = `${localStorageName}&${obj.args[1].name}=${obj.args[1].value}`
        localStorageName = `${localStorageName}&${obj.args[2].name}=${obj.args[2].value}`
        localStorageName = `${localStorageName}&${obj.args[3].name}=${obj.args[3].value}`;
    }
    else if (obj.argNum === 5) {
        localStorageName = `${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        localStorageName = `${localStorageName}&${obj.args[1].name}=${obj.args[1].value}`
        localStorageName = `${localStorageName}&${obj.args[2].name}=${obj.args[2].value}`
        localStorageName = `${localStorageName}&${obj.args[3].name}=${obj.args[3].value}`;
        localStorageName = `${localStorageName}&${obj.args[4].name}=${obj.args[4].value}`;
    }

    return localStorageName;
}
export function generateURL(obj) {
    let url = "";
    if (obj.argNum === 0) {
        url = `${obj.url}?entity=${obj.entity}`;
    }
    if (obj.argNum === 1) {
        let body1 = `?entity=${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        url = `${obj.url}${body1}`;
    }
    if (obj.argNum === 2) {
        let body2 = `?entity=${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        body2 = `${body2}&${obj.args[1].name}=${obj.args[1].value}`;
        url = `${obj.url}${body2}`;
    }
    if (obj.argNum === 3) {
        let body2 = `?entity=${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        body2 = `${body2}&${obj.args[1].name}=${obj.args[1].value}`;
        body2 = `${body2}&${obj.args[2].name}=${obj.args[2].value}`;
        url = `${obj.url}${body2}`;
    }
    if (obj.argNum === 4) {
        let body2 = `?entity=${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        body2 = `${body2}&${obj.args[1].name}=${obj.args[1].value}`;
        body2 = `${body2}&${obj.args[2].name}=${obj.args[2].value}`;
        body2 = `${body2}&${obj.args[3].name}=${obj.args[3].value}`;
        url = `${obj.url}${body2}`;
    }
    if (obj.argNum === 5) {
        let body2 = `?entity=${obj.entity}&${obj.args[0].name}=${obj.args[0].value}`;
        body2 = `${body2}&${obj.args[1].name}=${obj.args[1].value}`;
        body2 = `${body2}&${obj.args[2].name}=${obj.args[2].value}`;
        body2 = `${body2}&${obj.args[3].name}=${obj.args[3].value}`;
        body2 = `${body2}&${obj.args[4].name}=${obj.args[4].value}`;
        url = `${obj.url}${body2}`;
    }
    return url;
}

export function sortByKey(index, obj, jsonArray, tableNum) {

    let localStorageName = generateLocalStorageName(obj);
    index = parseInt(index);
    let fetchFromLocalStorage = JSON.parse(localStorage.getItem(localStorageName));
    let key = obj.arrayColumns[index];
    let row;
    try{
        row = fetchFromLocalStorage[0][key];
    }
    // console.log({fetchFromLocalStorage, length: fetchFromLocalStorage.length})
    catch
    {
        localStorage.setItem(localStorageName, JSON.stringify(jsonArray));
        fetchFromLocalStorage = JSON.parse(localStorage.getItem(localStorageName));

        row = fetchFromLocalStorage[0][key];

    }
    let clickedColumn = document.querySelectorAll(`span.sortIndicator`)[index];
    let sortAsc = clickedColumn.nextElementSibling;
    let sortDesc = sortAsc.nextElementSibling;
    sortAsc.classList.toggle("none");
    sortDesc.classList.toggle("none");
    let boolAscend = 1;
    // console.log(clickedColumn);
    if (clickedColumn.textContent.trim() !== "+") {
        boolAscend = -1;
    }
    else {
        boolAscend = 1;
    }
  

    let isNotNumber = isNaN(row);
    if (isNotNumber) {
        fetchFromLocalStorage.sort(function (a, b) {
            let nameA = a[obj.arrayColumns[index]].toLowerCase(), nameB = b[obj.arrayColumns[index]].toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1 * boolAscend;
            if (nameA > nameB)
                return 1 * boolAscend;
            return 0; //default return value (no sorting)
        })
    }
    else {
        fetchFromLocalStorage.sort(function (a, b) {
            return (a[obj.arrayColumns[index]] - b[obj.arrayColumns[index]]) * boolAscend;
        })
    }
    jsonArray = [...fetchFromLocalStorage];
    if (boolAscend === -1) {
        clickedColumn.textContent = "+";
    }
    else {
        clickedColumn.textContent = "-";
    }

    return jsonArray;
}

export function trimData(jsonArray, lengthToShow) {

    if (lengthToShow !== -1) {
        let totalLength = jsonArray.length;
        if (totalLength !== lengthToShow) {
            jsonArray.splice(lengthToShow, totalLength - lengthToShow);
        }
    }
}

export function getCurrentSesi() {
    let sesiString = "";
    let date = new Date();
    let year = date.getFullYear();
    if (date.getMonth > 6) {
        sesiString = `${year}/${year + 1}`;
    }
    else {
        sesiString = `${year - 1}/${year}`;
    }
    return sesiString;
}

export function getLengthToShow(){
    let lengthToShow= localStorage.getItem("lengthToShow");
    if (lengthToShow===undefined || lengthToShow===null) {
        localStorage.setItem('lengthToShow', "10");
        return "10";
    }
    else{
        return lengthToShow;
    }
}