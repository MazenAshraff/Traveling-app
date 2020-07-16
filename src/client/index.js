import { postData, updateUI, getSomeDate, modifyCurDate, getOffset, returndatelimiter, isGreaterEqual } from './js/app.js';
import './styles/styles.scss';
import './styles/form.scss';
import './styles/background.scss';
import './styles/output.scss'
document.getElementById('submit').addEventListener('click', test);
const restrictDates = () => {
    const dateElem = document.getElementById('startdate');
    dateElem.setAttribute('min', modifyCurDate());
    dateElem.setAttribute('max', getSomeDate(15));
};
restrictDates();

export { postData, updateUI, getSomeDate, modifyCurDate, getOffset, returndatelimiter }