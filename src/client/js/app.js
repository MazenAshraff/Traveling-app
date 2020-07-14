const postData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response
}
let days = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 30, 9: 30, 10: 31, 11: 30, 12: 31 };
const getSomeDate = (offset) => { // a function to get a future or past date based on an offset of days
    const curDate = modifyCurDate().split('-');
    let someDate = [0, 0, 0];
    if (curDate[0] % 4 == 0)
        days[2] = 29;
    else
        days[2] = 28;
    if (curDate[2] + offset > days[curDate[2]]) {
        someDate[2] = parseInt(curDate[2]) + offset - days[curDate[2]];
        someDate[1] = (parseInt(curDate[1]) + 1 == 13) ? 1 : parseInt(curDate[1]) + 1;
        if (someDate[1] == 1)
            someDate[0] = curDate[0]++;
    } else {
        someDate = curDate;
        someDate[2] = parseInt(someDate[2]) + offset;
        someDate[1] = parseInt(someDate[1]);
    }
    someDate[1] = someDate[1] < 10 ? `0${someDate[1]}` : someDate[1];
    someDate[2] = someDate[2] < 10 ? `0${someDate[2]}` : someDate[2];
    return `${someDate[0]}-${someDate[1]}-${someDate[2]}`;
    // for (let i = 0; i < 3; i++) {
    //     if (parseInt(requestedDate[i]) > parseInt(maxDate[i]))
    //         return false;
    // }
    // return true;

}
const modifyCurDate = () => {
    const date = new Date();
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

const getOffset = () => {
    let dates = {};
    for (let i = 0; i < 16; i++) {
        dates[getSomeDate(i)] = i;
    }
    return dates;
}
const isValid = (date) => {
    const dateArray = date.split('-');
    const cur_date = modifyCurDate().split('-');
    const max_date = getSomeDate(15).split('-');
    for (let i = 0; i < 3; i++) {
        if (parseInt(dateArray[i]) > parseInt(max_date[i]) || parseInt(dateArray[i]) < parseInt(cur_date[i]))
            return false;
    }
    return true;
}

const test = async() => {
    const locValue = document.getElementById('location').value;
    const date = document.getElementById("startdate").value;
    console.log(date);
    if (!isValid(date)) {
        alert('Please Enter a valid date');
        return null;
    }
    const offset = getOffset();
    postData('http://localhost:8000/location', { location: `${locValue}`, date: offset[date] });
}


export { postData, test, getSomeDate, modifyCurDate, getOffset }