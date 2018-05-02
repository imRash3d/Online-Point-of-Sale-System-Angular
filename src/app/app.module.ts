import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes}  from '@angular/router'
import {FormsModule} from  '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './pos/home/header/header.component';
import { DashboardComponent } from './pos/home/dashboard/dashboard.component';
import { ProductComponent } from './pos/home/product/product.component';
import { OrderComponent } from './pos/home/product/order/order.component';
import { ProductDetailsComponent } from './pos/home/product/product-details/product-details.component';
import { ProductFormComponent } from './pos/home/product/product-form/product-form.component';
import { OrderListComponent } from './pos/home/order/order-list/order-list.component';
import { OrderDetailsComponent } from './pos/home/order/order-details/order-details.component';
import { OrderEditComponent } from './pos/home/order/order-edit/order-edit.component';
import { AddUserComponent } from './pos/auth/add-user/add-user.component';
import { LoginComponent } from './pos/auth/login/login.component';
import { HomeComponent } from './pos/home/home.component';
import { Nf404Component } from './pos/home/nf404/nf404.component';
import { PosComponent } from './pos/pos.component';
import { ProductService } from './pos/services/product.service';
import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { ProductDbService } from './pos/services/productdb.service';
import { SaleService } from './pos/services/saledb.service';
import { VallueArrayPipe } from './shared/vallue-array.pipe';
import { CountPipe } from './shared/count.pipe';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {NgxPaginationModule} from 'ngx-pagination'
import { ModalModule } from 'ngx-bootstrap';
import { Authetication } from './pos/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './pos/services/authguard.service';



const routing:Routes =[
  {path:'login', component:LoginComponent},
  {path:'home/dashboard',component:DashboardComponent,
  canActivate:[AuthGuard]},
  {path:'home/product',component:ProductComponent, 
  canActivate:[AuthGuard]},
  {path:'home/product/order',component:OrderComponent,
  canActivate:[AuthGuard]
},
  {path:'home/product/add',component:ProductFormComponent,
  canActivate:[AuthGuard]
},
  {path:'home/order/order-list',component:OrderListComponent,
  canActivate:[AuthGuard]
},
  {path:'home/registration',component:AddUserComponent,
  canActivate:[AuthGuard]
},
  {path:'home',component:DashboardComponent, canActivate:[AuthGuard]},
  {
    path:'', redirectTo:'home',pathMatch:'full'
  },



  {
    path:'**', component:Nf404Component
  }
]

@NgModule({
  declarations: [
    AppComponent,
  HeaderComponent,
    DashboardComponent,
    ProductComponent,
    OrderComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderEditComponent,
    AddUserComponent,
    LoginComponent,
    HomeComponent,
    Nf404Component,
    PosComponent,
    VallueArrayPipe,
    CountPipe,
 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routing),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    AngularFireAuthModule
  

  ],
  providers: [ProductService,ProductDbService,SaleService,Authetication,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
