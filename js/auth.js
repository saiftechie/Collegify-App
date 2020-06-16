// import { UserHandler } from './js/userHandler.js';

const loginForm = document.querySelector('.loginForm');
const regForm = document.querySelector('.regForm');
const regLink = document.querySelector('.reglink');
const logLink = document.querySelector('.loglink');
const passInput = document.querySelector('#rg-password');
const rgRole = document.querySelector('#rg-role');
const forgotPasswordForm = document.querySelector('.forgotPassword');

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

//form detailing
passInput.addEventListener('focus', () => {
    document.querySelector('.passhint').classList.remove('hide');
});

passInput.addEventListener('blur', () => {
    document.querySelector('.passhint').classList.add('hide');
});

rgRole.addEventListener('change', e => {

    if(e.target.value === 'student'){
        document.querySelector('.semSelector').classList.remove('hide');
        document.querySelector('.branch').classList.remove('hide');

    }
    else{
        document.querySelector('.semSelector').classList.add('hide');
        document.querySelector('.branch').classList.add('hide');
    }
});

forgotPasswordForm.addEventListener('submit',  e => {
    e.preventDefault();

    //getting instance
    const modal = document.querySelector('#modal-forgot-password');
    const instance = M.Modal.getInstance(modal);

    const email = forgotPasswordForm['reset-Email'].value;
    auth.sendPasswordResetEmail(email).then(() => {
        M.toast({html:'Reset password link sent!', classes:'rounded'});
        forgotPasswordForm.reset();
        instance.close();
    }).catch(err => {
        if(err.code == 'auth/user-not-found'){
            M.toast({html:'User not found!!!', classes:'rounded'});
        }
    });
});

//form view handling
regLink.addEventListener('click', () => {
    document.querySelector('.login-div').classList.add('hide');
    document.querySelector('.register-div').classList.remove('hide');
});

logLink.addEventListener('click', () => {
    document.querySelector('.login-div').classList.remove('hide');
    document.querySelector('.register-div').classList.add('hide');
});

//Registration handling
regForm.addEventListener('submit', e => {
    e.preventDefault();

    //Getting values
    const fullName = regForm['rg-fullName'].value;
    const email = regForm['rg-email'].value;
    const mobileNo = regForm['rg-mobileNo'].value;
    const college = regForm['rg-college'].value;
    const role = regForm['rg-role'].value;
    const semester = regForm['rg-semester'].value;
    const cnfmPass = regForm['rg-cnfmPass'].value;
    const branch = regForm['rg-branch'].value;

    //current register date
    const now = new Date();

    //creating object
    const user = {
        fullName,
        email,
        mobileNo,
        college,
        role,
        semester,
        branch,
        registered_at: firebase.firestore.Timestamp.fromDate(now)
    };

    document.querySelector('.register.ld').classList.remove('hide');

    //register user
    userHandler.register(email, cnfmPass)
        .then(cred => {
            return db.collection('user').doc(cred.user.uid).set(user);
        }).then(() => {
            document.querySelector('.register.ld').classList.add('hide');
            M.toast({html: 'User registered Successfully!'});
            regForm.reset();
    }).catch(err => {
        if(err.code === 'auth/email-already-in-use'){
            M.toast({html: 'The email address is already in use!', classes: 'rounded'});
            document.querySelector('.register.ld').classList.add('hide');
        }
    });  

});


//login handling
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    //getting values
    const email = loginForm['lg-email'].value;
    const password = loginForm['lg-password'].value;

    document.querySelector('.login.ld').classList.remove('hide');

    //login user
    userHandler.login(email, password).then(() => {
        document.querySelector('.login.ld').classList.add('hide');
        loginForm.reset();
    }).catch(e => {
        if(e.code === 'auth/wrong-password'){
            M.toast({html: 'Incorrect Password!', classes: 'rounded'});
            document.querySelector('.login.ld').classList.add('hide');
        }
        if(e.code === 'auth/user-not-found'){
            M.toast({html: 'Incorrect email address or Account may not found!'});
            document.querySelector('.login.ld').classList.add('hide');
        }
    });
});

//class instances
const userHandler = new UserHandler();