import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@bluebites/users';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  UserId = "61fa806d3f9d67bef53c8f53";
  orderItems: OrderItem[] | any = [];
  countries:{ id: string; name: string; }[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cartService : CartService,
    private ordreService: OrdersService
    ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._getCartItems();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }

  private _initUserForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });  
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  private _getCartItems() {
    const cart = this.cartService.getCart();
    this.orderItems = cart.items?.map(item => {
      return {
        product: item?.productId,
        quantity: item?.quantity
      } 
    });
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.userForm['street'].value,
      shippingAddress2: this.userForm['apartment'].value,
      city: this.userForm['city'].value,
      zip: this.userForm['zip'].value,
      country: this.userForm['country'].value,
      phone: this.userForm['phone'].value,
      status: 0,
      user: this.UserId,
      dateOrdered: this.userForm['apartment'].value,
    };

    console.log(order);
    this.ordreService.createOrder(order).subscribe(() => {
      //redirect to  thank-you page // payment
      this.router.navigate(['/success']);
      this.cartService.emptyCart();
    },
    () => {
      //display some messange to user on error
    });
  }

  backToCart() {
    this.router.navigate(['/checkout']);
  }

  get userForm() {
    return this.checkoutFormGroup.controls;
  }
}
