import { Injectable } from "@angular/core";
import { Product } from "../modals/product.modals";
import { AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class ProductDbService{

productList:Product[]=[];
product:Product=new Product();
constructor(private af:AngularFireDatabase){

}

getAllProduct(){
    return this.af.list('/products');
}


addData(product:Product){
   
    this.product.name=product.name;
    this.product.category=product.category;
    this.product.color=product.color;
    this.product.img=product.img;
    this.product.brand=product.brand;
    this.product.size=product.size;
    this.product.quantity=product.quantity;
    this.product.price=product.price;
    this.product.date=product.date;
    const db= this.af.list('/products');
  db.push(product);
 
}

updateProductqty(i,sqty,pqty){
    let quantity= pqty-sqty;
    const db = this.af.list('/products');
if(quantity>0){
    db.update(i,{
        quantity:quantity
    })
}
else{
    db.remove(i);
}


  
}

updateProduct(item:Product,key){
  
let size;

    const db = this.af.list('/products');
if(item.size==undefined){
    size="";
}
else {
    size=item.size;
}
    db.update(key,{
        name:item.name,
      
        color:item.color,
        img:item.img,
        brand:item.brand,
        size:size,
        quantity:item.quantity,
        price:item.price,
      
    })
}




}

