class UserHandler{
    constructor(){
        this.userdb = db.collection('user');
        this.auth = auth;
    }

    async register(email, cnfmPass){

        let response = await this.auth.createUserWithEmailAndPassword(email, cnfmPass);

        return response;
    }
    
    async login(email, password){

        let response = await this.auth.signInWithEmailAndPassword(email, password);
        
        return response;
    }

    async getData(uid){
        const response = await db.collection('user').doc(uid).get();
        return response;
    }

    uploadProfilePic(uid, file){
        const response = storage.ref('user/'+ uid + '/profile.jpg').put(file);
        return response;
    }

    async updateName(uid,name){
        const response = await db.collection('user').doc(uid).update({"fullName":name});
        return response;
    }

    async updateEmail(uid,email){
        const response = await db.collection('user').doc(uid).update({"email":email});
        return response;
    }

    async updateMobile(uid,mobile){
        const response = await db.collection('user').doc(uid).update({"mobileNo":mobile});
        return response;
    }

    async updateSem(uid,sem){
        const response = await db.collection('user').doc(uid).update({"semester":sem});
        return response;
    }

    async deleteAccount(uid){
        const response = db.collection('user').doc(uid).delete().then(() => {storage.ref('user/'+ uid + '/profile.jpg').delete();});
        return response;
    }

    async logout(){

        let response = await this.auth.signOut();
        
        return response;
    }
}