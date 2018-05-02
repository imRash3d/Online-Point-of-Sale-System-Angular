import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Sale } from "../modals/order.model";


@Injectable()
export class SaleService {
list:Sale[]=[];

    constructor(private af:AngularFireDatabase){}
   
   
   
    addOrder(saleProduct){
        this.af.list('/orders').push(saleProduct);

    }

    gettProduct(){
        return this.af.list('/orders');

    }

    deleteorder(key){
        this.af.list('/orders').remove(key);
   
    }



  

}