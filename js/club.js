
const logouts = document.querySelectorAll('.logout'),
    appTitle = document.querySelector('.app-title'),
    titleCard = document.querySelector('.title-card'),
    tabs = document.querySelectorAll('.tab a'),
    userView = document.querySelector('.sidenav .user-view'),
    profileView = document.querySelector('.profileView'),
    updateNameForm = document.querySelector('.updateName'),
    updateEmailForm = document.querySelector('.updateEmail'),
    updateMobileForm = document.querySelector('.updateMobile'),
    resetPassword = document.querySelector('.resetPassword'),
    profileLnks = document.querySelectorAll('.profileLink'),
    menuBtn = document.querySelector('.menu'),
    backBtn = document.querySelector('.backBtn a'),
    addBtn = document.querySelector('.addBtn'),
    addEventForm = document.querySelector('.addEventForm'),
    updateEventForm = document.querySelector('.updateEventForm'),
    broadcastBtn = document.querySelector('.broadcastBtn'),
    eventLnk = document.querySelector('.eventLink'),
    broadcastLnk = document.querySelector('.broadcastLink'),
    abouts = document.querySelectorAll('.about'),
    settingsLink = document.querySelectorAll('.settings'),
    notificationBtn = document.querySelector('#notificationBtn'),
    darkModeBtn = document.querySelector('#darkModeBtn'),
    events = document.querySelector('.sideMenu .events'),
    broadcast = document.querySelector(' .broadcast'),
    dltAccount = document.querySelector('.dltAccount'),
    imgSelect = document.querySelector('.editImage'),
    uploadBtn = document.querySelector('.uploadBtn'),
    cancelBtn = document.querySelector('.cancelBtn'),
    progress = document.querySelector('.progress .determinate'),
    eventView = document.querySelector('#eventContent .row'),
    eventDetailsView = document.querySelector('#eventDetails .detailsView'),
    editEventView = document.querySelector('#editEvent .editEventView'),
    broadView = document.querySelector('#broadcastContent .broadView'),
    addBroadcastForm = document.querySelector('.addBroadcastForm');

    let userImage='',
    userData='',
    user = null,
    file = {};

//  Initializations

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tabs');
    var instances = M.Tabs.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems);
});


document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(currentUser => {
        if(currentUser){
            user = currentUser;

            userHandler.getData(currentUser.uid).then(doc => {
                userData = doc.data();
            });
        }
        else{
            M.toast({html: 'User not logged in!', classes: 'rounded'});
        } 
    });
});
//


//Side nav handler
document.addEventListener('DOMContentLoaded', function() {

    auth.onAuthStateChanged(user => {
        
        if(user){

            storage.ref('user/' + user.uid + '/profile.jpg').getDownloadURL().then(imgURL => {

                document.querySelector('#output_image').src = imgURL;
                document.querySelector('.profileImage').src = imgURL;
                userImage = imgURL;
                
            }).catch(err => {
                const defaultImg = '/img/default1.jpg' 
                document.querySelector('#output_image').src = defaultImg;
                document.querySelector('.profileImage').src = defaultImg;
                userImage = defaultImg;
            });

            userHandler.getData(user.uid).then(doc => {
                userView.children.item(1).textContent = doc.data().fullName;
                userView.children.item(2).textContent = doc.data().email;

            }).catch(err => {
                console.log("Error getting document:", err.message);
            });
        }
        else{
            console.log("user not logged in");
        }
    });

});

events.addEventListener('click', () => {

    const sidenav = document.querySelector('.sidenav');
    const sideNavInstance = new M.Sidenav(sidenav);
    sideNavInstance.close();

    document.querySelectorAll('.appContent').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    eventLnk.classList.add('active');
    broadcastLnk.classList.remove('active');

    addBtn.classList.remove('hide');
    broadcastBtn.classList.add('hide');

    appTitle.textContent = "Events";

    const content = document.querySelector('#eventContent');
    content.classList.add('active');
    content.style.display = 'block';
});



