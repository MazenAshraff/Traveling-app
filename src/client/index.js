import { postData, test, getSomeDate, modifyCurDate, getOffset } from './js/app.js'
document.getElementById('submit').addEventListener('click', test);
const restrictDates = () => {
    const dateElem = document.getElementById('startdate');
    dateElem.setAttribute('min', modifyCurDate());
    dateElem.setAttribute('max', getSomeDate(15));
    getOffset();

};
restrictDates();

export { postData, test, getSomeDate, modifyCurDate, getOffset }