import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import *  as firebase from 'firebase'
import { CanActivate, Router,ActivatedRouteSnapshot , RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Authetication } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private auth:Authetication,
        private route: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> 
        {
                
         if(this.auth.login) return true;
         else {
             this.route.navigate(['/login']);
             return false;
         }
        }
   




}