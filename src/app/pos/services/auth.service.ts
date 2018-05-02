import { Injectable } from "@angular/core";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "@firebase/util";
@Injectable()
export class Authetication {
user:any;
    constructor(private af:AngularFireAuth){

        this.user=this.af.authState;
    }


    login(email?,password?){
return this.af.auth.signInWithEmailAndPassword(email,password);


    }

    logout(){
        this.af.auth.signOut();
    }

//     isAutheticate():Observable<boolean>{
//  this.af.auth.currentUser.getIdToken()
//     }
}