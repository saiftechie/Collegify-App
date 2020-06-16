auth.onAuthStateChanged(user => {
    if(user){

        db.collection('user').doc(user.uid).get().then(doc => {
            if(doc.data().role === 'student'){

                document.querySelector('#loader').classList.add('hide');
                window.location.replace('/pages/student.html');
            }
            if(doc.data().role === 'tpo'){

                document.querySelector('#loader').classList.add('hide');
                window.location.replace('/pages/tpo.html');
            }
            if(doc.data().role === 'club'){

                document.querySelector('#loader').classList.add('hide');
                window.location.replace('/pages/club.html');
            }
        });
    }
    else{
        document.querySelector('#loader').classList.add('hide');
        document.querySelector('#loginCard').classList.remove('hide');
    }
});