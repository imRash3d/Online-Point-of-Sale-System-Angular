import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductDbService } from '../../../services/productdb.service';
import { Router } from '@angular/router';
import { AngularFireStorage  } from 'angularfire2/storage';

import { Observable } from '@firebase/util';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit  {
  size=false;
  colorshow=true;
  category="mobile";
  uploadPercent;
  downloadURL;
  constructor(private productDb:ProductDbService,
  private router:Router,
  private storage:AngularFireStorage


  ) { }

  ngOnInit() {
   
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = event.target.files[0].name;
    const task = this.storage.upload(filePath, file);
      // observe percentage changes

      this.uploadPercent=task.percentageChanges();
      // get notified when the download URL is available
      this.downloadURL=task.downloadURL().subscribe(
        (response)=>this.downloadURL=response
      );
  
 
  }

  SubmitData(form:NgForm){
    let itemsize;
    let itemcolor;
    if(form.value.size==undefined) {
      form.value.size="";


    }
    if(form.value.color==undefined) {
   
      form.value.color="";

    }
    console.log(form.value);


 form.value.img=this.downloadURL;
 let date=new Date();
 form.value.date=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
 if(this.downloadURL!=null){
      this.productDb.addData(form.value);
      this.router.navigate(['/home/product'])
     
      
    }

    else {
      alert("Somethiong Wrong !!! Try Again");
    }

  }
  selectcategory() {
    if((this.category=='tshirt') || (this.category=='poloshirt')){
        this.colorshow=false;
        this.size=true;

    }
    else {
      this.colorshow=true;
      this.size=false;
    }
    console.log(this.category);
  }

}
