import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, Point } from 'chart.js';
import { ProductDbService } from '../../services/productdb.service';
import { SaleService } from '../../services/saledb.service';
import { OrderProduct } from '../../modals/orderproduct.model';
import { Product } from '../../modals/product.modals';
import { Sale } from '../../modals/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
totalproduct;
totalsoldProduct;

ProductList:Product[]=[];
tempPList:Product[]=[];
buyprice;
saleprice;
saleList:Sale[]=[];
 tempList:Sale[]=[];
canvas: any;
  ctx: any;

  constructor(private productDB:ProductDbService,
  private Saledb:SaleService
  ) { }

  ngOnInit() {
 
    this.getProductList();
    this.getorderData();


    this.revenueChart();
this.salesAnalysis();

  }




  getorderData(){
   
    var sale=0;
    this.Saledb.gettProduct().snapshotChanges()
    .subscribe(
      (item)=>{
        this.tempList=[];
        item.forEach(element=>{
            const list = element.payload.toJSON();
        
            this.tempList.push(list as Sale);
            
        });

        let date='/'+String(new Date().getMonth()+1)+'/';
        let year='/'+String(new Date().getFullYear());
        this.saleList=[];
     
        let temp= this.tempList.filter(function(item){
          if((item.date.indexOf(date)>-1) && (item.date.indexOf(year)>-1) ){
          return 1;}
    
        });
    
  this.saleList=temp;
this.countsoldProduct(this.saleList);
        this.saleList.forEach(element=>{
          sale=(sale+element.totalprice);
         });
        localStorage.setItem("sale",String(sale));
        
       
   

      }
    );


  }

  getProductList(){
    var buy=0;
    var count=0;
    const data= this.productDB.getAllProduct().snapshotChanges()
    .subscribe(
      (item)=>{
        this.tempPList=[];
        item.forEach(element=>{
            const list = element.payload.toJSON();
            this.tempPList.push(list as Product)

        });

        let date='/'+String(new Date().getMonth()+1)+'/';
        let year='/'+String(new Date().getFullYear());
        this.ProductList=[];
        let temp= this.tempPList.filter(function(item){
          if((item.date.indexOf(date)>-1) && (item.date.indexOf(year)>-1) ){
          return 1;}
    
        });
        this.ProductList=temp;

          this.ProductList.forEach(item=>{
              count=count+item.quantity;
          })
  



        this.ProductList.forEach(element=>{
          buy=(buy+(element.price*element.quantity));
         });
      localStorage.setItem("buy",String(buy))
     this.totalproduct=count;
       
      }


    );
   
  }

  revenueChart(){
    let value=[localStorage.getItem("buy"),localStorage.getItem("sale")]

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
let data = new Chart(this.ctx,{
  type: 'pie',
  data:{
    labels:["Buy", "Sale"],
    datasets:[{
      label:'Revenue',
      data:value,
      backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
             
    ],
    }]
  },
  options: {

}
});

  }


salesAnalysis(date?,qty?){
let saledate=date;
let qtylist=qty;
  if((saledate==undefined) && (qtylist==undefined)){
 saledate=JSON.parse(localStorage.getItem("saledate"))

 qtylist=JSON.parse(localStorage.getItem("qtylist"));

  }



    this.canvas = document.getElementById('saleChart');
    this.ctx = this.canvas.getContext('2d');
let data = new Chart(this.ctx,{
  type: 'bar',
  data:{
   labels:saledate,
    datasets:[{
      label:'Sales Anylysis',
    data:qtylist,
      backgroundColor: [
                 'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
             
    ],
    }]
  },
  options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
});

  }

  monthly(){
this.getorderData();
var list 
 
 if(list.length=0){
  list=this.saleList;
}
else {
   list =JSON.parse(localStorage.getItem("SaleList"));
}
 var date=[];
 var qty=0
 var qtylist=[];

for(let i=0;i<list.length;i++){
date.push(list[i].date);
for(let j=0;j<Object.keys(list[i].products).length;j++){

qty=(qty+list[i].products[j].qty);
console.log(qty)
}
qtylist.push(qty);

}

this.salesAnalysis(date,qtylist);
console.log(qtylist)
localStorage.setItem("saledate",JSON.stringify(date));
localStorage.setItem("qtylist",JSON.stringify(qtylist));
  }


  weekly(){

    let date=new Date();
    let filterdate=new Date().getDate()-7+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
    let tdate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    this.getorderData();
    var list =this.saleList.filter(function(item){
        if(item.date>filterdate && (item.date<=tdate)){
return 1;
        }
    });

  
    var datelist=[];
    var qty=0
    var qtylist=[];
   //  console.log(list)
   for(let i=0;i<list.length;i++){
    datelist.push(list[i].date);
   for(let j=0;j<Object.keys(list[i].products).length;j++){
   qty=(qty+list[i].products[j].qty);
   }
   qtylist.push(qty);
   
   }
   this.salesAnalysis(datelist,qtylist);

  }


  countsoldProduct(list){
 
//console.log(list);
 ///  COUNT TOTAL SOLD PRODUCT ///
 var count=0;

    for(let i=0;i<list.length;i++){
 for(let j=0;j<Object.keys(list[i].products).length;j++){
    let item = Object.values(list[i].products[j]);
   count=(count+Number(item[1]));
 }
  
 }

this.totalsoldProduct=count;

  }

}
