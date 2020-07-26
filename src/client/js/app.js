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
    curDate[0] = parseInt(curDate[0]);
    curDate[1] = parseInt(curDate[1]);
    curDate[2] = parseInt(curDate[2]);

    let someDate = [0, 0, 0];
    if (curDate[0] % 4 == 0)
        days[2] = 29; // This is a leap year, februaries have 29 days instead of 28
    else
        days[2] = 28;
    if (curDate[2] + offset > days[curDate[1]]) { // the offset exceeded the number of days in that month
        someDate[2] = curDate[2] + offset - days[curDate[1]];
        someDate[1] = (curDate[1] + 1 == 13) ? 1 : curDate[1] + 1;
        someDate[0] = curDate[0];
        if (someDate[1] == 1) // the month became january   
            someDate[0] = curDate[0]++;
    } else {
        someDate = curDate;
        someDate[2] = someDate[2] + offset;
        someDate[1] = someDate[1];
    }
    someDate[1] = someDate[1] < 10 ? `0${someDate[1]}` : someDate[1];
    someDate[2] = someDate[2] < 10 ? `0${someDate[2]}` : someDate[2];
    return `${someDate[0]}-${someDate[1]}-${someDate[2]}`;

}
const modifyCurDate = () => { //set the date to the format accepted by the date tag
    const date = new Date();
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

const getOffset = () => { //map the dates to numbers
    let dates = {};
    for (let i = 0; i < 16; i++) {
        dates[getSomeDate(i)] = i;
    }
    return dates;
}
const isValid = (date) => { //check whether the entered departure date will be accepted by the API
    if (date === '') return false;
    const dateArray = date.split('-');
    const cur_date = modifyCurDate();
    const max_date = getSomeDate(15).split('-');
    if (duration(date, max_date) < -0)
        return false;
    if (isGreaterEqual(date, cur_date))
        return true;
    return false;
}
const isGreaterEqual = (returnDate, startDate) => { //check whether the return date is after the start date  
    if (returnDate === '') return false;
    const retArr = returnDate.split('-');
    const startArr = startDate.split('-');
    for (let i = 0; i < 3; i++) {
        if (parseInt(retArr[i]) > parseInt(startArr[i]))
            return true;
        else if (parseInt(retArr[i]) < parseInt(startArr[i])) {
            return false;
        }
    }
    return true;
}

const duration = (startDate, endDate) => { //get the nummber of days between 2 dates
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))

}

const updateUI = async() => { //updating the UI using information retrieved from APIs
    const locValue = document.getElementById('location').value;
    const departureDate = document.getElementById('startdate').value;
    const returnDate = document.getElementById('returndate').value;
    const notes = document.getElementById('notes').value;
    const startlabel = document.getElementById('startlabel');
    const endlabel = document.getElementById('endlabel');
    if (!isValid(departureDate)) {
        startlabel.innerHTML = 'Departure Date:</br>Please enter a valid date, you can choose any present or future date by maximum 16 days starting today.';
        startlabel.setAttribute('style', 'color:red;');
        return null;
    } else {
        startlabel.textContent = 'Departure Date:';
        startlabel.setAttribute('style', '');
    }
    if (!isGreaterEqual(returnDate, departureDate)) {
        endlabel.innerHTML = 'Return Date:</br>Please enter a valid return date!';
        endlabel.setAttribute('style', 'color:red;');
        return null;

    } else {
        endlabel.innerHTML = 'Return Date:';
        endlabel.setAttribute('style', '');
    }
    const offset = getOffset();
    const serverData = (await (await postData('http://localhost:8000/location', { location: `${locValue}`, date: offset[departureDate] })).json());
    document.getElementById('recievedlocation').innerHTML = `<i class="fas fa-map-marked-alt" style="font-size:1.5em;color:#0CCA4A;"></i>Location: ${locValue}`
    document.getElementById('hightemp').innerHTML = `<i class="fas fa-temperature-high" style="font-size:1.5em;color:#D90368";></i>High Tempreature on Arrival Date: ${serverData.high_temp}°C`;
    document.getElementById('lowtemp').innerHTML = `<i class="fas fa-temperature-low" style="font-size:1.5em;color:#5FBFF9;"></i>Low Temperature on Arrival Date: ${serverData.low_temp}°C`;
    document.getElementById('chanceofrain').innerHTML = `<i class='fas fa-cloud-rain' style="font-size:1.5em;color:#00487C"></i>    Chance of Rain on Arrival Date: ${serverData.chanceOfRain}%`;
    document.getElementById('container').setAttribute('style', '');
    document.getElementById('departure').innerHTML = `<i class='far fa-calendar' style="font-size:1.5em;color:#0"></i>Departure Date:${departureDate}`;
    document.getElementById('return').innerHTML = `<i class='far fa-calendar' style='font-size:1.5em;color:#0'></i>Return Date:${returnDate}`;
    document.getElementById('duration').innerHTML = `<i class='fas fa-clock' style='font-size:1.5em;color:yellow'></i>Duration:${duration(departureDate,returnDate)} Days`
    document.getElementById('thetext').value = notes;
    document.getElementById('popularimage').setAttribute('src', `${ serverData.picture }`);
    console.log('done');
}

const returndatelimiter = () => {
    document.getElementById('startdate').addEventListener('input', (e) => {
        document.getElementById('returndate').setAttribute('min', document.getElementById('startdate').value);
    });
};
export { postData, updateUI, getSomeDate, modifyCurDate, getOffset, returndatelimiter, isGreaterEqual }