broadcast.addEventListener('click', () => {

    const sidenav = document.querySelector('.sidenav');
    const sideNavInstance = new M.Sidenav(sidenav);
    sideNavInstance.close();


    document.querySelectorAll('.appContent').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });


    addBtn.classList.add('hide');
    broadcastBtn.classList.remove('hide');
    menuBtn.classList.add('hide');
    document.querySelector('.backBtn').classList.remove('hide');
    document.querySelector('.card-tabbar').classList.add('hide');

    backBtn.addEventListener('click', () => {

        document.querySelectorAll('.appContent').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        addBtn.classList.remove('hide');
        broadcastBtn.classList.add('hide');
        menuBtn.classList.remove('hide');
        document.querySelector('.backBtn').classList.add('hide');

        appTitle.textContent = "Events";

        const content = document.querySelector('#eventContent');
        content.classList.add('active');
        content.style.display = 'block';

        document.querySelector('.card-tabbar').classList.remove('hide');
    });

    appTitle.textContent = "BroadCast";

    const content = document.querySelector('#broadcastContent');
    content.classList.add('active');
    content.style.display = 'block';

});
//

//userProfile Handler
profileLnks.forEach(profileLnk => {
    profileLnk.addEventListener('click', () => {

        const sidenav = document.querySelector('.sidenav');
        const sideNavInstance = new M.Sidenav(sidenav);
        sideNavInstance.close();
        

        document.querySelectorAll('.appContent').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        addBtn.classList.add('hide');
        menuBtn.classList.add('hide');
        broadcastBtn.classList.add('hide');
        document.querySelector('.backBtn').classList.remove('hide');
        document.querySelector('.card-tabbar').classList.add('hide');

        backBtn.addEventListener('click', () => {

            document.querySelectorAll('.appContent').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            addBtn.classList.remove('hide');
            menuBtn.classList.remove('hide');
            document.querySelector('.backBtn').classList.add('hide');

            appTitle.textContent = "Events";

            const content = document.querySelector('#eventContent');
            content.classList.add('active');
            content.style.display = 'block';

            document.querySelector('.card-tabbar').classList.remove('hide');
        });

        appTitle.textContent = "Profile";

        const content = document.querySelector('#profileContent');
        content.classList.add('active');
        content.style.display = 'block';

        if(user == null){
            M.toast({html: 'User not logged in!', classes: 'rounded'});
        }else{
            //realtime changes
            db.collection('user').doc(user.uid).onSnapshot(doc =>{
                appUI.renderProfile(profileView, doc.data());
            });

            // console.log(user.uid);
            userHandler.getData(user.uid).then(doc => {
                appUI.renderProfile(profileView, doc.data());
            }).catch(err => {
                console.log("Error getting document:", err.message);
            });
        }
        
    });
});

function preview_image(event) 
{
    var reader = new FileReader();

    reader.onload = function()
    {
        var output = document.getElementById('output_image');
        output.src = reader.result;
    }

    if(event.target.files[0]){
        file = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
    }
}

imgSelect.addEventListener('click', () => {
    document.querySelector('#selectFile').click();
});

const uploadImageBtn = () => {

    document.querySelector('.uploadView').classList.remove('hide');

    uploadBtn.addEventListener('click', () => {

        document.querySelector('.progressView').classList.remove('hide');

        if(user == null){
            M.toast({html: 'User not logged in!', classes: 'rounded'});
        }else{

            const uploadTask = userHandler.uploadProfilePic(user.uid, file);
            uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + uploadProgress + '% done');
                progress.style.width = `${uploadProgress}%`;
                document.querySelector('.progressValue').textContent = `${Math.ceil(uploadProgress)}%`;

            }, function(error) {
                // Handle unsuccessful uploads
                M.toast({html: `${error.message}`, classes:'rounded'});
            }, function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(imgURL) {
                    document.querySelector('#output_image').src = imgURL;
                    document.querySelector('.profileImage').src = imgURL;
                    userImage = imgURL;
                });
                document.querySelector('.uploadView').classList.add('hide');
                document.querySelector('.progressView').classList.add('hide');
                M.toast({html:'Pic uploaded successfully!', classes:'rounded', displayLength:2000});
            });

        }

    });

    cancelBtn.addEventListener('click', () => {
        document.querySelector('#selectFile').value="";
        document.querySelector('#output_image').src=userImage;
        document.querySelector('.uploadView').classList.add('hide');
    });
};

updateNameForm.addEventListener('submit', e => {
    e.preventDefault();

    //getting instance
    const modal = document.querySelector('#modal-name');
    const instance = M.Modal.getInstance(modal);

    //getting user value
    const fullName = updateNameForm['up-fullName'].value;

    userHandler.updateName(user.uid, fullName).then(() => {
        M.toast({html: 'Name updated successfully', classes: 'rounded'});
        updateNameForm.reset();
        instance.close();
    }).catch(err => {
        console.log("Error getting document:", err.message);
    });

});

