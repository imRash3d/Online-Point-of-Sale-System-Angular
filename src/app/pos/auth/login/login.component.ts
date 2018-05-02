import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authetication } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:Authetication,
    private af:AngularFireAuth,
  private router:Router) { }
id;
  ngOnInit() {
   


  }

  login(form:NgForm){
    const email= form.value.email;
    const password= form.value.password;

// this.auth.login(email,password)
// .then(
//   response=>{
//     if(response){
//       this.router.navigate(['/home']);
//     }
    
//   }
// )
// .catch(err=>console.log(err))






  }

}
