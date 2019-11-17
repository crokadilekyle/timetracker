//CREATE TIME STAMP

createTimeStamp.addEventListener('click', (e) => {
    e.preventDefault();

    let code = selectTimeCode.value;

    if (code === "") {
        stampError.innerText = stampErrorMsg;
        stampError.classList.add('alert-danger');
    } else {

        let timeCodeStamp = {
            code: code,
            time: moment(),
            punch: 'in',
            duration: 0
        }


        // DISABLE SELECT OPTION FOR CURRENT CODE

        codes.map(code => {
            code.disabled = false;
            if (code.code === timeCodeStamp.code) {
                code.disabled = true;
            };
            updateLocalStorage('codes', codes);
        });


        //STAMP OUT BEFORE STAMPING INTO NEW CODE

        if (timestamps.length > 0) {
            let timeStamp = moment();
            let prevStamp = timestamps.reverse()[0];
            stampOut = {
                code: prevStamp.code,
                time: moment(timeStamp).subtract(1, 'second'),
                punch: 'out',
                duration: getDuration(prevStamp.time, timeStamp)
            }
            timestamps.push(stampOut);
        };

        timestamps.push(timeCodeStamp);
        updateLocalStorage('timestamps', timestamps);

        // REFRESH THE PAGE
        window.location.replace('index.html');
    }
});


// SORT TIMESTAMPS ARRAY

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