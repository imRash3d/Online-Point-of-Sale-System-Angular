import { Injectable } from "@angular/core";
import { Product } from "../modals/product.modals";

@Injectable()
export class ProductService {
products:Product[]=[];

product1=new Product();
product2=new Product();
product3=new Product();
product4=new Product();

product5=new Product();
product6=new Product();
product7=new Product();
product8=new Product();
product9=new Product();

constructor(){
    this.product1.name="Summer T shirt";
    this.product1.category="tshirt";
    this.product1. img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_Nnd40eO0m6GvH09Fl60_jJqG2L-w3nq_Y6iCD7_Q5u4LQRc";
    this.product1.quantity=10;
    this.product1.price=70;
    this.product1.brand="Eassy"

    this.product2.name="Summer T shirt";
    this.product2.category="tshirt";
    this.product2. img="https://images-eu.ssl-images-amazon.com/images/I/710pXkFeEmL._UX342_.jpg";
    this.product2.quantity=5;
    this.product2.price=90;
    this.product2.brand="Eassy"


    this.product4.name="Summer Polo shirt";
    this.product4.category="poloshirt";
    this.product4. img="http://media.burton.co.uk/wcsstore/Burton/images/catalog/BR45J05JWHT_Large_M_1.jpg";
    this.product4.quantity=3;
    this.product4.price=70;
    this.product4.brand="Eassy"

    
    this.product3.name="Summer Polo shirt";
    this.product3.category="poloshirt";
    this.product3. img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY6LzWFQitxpQK4Hs0VccF19pGCdkT_Hz_DlBFsSb0tvfe073";
    this.product3.quantity=5;
    this.product3.price=50;
    this.product3.brand="Eassy"


    this.product5.name="Samsung A 5";
    this.product5.category="mobile";
    this.product5. img="https://images-na.ssl-images-amazon.com/images/I/81mKtZOvUmL._SL1500_.jpg";
    this.product5.quantity=3;
    this.product5.price=300;
    this.product5.brand="Samsung"


    this.product6.name="Samsung NOTE 4";
    this.product6.category="mobile";
    this.product6. img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw-pNwc5wWI5acagWl3-zRKXWNRsLPOIaMuYvjxRybnBAlhK2d";
    this.product6.quantity=2;
    this.product6.price=700;
    this.product6.brand="Samsung"
    
    this.product7.name="Leather   Shoes";
    this.product7.category="shoe";
    this.product7. img="https://ae01.alicdn.com/kf/HTB1A2OgkDnI8KJjSszgq6A8ApXaG/Akexiya-Fashion-Men-Shoes-Suede-Leather-Casual-Flat-Shoes-Lace-up-Men-s-Flats-For-Man.jpg";
    this.product7.quantity=5;
    this.product7.price=90;
    this.product7.brand="lotto"

    
    this.product8.name="Men's leather shoes";
    this.product8.category="shoe";
    this.product8. img="https://www.dhresource.com/0x0/f2/albu/g4/M01/F0/AB/rBVaEVgBkcqAFC5oAAOXbj3ToDY941.jpg";
    this.product8.quantity=3;
    this.product8.price=90;
    this.product8.brand="apex"

    this.product9.name="Man BB Cream ";
    this.product9.category="cosmetics";
    this.product9. img="https://i.pinimg.com/736x/27/fb/c5/27fbc5748068f4d88a5825c5175302b4--bb-creams-trou.jpg";
    this.product9.quantity=10;
    this.product9.price=20;
    this.product9.brand="gurniar"

    this.products.push(this.product1);
    this.products.push(this.product2);
    this.products.push(this.product3);
    this.products.push(this.product4);
    this.products.push(this.product5);
    this.products.push(this.product6);
    this.products.push(this.product7);
    this.products.push(this.product8);
    this.products.push(this.product9);

}
getAllproduct(){
    return this.products;
}
}