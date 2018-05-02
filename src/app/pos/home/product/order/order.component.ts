import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../modals/product.modals';
import {AngularFireDatabase } from 'angularfire2/database'
import { ProductDbService } from '../../../services/productdb.service';
import { Subscription } from 'rxjs/Subscription';
import { Sale } from '../../../modals/order.model';
import { OrderProduct } from '../../../modals/orderproduct.model';
import { SaleService } from '../../../services/saledb.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
showSize=false;
showColor=false;
showBrands=false;
keysList=[];
colorList;
sizeList;

colorchecklist

  sale:Sale=new Sale();
  templist:Product[]=[]
  subscription:Subscription
productList:Product[]=[];
product:Product=new Product();
totalPrice=0;
subTotal=0;
vat=0;
tempprice;
selectproductList:Product[]=[];
sortingList=[];
productbrands=[];

salePrdoucts:OrderProduct[]=[];
  constructor(
private productservice:ProductDbService,
private ps:ProductService ,
private saleService:SaleService ) { }

  ngOnInit() {
    const data = this.productservice.getAllProduct();
    this.subscription= data.snapshotChanges().subscribe(
      (iteam) => {
        this.productList = [];
        iteam.forEach(element => {
          const list = element.payload.toJSON();
          list["$key"] = element.key;
          this.productList.push(list as Product)
        });
      }
    )
this.getAllproduct();
  
  }

  getAllproduct(){
    const data = this.productservice.getAllProduct();
    data.snapshotChanges().subscribe(
      (iteam) => {
        this.templist = [];
        iteam.forEach(element => {
          const list = element.payload.toJSON();
          list["$key"] = element.key;
          this.templist.push(list as Product)
        });
      }
    )


    for (let i = 0; i < this.templist.length; i++) {
      this.productList.push(this.templist[i])
    }
  }

  selectItem(i,key){
 
if(this.keysList.indexOf(key)==-1){
  this.selectproductList.push(this.productList[i]);
  this.keysList.push(key);

  this.getTotal(i);
  this.setTempPrice();
  return this.selectproductList;
}
else {
  alert("duplicate Product");
}


  }

  getTotal(index){
    let item;
    this.subTotal= (this.subTotal+this.productList[index].price);
    this.vat= (1/10)*this.subTotal;
    this.totalPrice=this.subTotal+this.vat;

    
  }

  quantity(e,index){
    this.tempprice[index].qty=Number(e.target.value);
    let price=0;
   for(let i=0;i<this.selectproductList.length;i++){
    price=(price+(this.selectproductList[i].price*this.tempprice[i].qty))
   }
   this.subTotal= price;
   this.vat= (1/10)*this.subTotal;
   this.totalPrice=this.subTotal+this.vat;
}


setTempPrice(){
  let item;
if(this.tempprice==null){
  this.tempprice=[];
  for(let i=0;i<this.selectproductList.length;i++){
  item={
    id:i,
    qty:1
  }
  this.tempprice.push(item);
  }
}
else {
  item={
    id:(this.tempprice.length)-1,
    qty:1
  }
  this.tempprice.push(item);
}

}


delete(index,key){

  let price= this.tempprice[index].qty*this.selectproductList[index].price;

  this.subTotal=this.subTotal-price;
  this.vat= (1/10)*this.subTotal;
  this.totalPrice=this.subTotal+this.vat;
  this.selectproductList.splice(index,1);
  this.tempprice.splice(index,1);
this.keysList.splice(index,1)
}

///FILter.....

category(e){
 let temp;

 let brands=[];
 let color=[];
 let size=[];

 let filter=e.target.value.toLowerCase();
this.showBrands=true;
if(filter=="mobile" || filter=="shoe" || filter=="bag"){
  this.showColor=true;
  this.showSize=false;
}
else if(filter=="tshirt" || filter=="poloshirt"){
  this.showColor=false;
  this.showSize=true;
}
else {
  this.showColor=false;
  this.showSize=false;
}

temp=this.templist.filter(function(item){

  if(item.category.toLowerCase()==filter){
    return 1;
  }
 });


this.productList=temp;
this.sortingList=temp;

this.sortingList.filter(item=>{
  if(color.indexOf(item.color)==-1){
    color.push(item.color)
  }
  if(size.indexOf(item.size)==-1){
    size.push(item.size)
  }
    if(brands.indexOf(item.brand)==-1){
     brands.push(item.brand);
    }
})
this.colorList=color;
this.sizeList=size;
this.productbrands=brands;

console.log(this.sizeList);

}
colorfilter(e){
  let temp;
  this.productList=this.sortingList;
 temp=this.productList.filter(function(item){
   if(item.color==e.target.value){
 return 1;
 
   }
 
  });
 
 this.productList=temp;
}

brands(e){

  let temp;
  this.productList=this.sortingList;
 temp=this.productList.filter(function(item){
   if(item.brand==e.target.value){
 return 1;
 
   }
 
  });
 
 this.productList=temp;
 }






order(){

let date=new Date();
this.sale.date=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();

  // generate Random Id 
  let id=Math.random().toString(36).substr(2, 4)+ String(Math.round(Math.random()*1000));
  this.sale.orderid=id;
  this.sale.totalprice=this.totalPrice;

    for(let i=0;i<this.selectproductList.length;i++){
      var Saleproduct:OrderProduct=new OrderProduct();
      Saleproduct.name=this.selectproductList[i].name;
      Saleproduct.qty=this.tempprice[i].qty;
      this.salePrdoucts.push(Saleproduct);

      //sold item subtract from product list 
let key =  this.selectproductList[i].$key;
      this.productList.forEach(item=>{
        if(item.$key==key){
          this.productservice.updateProductqty(key,Saleproduct.qty,
           item.quantity)
        }
      })
 

  }


this.sale.products=this.salePrdoucts;
if(this.sale.products.length==0){
alert("Select Your Product 1st")
}
else {

this.saleService.addOrder(this.sale);

  
this.ClearBucket();

}



}



 ngOnDestroy(){
this.subscription.unsubscribe();
 }




 ClearBucket(){
  //alert("Ordered update Successfullt");
 // window.location.reload();
  this.selectproductList=[];
  this.subTotal=0;
  this.vat=0;
  this.totalPrice=0;
 
 }



}