updateEmailForm.addEventListener('submit', e => {
    e.preventDefault();

    //getting instance
    const modal = document.querySelector('#modal-email');
    const instance = M.Modal.getInstance(modal);

    //getting user value
    const email = updateEmailForm['up-Email'].value;
    userHandler.updateEmail(user.uid, email).then(() => {
        M.toast({html: 'Email updated successfully', classes: 'rounded'});
        updateEmailForm.reset();
        instance.close();
    }).catch(err => {
        console.log("Error getting document:", err.message);
    });

});

updateMobileForm.addEventListener('submit', e => {
    e.preventDefault();

    //getting instance
    const modal = document.querySelector('#modal-mobile');
    const instance = M.Modal.getInstance(modal);

    //getting user value
    const mobile = updateMobileForm['up-Mobile'].value;

    userHandler.updateMobile(user.uid, mobile).then(() => {
        M.toast({html: 'Mobile No. updated successfully', classes: 'rounded'});
        updateMobileForm.reset();
        instance.close();
    }).catch(err => {
        console.log("Error getting document:", err.message);
    });

});


//

// Settings Handler

notificationBtn.addEventListener('click', () =>{
    console.log(notificationBtn.checked);
});

resetPassword.addEventListener('click', () => {

    if(user == null){
        M.toast({html: 'User not logged in!', classes: 'rounded'});
    }else{
        auth.sendPasswordResetEmail(user.email).then(function() {
            M.toast({html: 'Password reset link sent to registered email!', classes:'rounded'});
        }).catch(function(error) {
                console.log(error.message);
        });
    } 

});

dltAccount.addEventListener('click', () => {

    document.querySelector('.deleteYesBtn').addEventListener('click', ()=>{
    auth.onAuthStateChanged(user =>{
        userHandler.deleteAccount(user.uid).then(() => {
            user.delete();
            M.toast({html: 'Account Deleted Successfully!', classes:'rounded'});
            window.location.replace('/index.html');
        }).catch(err => {
            console.log("Error getting document:", err.message);
        });
    });

    });

    document.querySelector('.deleteNoBtn').addEventListener('click', ()=>{
        //getting instance
        const modal = document.querySelector('#modal-delete');
        const instance = M.Modal.getInstance(modal);
        instance.close();
        
    });
}); 

darkModeBtn.addEventListener('click', () =>{
    if(darkModeBtn.checked){
        document.querySelector('body').classList.add('darkMode');
        document.querySelector('.title-card').classList.add('darkMode');
        document.querySelector('.dropdown-content').classList.add('darkMode');
        document.querySelector('.user-view').classList.add('darkMode');
        document.querySelector('.sidenav').classList.add('darkMode');
        document.querySelectorAll('.card-tabbar').forEach(tabbar => tabbar.classList.add('darkMode'));
        document.querySelectorAll('.card-tabbar .tabs').forEach(tabs => tabs.classList.add('darkMode'));
        document.querySelectorAll('.divider').forEach(divider => divider.classList.add('darkMode'));
        document.querySelector('.detailsView').classList.add('darkMode');
    }
    else{
        document.querySelector('body').classList.remove('darkMode');
        document.querySelector('.title-card').classList.remove('darkMode');
        document.querySelector('.dropdown-content').classList.remove('darkMode');
        document.querySelector('.user-view').classList.remove('darkMode');
        document.querySelector('.sidenav').classList.remove('darkMode');
        document.querySelectorAll('.card-tabbar').forEach(tabbar => tabbar.classList.remove('darkMode'));
        document.querySelectorAll('.card-tabbar .tabs').forEach(tabs => tabs.classList.remove('darkMode'));
        document.querySelectorAll('.divider').forEach(divider => divider.classList.remove('darkMode'));
        document.querySelector('.detailsView').classList.remove('darkMode');
    }
});
//

