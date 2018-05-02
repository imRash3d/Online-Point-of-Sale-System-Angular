import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Product } from '../../modals/product.modals';
import { ProductDbService } from '../../services/productdb.service';
import {  TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
editProductItem:Product;
  modalRef: BsModalRef;

  productList: Product[] = [];
  templist: Product[] = [];
  productBrands;
  shortingList: Product[] = [];
  showColor = false;
  showSize = false;
  catlist = [];
  colorList;
  sizeList;

  checklist = [];
  colorchecklist = [];
  sizechecklist = [];
  constructor(private router: Router,
private modalService: BsModalService,
    private productDb: ProductDbService) { }

  ngOnInit() {


    const data = this.productDb.getAllProduct();
    data.snapshotChanges().subscribe(
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


  addProduct() {
    this.router.navigate(['home/product/add']);

  }

  getAllproduct() {
    const data = this.productDb.getAllProduct();
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

  }



  //Filter 

  categiory(e) {
    let filter = e.target.value.toLowerCase();
    let brands = [];
    let color = [];
    let size = [];

    if (filter == "mobile" || filter == "shoe" || filter == "bag") {
      this.showColor = true;
      this.showSize = false;
    }
    else if (filter == "tshirt" || filter == "poloshirt") {
      this.showColor = false;
      this.showSize = true;
    }
    else {
      this.showColor = false;
      this.showSize = false;
    }

    this.productList = [];

    let temp = this.templist.filter(function (item) {
      if (item.category.toLowerCase() == filter) {
        return 1;
      }


    });


    temp.forEach(item => {
      if (brands.indexOf(item.brand) == -1) {
        brands.push(item.brand)
      }

      if (color.indexOf(item.color) == -1) {
        color.push(item.color)
      }
      if (size.indexOf(item.size) == -1) {
        size.push(item.size)
      }
      if (brands.indexOf(item.brand) == -1) {
        brands.push(item.brand);
      }
    });

    this.productList = temp;
    this.catlist = temp;
    this.checklist = [];
    this.productBrands = brands;
    this.colorList = color;
    this.sizeList = size;
  }

  brands(e) {
    let color = [];
    let size = [];
    this.getAllproduct();
    let brand = e.target.value;

    if (e.target.checked) {
      this.checklist.push(brand)
    }
    else {
      let i = this.checklist.indexOf(brand);
      this.checklist.splice(i, 1);
    }

    var list = []
    for (let i = 0; i < this.checklist.length; i++) {
      for (let j = 0; j < this.templist.length; j++) {
        if (this.templist[j].brand == this.checklist[i]) {
          list.push(this.templist[j]);
        }
      }
    }
    list.forEach(item => {

      if (color.indexOf(item.color) == -1) {
        color.push(item.color)
      }
      if (size.indexOf(item.size) == -1) {
        size.push(item.size)
      }

    });
    this.colorList = color;
    this.sizeList = size;
    this.productList = list;
    this.shortingList = list;
  }

  selectcColor(e) {

    let filter = e.target.value;
    if (e.target.checked) {
      this.colorchecklist.push(filter);

    }
    else {
      let i = this.colorchecklist.indexOf(filter);
      this.colorchecklist.splice(i, 1);
    }


    if (this.shortingList.length != 0) {
      this.filtercolorlist(this.shortingList);

    }
    else {
      this.filtercolorlist(this.catlist);
    }

  }



  selectSize(e) {
   
    let filter = e.target.value.toLowerCase();
    if (e.target.checked) {
      this.sizechecklist.push(filter);

    }
    else {
      let i = this.sizechecklist.indexOf(filter);
      this.sizechecklist.splice(i, 1);
    }

    console.log(this.sizechecklist)
    if (this.shortingList.length != 0) {
      this.filtersize(this.shortingList);

    }
    else {
      this.filtersize(this.catlist);
    }
  }



  filtercolorlist(itemlist) {
    this.productList = [];
    var list = [];
    for (let i = 0; i < this.colorchecklist.length; i++) {
      for (let j = 0; j < itemlist.length; j++) {
        if (itemlist[j].color == this.colorchecklist[i]) {
          list.push(itemlist[j])
        }
      }

      this.productList = list;
    }

  }

  filtersize(itemlist){
    this.productList = [];
    var list = [];
    for (let i = 0; i < this.sizechecklist.length; i++) {
      for (let j = 0; j < itemlist.length; j++) {
        if (itemlist[j].size.toLowerCase() == this.sizechecklist[i].toLowerCase()) {
          list.push(itemlist[j])
        }
      }

      this.productList = list;
    }


  }

  openModal(template: TemplateRef<any>,product) {
    this.modalRef = this.modalService.show(template);
   this.editProductItem=product;
  }



  SubmitData(pform,key){

    let date=new Date();
 pform.value.date=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();

 this.productDb.updateProduct(pform.value,key);
  
}

}
