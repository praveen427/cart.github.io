import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ser: AuthService) { }

  ngOnInit(): void {
  }

  ProductArray = [
    {
      prodId: 1,
      img : "../../assets/p1.jpg",
      amt : 400,
      qnt : 1
    },
    {
      prodId: 2,
      img : "../../assets/p2.jpg",
      amt : 600,
      qnt : 1
    },
    {
      prodId: 3,
      img : "../../assets/p3.jpg",
      amt : 800,
      qnt : 1
    },
    {
      prodId: 4,
      img : "../../assets/p4.jpg",
      amt : 1000,
      qnt : 1
    }
  ];

// increment qnt
  inc(prod){
    console.log(prod.qnt)
    if(prod.qnt!=5){
      prod.qnt += 1;
    }
    
  }

  //decrememnt qnt

  dec(prod){
    console.log(prod.qnt)
    if(prod.qnt!=1){
      prod.qnt -= 1;
    }
  }

//add to cart
itemsCart: any = [];

addCart(category){
console.log(category)

let cartDataNull = localStorage.getItem('localCart'); //2nd get item
if(cartDataNull == null){
  let storeDataGet:any = [];
  storeDataGet.push(category);
  localStorage.setItem('localCart', JSON.stringify(storeDataGet))
}
else
{
  var id = category.prodId;
  let index: number = -1; //matching index
  //access global variable (itemsCart) used by this key word
  this.itemsCart = JSON.parse(localStorage.getItem('localCart')); 
  //storing cart data ...string into js obj
  
  //prodId is same or not... if same update the qntity.. not store it again
  for(let i=0; i<this.itemsCart.length; i++){
    if(parseInt(id) === parseInt(this.itemsCart[i].prodId)){
      this.itemsCart[i].qnt = category.qnt; 
      index = i;
      break; 
    }
 
  }

  //if ProdId is not match
  if(index == -1){
    this.itemsCart.push(category);
    localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
  }
  else
  {
    localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
  }

}
this.cartNumberFunc();
// localStorage.setItem('localCart', JSON.stringify(category)) //fst setitem
}



//cartlength display

cartNumber:number = 0;

cartNumberFunc(){
  var cartValue = JSON.parse(localStorage.getItem('localCart'));
  this.cartNumber = cartValue.length;
  //calling service .. while we used Subject next method we are calling,
  this.ser.cartSubject.next(this.cartNumber);
  // console.log(this.cartNumber);
  

}

}
