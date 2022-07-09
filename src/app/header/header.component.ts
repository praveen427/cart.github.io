import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ser: AuthService) { 
    this.ser.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })
  }

  ngOnInit(): void {
    this.cartItemFunc();
  } 

  cartItem:number = 0;

  cartItemFunc(){
    if(localStorage.getItem('localCart') != null){
      var cartCount = JSON.parse(localStorage.getItem('localCart'));//convert into JSON
      // console.log(cartCount);
      this.cartItem = cartCount.length;


    }
  }
}
