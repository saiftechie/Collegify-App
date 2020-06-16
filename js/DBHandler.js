class DBHandler{

    constructor(){
        this.eventsdb = db.collection('events');
        this.drivesdb = db.collection('drives');
        this.driveBroad = db.collection('driveBroad');
        this.eventBroad = db.collection('eventBroad');
        this.auth = auth;
    }

    //Events Handler
    getEventsData(callback){
        
        this.eventsdb.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data(), change.doc.id);
                }
                else if(change.type === 'removed'){
                    appUI.removeFromDom(change.doc.id);
                }
            });
        });
    }


    uploadEventImage(uid, file){
        const response = storage.ref('event/'+ uid+ '/'+ file.name).put(file);
        return response;
    }

    async addEventData(data){
        const response = await this.eventsdb.add(data);
        return response;
    }

    async deleteEvent(eventId){
        const response = await this.eventsdb.doc(eventId).delete();
        return response;
    }

    async getEventDetails(id){
        
        const response = await this.eventsdb.doc(id).get();
        return response;
    }

    async updateEventData(eventId, data){
        const response = await this.eventsdb.doc(eventId).update(data);
        return response;
    }

    async addEventBroadCast(data){
        const response = await this.eventBroad.add(data);
        return response; 
    }

    getEventBroad(callback){
        this.eventBroad.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data(), change.doc.id);
                }
                else if(change.type === 'removed'){
                    appUI.removeBroadFromDom(change.doc.id);
                }
            });
        });
    }


    async deleteEventBroad(broadId){
        const response = await this.eventBroad.doc(broadId).delete();
        return response;
    }

    //Drives Handler
    getDrivesData(callback){
        this.drivesdb.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data(), change.doc.id);
                }
                else if(change.type === 'removed'){
                    appUI.removeFromDom(change.doc.id);
                }
            });
        });
    }

    getDriveBroad(callback){
        this.driveBroad.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data(), change.doc.id);
                }
                else if(change.type === 'removed'){
                    appUI.removeBroadFromDom(change.doc.id);
                }
            });
        });
    }

    async deleteDriveBroad(broadId){
        const response = await this.driveBroad.doc(broadId).delete();
        return response;
    }

    uploadDriveImage(uid, file){
        const response = storage.ref('drive/'+ uid+ '/'+ file.name).put(file);
        return response;
    }

    async addDriveBroadCast(data){
        const response = await this.driveBroad.add(data);
        return response; 
    }

    async updateDriveData(driveId, data){
        const response = await this.drivesdb.doc(driveId).update(data);
        return response;
    }

    async addDriveData(data){
        const response = await this.drivesdb.add(data);
        return response;
    }

    async deleteDrive(driveId){
        const response = await this.drivesdb.doc(driveId).delete();
        return response;
    }

    async getDrivesDetails(id){
        
        const response = await this.drivesdb.doc(id).get();
        return response;
    }
}