// Dropdown content handler
settingsLink.forEach(settings => {
    settings.addEventListener('click', () => {

        const sidenav = document.querySelector('.sidenav');
        const sideNavInstance = new M.Sidenav(sidenav);
        sideNavInstance.close();


        document.querySelectorAll('.appContent').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        addBtn.classList.add('hide');
        broadcastBtn.classList.add('hide');
        menuBtn.classList.add('hide');
        document.querySelector('.backBtn').classList.remove('hide');
        document.querySelector('.card-tabbar').classList.add('hide');

        backBtn.addEventListener('click', () => {

            document.querySelectorAll('.appContent').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            addBtn.classList.remove('hide');
            menuBtn.classList.remove('hide');
            document.querySelector('.backBtn').classList.add('hide');

            appTitle.textContent = "Events";

            const content = document.querySelector('#eventContent');
            content.classList.add('active');
            content.style.display = 'block';

            document.querySelector('.card-tabbar').classList.remove('hide');
        });

        appTitle.textContent = "Settings";

        const content = document.querySelector('#settingsContent');
        content.classList.add('active');
        content.style.display = 'block';

    });
});

abouts.forEach(about => {
    about.addEventListener('click', () => {

        const sidenav = document.querySelector('.sidenav');
        const sideNavInstance = new M.Sidenav(sidenav);
        sideNavInstance.close();


        document.querySelectorAll('.appContent').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        addBtn.classList.add('hide');
        menuBtn.classList.add('hide');
        broadcastBtn.classList.add('hide');
        document.querySelector('.backBtn').classList.remove('hide');
        document.querySelector('.card-tabbar').classList.add('hide');

        backBtn.addEventListener('click', () => {

            document.querySelectorAll('.appContent').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            addBtn.classList.remove('hide');
            menuBtn.classList.remove('hide');
            document.querySelector('.backBtn').classList.add('hide');

            appTitle.textContent = "Event";

            const content = document.querySelector('#eventContent');
            content.classList.add('active');
            content.style.display = 'block';

            document.querySelector('.card-tabbar').classList.remove('hide');
        });

        appTitle.textContent = "About";

        const content = document.querySelector('#aboutContent');
        content.classList.add('active');
        content.style.display = 'block';

    });
});

logouts.forEach(logout => {

    auth.onAuthStateChanged(user => {
        if(user){
            logout.addEventListener('click', () => {
                userHandler.logout().then(() => {
                    window.location.replace('/index.html');
                });
            });

        }
        else{
            logout.innerHTML = `<i class="ion-log-in"></i>Login`;
            logout.classList.remove('logout');

            logout.classList.add('login');
            const logins = document.querySelectorAll('.login');
            logins.forEach(login => {
                login.addEventListener('click', () => {
                    window.location = '/index.html';
                });
            });

        }

    });

});
//


//events card handler

eventLnk.addEventListener('click', () => {

    broadcastBtn.classList.add('hide');
    addBtn.classList.remove('hide');
    menuBtn.classList.remove('hide');

    appTitle.textContent = "Events";
});

