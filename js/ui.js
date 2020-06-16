class AppUI{
    constructor(){
        this.dropdownId = db.collection('autoId').doc().id;
        this.EdropdId = db.collection('EAutoId').doc().id;
    }

    //profile
    renderProfile(profileView, data){

        let html = ``;

        if(data.role==='student'){
            html =`
                <tr>
                    <td>Name:</td><td>${data.fullName}</td><td><a class="modal-trigger" href="#modal-name"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>Email:</td><td>${data.email}</td><td><a class="modal-trigger" href="#modal-email"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>Mobile No.:</td><td>${data.mobileNo}</td><td><a class="modal-trigger" href="#modal-mobile"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>Semester:</td><td>${data.semester}</td><td><a class="modal-trigger" href="#modal-sem"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>Branch:</td><td colspan="2">${data.branch}</td>
                </tr>
                <tr>
                    <td>College:</td><td colspan="2">${data.college}</td>
                </tr>
                `;
        }
        else if(data.role ==='tpo' || data.role === 'club'){
            html =`
                <tr>
                    <td>Name:</td><td>${data.fullName}</td><td><a class="modal-trigger" href="#modal-name"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>Email:</td><td>${data.email}</td><td><a class="modal-trigger" href="#modal-email"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>Mobile No.:</td><td>${data.mobileNo}</td><td><a class="modal-trigger" href="#modal-mobile"><i class="icon ion-edit"></i></a></td>
                </tr>
                <tr>
                    <td>College:</td><td colspan="2">${data.college}</td>
                </tr> 
                `;
        }

        profileView.innerHTML = html;
    }


    //events
    renderEventsCard(eventView, cardData, id){

        const html = `
        <div class="col s12 m6">
            <div class="card small sticky-action" id="${id}" authorId="${cardData.author}">
                <div class="cardUserDetails">
                    <div class="userImage">
                        <img class="circle userImg" src="${cardData.userImage}" alt="">
                   </div>
                    <div class="userDetails">
                        <div class="userName"><span>${cardData.userName}</span></div>
                        <div class="userCollege"><span>${cardData.userCollege}</span></div>
                    </div>
                    <div class="cardMenu">
                        <a href="#" class="dropdown-trigger" data-target="${this.EdropdId}"><i class="icon ion-android-more-vertical"></i></a>
                    </div>
                    <ul id="${this.EdropdId}" class='dropdown-content'>
                        <li><a href="#!" class="edit"><i class="icon ion-edit"></i>Edit</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#" class="delete"><i class="icon ion-android-delete"></i>Delete</a></li>
                    </ul>
                </div>
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${cardData.eventImage}" alt="">
                </div>
                <div class="card-content">
                <div class="card-title activator grey-text text-darken-4">${cardData.eventTitle}</div>
                <div class="activateIcon activator"><i class="icon ion-android-more-vertical right"></i></div>
                </div>
                <div class="card-action center">
                    <a class="eventDetails" id=${id} href="#">Click Here For More Info...</a>
                </div>
                <div class="card-reveal">
                    <span class="card-title">${cardData.eventTitle}<i class="icon ion-android-close right" style="color: grey;"></i></span>
                    <span class="descText">${cardData.eventDesc}</span>
                </div>
            </div>
        </div>
        
        `;

        this.EdropdId = db.collection('EAutoId').doc().id;

        eventView.innerHTML += html;

        //Iniialiazing dynamic dropdown
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
    }

    //eventUserCard
    renderEventsUserCard(eventView, cardData, id){

        const html = `
        <div class="col s12 m6">
            <div class="card small sticky-action" id="${id}">
                <div class="cardUserDetails">
                    <div class="userImage">
                        <img class="circle userImg" src="${cardData.userImage}" alt="">
                   </div>
                    <div class="userDetails">
                        <div class="userName"><span>${cardData.userName}</span></div>
                        <div class="userCollege"><span>${cardData.userCollege}</span></div>
                    </div>
                </div>
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${cardData.eventImage}" alt="">
                </div>
                <div class="card-content">
                <div class="card-title activator grey-text text-darken-4">${cardData.eventTitle}</div>
                <div class="activateIcon activator"><i class="icon ion-android-more-vertical right"></i></div>
                </div>
                <div class="card-action center">
                    <a class="eventDetails" id=${id} href="#">Click Here For More Info...</a>
                </div>
                <div class="card-reveal">
                    <span class="card-title">${cardData.eventTitle}<i class="icon ion-android-close right" style="color: grey;"></i></span>
                    <span class="descText">${cardData.eventDesc}</span>
                </div>
            </div>
        </div>
        
        `;

        eventView.innerHTML += html;
    }

    renderEventDetails(eventDetailsView, data){
        
        const html = `

            <div class="eventTitle" style="margin:20px 0px;">
                <span class="etitle">${data.eventTitle}</span>
            </div>
            <div class="eventPoster" style="margin:20px 0px;">
                <img class="eposter" src="${data.eventImage}">
            </div>
            <div class="eventDesc" style="margin:20px 0px;">
                <span>
                    ${data.eventDesc}
                </span>
            </div>
            <div class="eventStartDate" style="margin:20px 0px;">
                <span>
                    <strong>Start Date :</strong>
                </span>
                <span>
                    ${data.startDate}
                </span>
            </div>
            <div class="eventEndDate" style="margin:20px 0px;">
                <span>
                    <strong>End Date :</strong>
                </span>
                <span>
                    ${data.endDate}
                </span>
            </div>
            <div class="eventStartTime" style="margin:20px 0px;">
                <span>
                    <strong>Start Time :</strong>
                </span>
                <span>
                    ${data.startTime}
                </span>
            </div>
            <div class="eventEndTime" style="margin:20px 0px;">
                <span>
                    <strong>End Time :</strong>
                </span>
                <span>
                    ${data.endTime}
                </span>
            </div>
            <div class="eventVenue" style="margin:20px 0px;">
                <span>
                    <strong>Venue :</strong>
                </span>
                <span>
                    ${data.eventVenue}
                </span>
            </div>
            <div class="whatsApp" style="margin:20px 0px;">
                <span>
                    <a href="https://api.whatsapp.com/send?phone=91${data.whatsApp}"><i class="icon ion-ios-chatbubble" style="color: #3d90e3;"></i>&nbsp;WhatsApp</a>
                    for more details...
                </span>
            </div>
            <div class="ebtn">
                <a href="${data.regLink ? data.regLink : '#'}" class="btn modalBtn">Book Now</a>
            </div>
        `;

        eventDetailsView.innerHTML = html;
    }

    renderEditEventView(data){
        document.querySelector('#upTitle').value=`${data.eventTitle}`;
        document.querySelector('#upTitle').labels[0].classList.add('active');
        upEditor.setData(`${data.eventDesc}`);
        document.querySelector('#up-startDate').value=`${data.startDate}`;
        document.querySelector('#up-startDate').labels[0].classList.add('active');
        document.querySelector('#up-endDate').value=`${data.endDate}`;
        document.querySelector('#up-endDate').labels[0].classList.add('active');
        document.querySelector('#up-startTime').value=`${data.startTime}`;
        document.querySelector('#up-startTime').labels[0].classList.add('active');
        document.querySelector('#up-endTime').value=`${data.endTime}`;
        document.querySelector('#up-endTime').labels[0].classList.add('active');
        document.querySelector('#up-eventVenue').value=`${data.eventVenue}`;
        document.querySelector('#up-eventVenue').labels[0].classList.add('active');
        document.querySelector('#up-whatsApp').value=`${data.whatsApp}`;
        document.querySelector('#up-whatsApp').labels[0].classList.add('active');
        document.querySelector('#up-regLink').value = `${data.regLink}`;
        document.querySelector('#up-regLink').labels[0].classList.add('active');
    }


    //drives
    renderDrivesCard(driveView, cardData, id){

        const html = `
        <div class="col s12 m6">
            <div class="card small sticky-action" id="${id}" authorId="${cardData.author}">
                <div class="cardUserDetails">
                    <div class="userImage">
                        <img class="circle userImg" src="${cardData.userImage}" alt="">
                    </div>
                    <div class="userDetails">
                        <div class="userName"><span>${cardData.userName}</span></div>
                        <div class="userCollege"><span>${cardData.userCollege}</span></div>
                    </div>
                    <div class="cardMenu">
                        <a href="#" class="dropdown-trigger" data-target="${this.dropdownId}"><i class="icon ion-android-more-vertical"></i></a>
                    </div>
                    <ul id="${this.dropdownId}" class='dropdown-content'>
                        <li><a href="#!" class="edit"><i class="icon ion-edit"></i>Edit</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#" class="delete"><i class="icon ion-android-delete"></i>Delete</a></li>
                    </ul>
                </div>
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${cardData.driveImage}" alt="">
                </div>
                <div class="card-content">
                <div class="card-title activator grey-text text-darken-4">${cardData.driveTitle}</div>
                <div class="activateIcon activator"><i class="icon ion-android-more-vertical right"></i></div>
                </div>
                <div class="card-action center">
                    <a class="driveDetails" id=${id} href="#">Click Here For More Info...</a>
                </div>
                <div class="card-reveal">
                    <span class="card-title">${cardData.driveTitle}<i class="icon ion-android-close right" style="color: grey;"></i></span>
                    <span class="descText">${cardData.driveDesc}</span>
                </div>
            </div>
        </div>
        
        `;

        this.dropdownId = db.collection('autoId').doc().id;

        driveView.innerHTML += html;

        //Iniialiazing dynamic dropdown
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);

    }


    renderDrivesUserCard(driveView, cardData, id){

        const html = `
        <div class="col s12 m6">
            <div class="card small sticky-action" id="${id}">
                <div class="cardUserDetails">
                    <div class="userImage">
                        <img class="circle userImg" src="${cardData.userImage}" alt="">
                    </div>
                    <div class="userDetails">
                        <div class="userName"><span>${cardData.userName}</span></div>
                        <div class="userCollege"><span>${cardData.userCollege}</span></div>
                    </div>
                </div>
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${cardData.driveImage}" alt="">
                </div>
                <div class="card-content">
                <div class="card-title activator grey-text text-darken-4">${cardData.driveTitle}</div>
                <div class="activateIcon activator"><i class="icon ion-android-more-vertical right"></i></div>
                </div>
                <div class="card-action center">
                    <a class="driveDetails" id=${id} href="#">Click Here For More Info...</a>
                </div>
                <div class="card-reveal">
                    <span class="card-title">${cardData.driveTitle}<i class="icon ion-android-close right" style="color: grey;"></i></span>
                    <span class="descText">${cardData.driveDesc}</span>
                </div>
            </div>
        </div>
        
        `;

        driveView.innerHTML += html;

    }

    renderDriveDetails(driveDetailsView, data){
        
        const html = `

            <div class="driveTitle" style="margin:20px 0px;">
                <span class="etitle">${data.driveTitle}</span>
            </div>
            <div class="drivePoster" style="margin:20px 0px;">
                <img class="eposter" src="${data.driveImage}">
            </div>
            <div class="driveDesc" style="margin:20px 0px;">
                ${data.driveDesc}
            </div>
            <div class="ebtn">
                <a href="${data.regLink}" class="btn modalBtn">Register</a>
            </div>
        
        `;

        driveDetailsView.innerHTML = html;
    }

    renderEditDriveView(data){
        document.querySelector('#upTitle').value=`${data.driveTitle}`;
        document.querySelector('#upTitle').labels[0].classList.add('active');
        upEditor.setData(`${data.driveDesc}`);
        document.querySelector('#up-regLink').value = `${data.regLink}`;
        document.querySelector('#up-regLink').labels[0].classList.add('active');
    }


    //remove
    removeFromDom(id){
        const Elem = document.querySelector(`#${id}`).parentElement;
        Elem.remove();
    }

    removeBroadFromDom(id){
        const Elem = document.querySelector(`#${id}`);
        Elem.remove();
    }

    renderBroadCast(broadView, data, id){

        const when = dateFns.distanceInWordsToNow(data.broadcast_at.toDate(), {addSuffix: true});
        const html = `
                <div class="card broadCard" id="${id}" userId="${data.userId}">
                    <div class="card-content">
                        <div class="username">
                            <strong>${data.username}</strong>
                            <span><a href="#"><i class="icon ion-android-delete right delete"></i></a></span>
                        </div>
                        <div class="message">
                            ${data.message}
                        </div>
                        <div class="time">
                            ${when}
                        </div>
                    </div>
                </div>
        `;

        broadView.innerHTML += html;
    }

    renderUserBroadCast(broadView, data, id){

        const when = dateFns.distanceInWordsToNow(data.broadcast_at.toDate(), {addSuffix: true});
        const html = `
                <div class="card broadCard" id="${id}">
                    <div class="card-content">
                        <div class="username">
                            <strong>${data.username}</strong>
                        </div>
                        <div class="message">
                            ${data.message}
                        </div>
                        <div class="time">
                            ${when}
                        </div>
                    </div>
                </div>
        `;

        broadView.innerHTML += html;
    }
    
}