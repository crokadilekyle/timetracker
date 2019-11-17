// ADD CODES TO SELECT INPUT

codes.map(code => {
    let option = document.createElement('option');
    option.setAttribute('value', code.code);
    option.disabled = code.disabled;
    option.innerText = code.code;
    selectTimeCode.append(option);
});

const options = Array.from(document.querySelectorAll('#timecode option'));


// ADD NEW CODE TO SELECT INPUT

createTimeCode.addEventListener('click', (e) => {
    e.preventDefault();

    if (addCode.value == "") {
        codeError.innerText = codeErrorMsg;
    } else {
        let newCode = {
            code: addCode.value, disabled: false
        }

        codes.push(newCode);
        updateLocalStorage('codes', codes);
        setTimeout(() => { window.location.replace('index.html'); }, 500);
    }

});