eventView.addEventListener('click', e =>{

    if(e.target.classList.value === 'eventDetails'){
        
        const id = e.target.getAttribute('id');

        document.querySelectorAll('.appContent').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        addBtn.classList.add('hide');
        menuBtn.classList.add('hide');
        broadcastBtn.classList.add('hide');
        document.querySelector('.backBtn').classList.remove('hide');
        document.querySelector('.card-tabbar').classList.add('hide');

        backBtn.addEventListener('click', () => {

            document.querySelectorAll('.appContent').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            addBtn.classList.remove('hide');
            menuBtn.classList.remove('hide');
            document.querySelector('.backBtn').classList.add('hide');

            appTitle.textContent = "Events";

            const content = document.querySelector('#eventContent');
            content.classList.add('active');
            content.style.display = 'block';

            document.querySelector('.card-tabbar').classList.remove('hide');
        });

        appTitle.textContent = "Details";

        const content = document.querySelector('#eventDetails');
        content.classList.add('active');
        content.style.display = 'block';

        eventDetailsView.classList.add('hide');
        document.querySelector('#eventDetails .loader').classList.remove('hide');

        dBHandler.getEventDetails(id).then(details => {
            eventDetailsView.classList.remove('hide');
            document.querySelector('#eventDetails .loader').classList.add('hide');
            appUI.renderEventDetails(eventDetailsView, details.data());
        })
    }
    if(e.target.classList.value === 'delete' ){

        const authorId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('authorId');
        const eventId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

        if(authorId === user.uid){
            dBHandler.deleteEvent(eventId).then(() => {
                M.toast({html: 'Deleted successfully!', classes: 'rounded'});
            }).catch(err => {
                console.log(err);
            });
        }else{
            M.toast({html : 'Permission denied!', classes: 'rounded'});
        }
    }

    if(e.target.classList.value === 'edit'){

        const authorId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('authorId');
        const id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        
        if(authorId === user.uid){
            
            document.querySelectorAll('.appContent').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
    
            addBtn.classList.add('hide');
            menuBtn.classList.add('hide');
            broadcastBtn.classList.add('hide');
            document.querySelector('.backBtn').classList.remove('hide');
            document.querySelector('.card-tabbar').classList.add('hide');
    
            backBtn.addEventListener('click', () => {
    
                document.querySelectorAll('.appContent').forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });
    
                addBtn.classList.remove('hide');
                menuBtn.classList.remove('hide');
                document.querySelector('.backBtn').classList.add('hide');
    
                appTitle.textContent = "Events";
    
                const content = document.querySelector('#eventContent');
                content.classList.add('active');
                content.style.display = 'block';

                document.querySelector('.card-tabbar').classList.remove('hide');
            });
    
            appTitle.textContent = "Edit Event";
    
            const content = document.querySelector('#editEvent');
            content.classList.add('active');
            content.style.display = 'block';
            
            editEventView.classList.add('hide');
            document.querySelector('#editEvent .loader').classList.remove('hide');
    
            dBHandler.getEventDetails(id).then(details => {
                editEventView.classList.remove('hide');
                document.querySelector('#editEvent .loader').classList.add('hide');
                appUI.renderEditEventView(details.data());
            });
    
            updateEventForm.addEventListener('submit', e => {
    
                e.preventDefault();
            
                //getting values
                const eventTitle = updateEventForm['upTitle'].value;
                const eventDesc = upEditor.getData();
                const startDate = updateEventForm['up-startDate'].value;
                const endDate = updateEventForm['up-endDate'].value;
                const startTime = updateEventForm['up-startTime'].value;
                const endTime = updateEventForm['up-endTime'].value;
                const eventVenue = updateEventForm['up-eventVenue'].value;
                const whatsApp = updateEventForm['up-whatsApp'].value;
                const regLink = updateEventForm['up-regLink'].value;
                
                const eventData = {
                    eventTitle,
                    eventDesc,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    eventVenue,
                    whatsApp,
                    regLink
                };
            
                document.querySelector('#editEvent .loader').classList.remove('hide');
                document.querySelector('.update.ld').classList.remove('hide');
            
                dBHandler.updateEventData(id, eventData).then(e => {
                    
                    document.querySelector('#editEvent .loader').classList.add('hide');
                    document.querySelector('.update.ld').classList.remove('hide');        
                    M.toast({html: 'event updated Successfully!' ,classes: 'rounded'});
                    window.location.replace('/pages/club.html');
                    updateEventForm.reset();
    
                }).catch(err => {
                    console.log(err);
                });
            
            });

        }else{
            M.toast({html : 'Permission denied!', classes: 'rounded'});
        }

        
    }
});


addBtn.addEventListener('click', () => {

    document.querySelectorAll('.appContent').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    addBtn.classList.add('hide');
    menuBtn.classList.add('hide');
    broadcastBtn.classList.add('hide');
    document.querySelector('.backBtn').classList.remove('hide');
    document.querySelector('.card-tabbar').classList.add('hide');

    backBtn.addEventListener('click', () => {

        document.querySelectorAll('.appContent').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        addBtn.classList.remove('hide');
        menuBtn.classList.remove('hide');
        document.querySelector('.backBtn').classList.add('hide');

        appTitle.textContent = "Events";

        const content = document.querySelector('#eventContent');
        content.classList.add('active');
        content.style.display = 'block';

        document.querySelector('.card-tabbar').classList.remove('hide');
    });

    appTitle.textContent = "Add Event";

    const content = document.querySelector('#addEvent');
    content.classList.add('active');
    content.style.display = 'block';
});

//addDrive to  database
let eventImgFile = {},
    eventImgSrc = '';

const uploadImg = (event) => {
    if(event.target.files[0]){
        eventImgFile = event.target.files[0];
    }

    const task = dBHandler.uploadEventImage(user.uid, eventImgFile);
        task.on('state_changed', 
    (snapshot) => {
        //progress
        document.querySelector('.uploadImg.ion-upload').classList.add('hide');
        document.querySelector('.upload.ld').classList.remove('hide');
    }, 
    (err) => {
        M.toast({html: `${err.message}`, classes:'rounded'});
    }, 
    () => {
        task.snapshot.ref.getDownloadURL().then(function(imgURL) {
            eventImgSrc = imgURL;
            document.querySelector('.uploadImg.ion-upload').classList.remove('hide');
            document.querySelector('.upload.ld').classList.add('hide');
            M.toast({html :'Image uploaded!', classes: 'rounded'});
        });
    });
}

