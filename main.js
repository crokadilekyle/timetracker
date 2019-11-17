//SET UP LOCAL STORAGE

if (!localStorage.timestamps) {
    localStorage.setItem("timestamps", JSON.stringify([]));
    localStorage.setItem("codes", JSON.stringify([]));
}

function updateLocalStorage(name, arr) {
    localStorage.setItem(name, JSON.stringify(arr));
};


//CONSTANTS

const timestamps = JSON.parse(localStorage.timestamps);
const createTimeStamp = document.getElementById('createTimeStamp');
const createTimeCode = document.getElementById('createTimeCode'); //button for creating timecode
const addCode = document.getElementById('addcode'); //text input for creating timecode
const clearTimeStamps = document.getElementById('clearTimeStamps');
const selectTimeCode = document.getElementById('timecode');
const timecard = document.getElementById('timecard');
const codes = JSON.parse(localStorage.codes)
const timecardHeader = document.querySelector('#timecard thead');
const timecardBody = document.querySelector('#timecard tbody');


// CALCULATE HOURS AND MINUTES

function getHour(timestamp) {
    let hour = Math.floor(timestamp / 3600000);
    return hour;
};

function getMinutes(timestamp) {
    let minutes = Math.floor((timestamp / 3600000) / 60000);
    return minutes;
};


// ERROR HANDLING
const codeError = document.getElementById('codeerror');
const codeErrorMsg = "Please give your time code a name"
const stampError = document.getElementById('stamperror');
const stampErrorMsg = "Please choose a code";

createTimeCode.addEventListener('click', (e) => {
    e.preventDefault();
    if (addCode.value !== "") {
        codeError.innerText = "";
        createTimeCode.setAttribute("data-dismiss", "modal");
    };

    if (addCode.value === "") {
        codeError.innerText = codeErrorMsg;
        codeError.classList.add('alert-danger');
    };

});

selectTimeCode.addEventListener('change', () => {
    if (selectTimeCode.value !== "") {
        stampError.innerText = "";
        stampError.classList.remove('alert-danger');
    };

    if (selectTimeCode.value === "") {
        stampError.innerText = stampErrorMsg;
        stampError.classList.add('alert-danger');
    };

});

// CLEAR ERROR FROM CODE ADDER

addCode.addEventListener('focusin', (e) => {
    console.log(e.target.value);
    codeError.innerText = '';
    codeError.classList.remove('alert-danger');
})


// CALCULATE DURATION

function getDuration(prevStamp, timeStamp) {
    return moment(timeStamp).diff(prevStamp, 'minutes');
};


// // SORT TIMESTAMPS ARRAY

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? (comparison * -1) : comparison);
    };
}


//CREATE TIMECARD TABLE

let sortedTimeStamps = timestamps.sort(compareValues('time'));

timecardBody.innerHTML = sortedTimeStamps.map(stamp => {
    let durationHours = Math.floor(stamp.duration / 60);
    let durationMinutes = Math.floor(stamp.duration % 60);
    let minutesLength = durationMinutes.toString().length;
    return `<tr>
		  <td>${stamp.code}</td>
		  <td>${stamp.punch.toUpperCase()}: ${moment(stamp.time).format('LT')}</td>
                  <td>${durationHours}:${minutesLength == 1 ? "0" + durationMinutes : durationMinutes}</td>
		</tr>`;
}).join('');

clearTimeStamps.addEventListener('click', () => {
    localStorage.removeItem("timestamps");
    window.location.replace('index.html');
});