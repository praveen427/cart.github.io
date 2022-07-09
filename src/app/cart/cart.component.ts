import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';

import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private ser:AuthService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadCart();
  
  }

  //2 store into arr var
  getCartDetails:any=[];

  //1 create one method
  cartDetails(){
    if(localStorage.getItem('localCart')){
      //3 takes a JSON string and then transforms it into a JavaScript object.
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      console.log(this.getCartDetails);
    }
  }


//take localcart properties here as a parameter
//1calling increase method
  incQnt(prodId, qnt){
    // console.log(productid);
    // console.log(quantity);
    for(let i=0; i<this.getCartDetails.length; i++){
      if(this.getCartDetails[i].prodId === prodId){
        //2up to 5 only
        if(qnt!=5){
          this.getCartDetails[i].qnt = parseInt(qnt) + 1;
        }
        
      }
     
    }
    //3
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }


//1 calling decrease method
decQnt(prodId, qnt){
  // console.log(productid);
  // console.log(quantity);
  for(let i=0; i<this.getCartDetails.length; i++){
    if(this.getCartDetails[i].prodId === prodId){
      //2up to 5 only
      if(qnt != 1){
        this.getCartDetails[i].qnt = parseInt(qnt) - 1;
      }
      
    }
   
  }
//3
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
  this.loadCart();
  
}


//make grand total price
total: number = 0;
loadCart(){
  if(localStorage.getItem('localCart')){
    //Json to transforms it into a JavaScript object.(parse)
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
    // The reduce() method reduces the array to a single value. 
   this.total =  this.getCartDetails.reduce(function(acc, val){
      return acc + (val.amt * val.qnt);
    },0);
  }


}


// removeall method
cartNumber:number = 0;
removeall(){
  localStorage.removeItem('localCart');
  this.getCartDetails = [];

  this.total = 0;
  this.ser.cartSubject.next(this.cartNumber);

}

//remove single product item delete
singleDelete(getCartInfo){
console.log(getCartInfo);


if(localStorage.getItem('localCart')){
   this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
   for(let i=0; i<this.getCartDetails.length; i++){
    
    if(this.getCartDetails[i].prodId === getCartInfo){
      this.getCartDetails.splice(i,1);
      localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
      this.loadCart();
      this.cartNumberFunc();
      }
    }
}
}

//cartlength display



cartNumberFunc(){
  var cartValue = JSON.parse(localStorage.getItem('localCart'));
  this.cartNumber = cartValue.length;
  //calling service .. while we used Subject next method we are calling,
  this.ser.cartSubject.next(this.cartNumber);
  // console.log(this.cartNumber);
  
}



}