addEventForm.addEventListener('submit', e => {

    e.preventDefault();

    //getting values
    const eventTitle = addEventForm['eventTitle'].value;
    const eventDesc = editor.getData();
    const startDate = addEventForm['startDate'].value;
    const endDate = addEventForm['endDate'].value;
    const startTime = addEventForm['startTime'].value;
    const endTime = addEventForm['endTime'].value;
    const eventVenue = addEventForm['eventVenue'].value;
    const whatsApp = addEventForm['whatsApp'].value;
    const regLink = addEventForm['regLink'].value;
    
    const eventData = {
        userName : userData.fullName,
        userImage : userImage,
        userCollege : userData.college,
        eventTitle : eventTitle,
        eventImage: eventImgSrc,
        eventDesc : eventDesc,
        startDate : startDate,
        endDate : endDate,
        startTime : startTime,
        endTime : endTime,
        eventVenue: eventVenue,
        whatsApp : whatsApp,
        regLink : regLink,
        author : user.uid
    };


    document.querySelector('#addEvent .loader').classList.remove('hide');
    document.querySelector('.submit.ld').classList.remove('hide');

    if(eventImgSrc === ''){
        M.toast({html:'wait! image upload in progress'});
        document.querySelector('#addEvent .loader').classList.add('hide');
        document.querySelector('.submit.ld').classList.add('hide');

    }
    else{
        dBHandler.addEventData(eventData).then(() => {

            document.querySelector('#addEvent .loader').classList.add('hide');
            document.querySelector('.submit.ld').classList.add('hide');
            M.toast({html: 'Event uploaded Successfully!' ,classes: 'rounded'});
            window.location.replace('/pages/club.html');
            
        }).catch(err => {
            console.log(err);
        });

    }


});

document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('#eventContent .loader').classList.remove('hide');
    setTimeout(()=>{document.querySelector('#eventContent .loader').classList.add('hide');},4000);

    dBHandler.getEventsData((data, id) =>{

        document.querySelector('#eventContent .loader').classList.add('hide');
        appUI.renderEventsCard(eventView, data, id);
    });
});

//

//broadcast Handler
broadcastLnk.addEventListener('click', () => {

    addBtn.classList.add('hide');
    broadcastBtn.classList.remove('hide');

    appTitle.textContent = "Broadcast";
});

document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('#broadcastContent .loader').classList.remove('hide');
    setTimeout(()=>{document.querySelector('#broadcastContent .loader').classList.add('hide');},4000);

    dBHandler.getEventBroad((data, id)=>{
        document.querySelector('#broadcastContent .loader').classList.add('hide');
        appUI.renderBroadCast(broadView, data, id);
    });
});

addBroadcastForm.addEventListener('submit', e => {

    e.preventDefault();

    var elem = document.querySelector('#modal-addBroadcast');
    var instance = M.Modal.getInstance(elem);

    const now = new Date()
    const message = addBroadcastForm['message'].value;
    const broadData = {
        message: message,
        username: userData.fullName,
        userId: user.uid,
        broadcast_at: firebase.firestore.Timestamp.fromDate(now)
    };

    dBHandler.addEventBroadCast(broadData).then(() => {
        instance.close();
        addBroadcastForm.reset();
    });

});

broadView.addEventListener('click', e => {


    if(e.target.classList.contains('delete')){

        const broadId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        const userId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('userId');

        if(userId === user.uid){
            dBHandler.deleteEventBroad(broadId).then(() => {
                M.toast({html: 'Deleted!', classes: 'rounded'});
            }).catch(err=>{
                console.log(err);
            });
        }
        else{
            M.toast({html : 'Permission denied!', classes: 'rounded'});
        }
    }
    
});



// tabs handler
tabs.forEach(tab =>{
    tab.addEventListener('click',() =>{
        document.querySelectorAll('.appContent').forEach(item => {
            item.classList.remove('active');
            item.style.display = 'none';
        });

        window.scrollTo(0,0);
    });
});
//


//class instances
const userHandler = new UserHandler();
const dBHandler = new DBHandler();
const appUI = new AppUI();



