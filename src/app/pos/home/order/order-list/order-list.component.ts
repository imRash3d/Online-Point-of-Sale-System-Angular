import { Component, OnInit, Input } from '@angular/core';
import { SaleService } from '../../../services/saledb.service';
import { OrderProduct } from '../../../modals/orderproduct.model';
import { Sale } from '../../../modals/order.model';
import { VallueArrayPipe } from '../../../../shared/vallue-array.pipe';
import { CountPipe } from '../../../../shared/count.pipe';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {



orderItem:Sale[];

templist:Sale[]=[];
  constructor(private saleService:SaleService) { }


  ngOnInit() {
    const data = this.saleService.gettProduct();
    data.snapshotChanges().subscribe(
      (iteam) => {
      this.orderItem=[];
        iteam.forEach(element => {
          const list = element.payload.toJSON();
          list["$key"] = element.key;
       this.orderItem.push(list as Sale);
  
          
        });
      }
    );

  }


  getAllproduct(){
    const data = this.saleService.gettProduct();
    data.snapshotChanges().subscribe(
      (iteam) => {
      this.templist=[];
        iteam.forEach(element => {
          const list = element.payload.toJSON();
          list["$key"] = element.key;
       this.templist.push(list as Sale);
  
          
        });
      }
    );
  }


  sort(e){
 this.getAllproduct();
 this.orderItem=[];
    let filter = e.target.value;
  let temp= this.templist.sort(function(p1,p2):any{
    if(p1.totalprice<p2.totalprice){
      return 1;
    }
   });

   this.orderItem=temp;
  }

  filterByday(){
    this.getAllproduct();
    this.orderItem=[];
    var  date=new Date();
    let  tdate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();

    
    let temp= this.templist.filter(function(item){
        if(item.date.indexOf(tdate)>-1){
          return 1
        }
    });

  this.orderItem=temp;
  }


  filterBymonth() {
    this.getAllproduct();
    this.orderItem=[];
    var  date=new Date();
    let  tdate='/'+(date.getMonth()+1)+'/';
    
    let temp= this.templist.filter(function(item){
      if(item.date.indexOf(tdate)>-1){
        return 1
      }
  });

this.orderItem=temp;
  }

  filterByYear(){
    this.getAllproduct();
    this.orderItem=[];

    var  date=new Date();
    let  tdate='/'+date.getFullYear();
    
    let temp= this.templist.filter(function(item){
      if(item.date.indexOf(tdate)>-1){
        return 1;
      }
  });

this.orderItem=temp;
  }


  delete(key) {
    this.saleService.deleteorder(key)
  }
}
