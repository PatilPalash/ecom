let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let number = document.querySelector('#number')
    let tac = document.querySelector('#tc')

    //form validation
    if(fullname.value.length < 3){
        showFormError('name must be 3 leeter long')
    } else if(!email.value.length){
        showFormError('enter your email');
    } else if(password.value.length < 8){
        showFormError('password must be 8 letters long');
    } else if(Number(number) || number.value.length < 10){
        showFormError('invalid number, please enter valid one');
    } else if(!tac.checked){
        showFormError('you must to our terms and condition')
    } else{
        // submit form
        loader.style.display = 'block';
        sendData('/signup', {
            name: fullname.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked
        })
    }
})