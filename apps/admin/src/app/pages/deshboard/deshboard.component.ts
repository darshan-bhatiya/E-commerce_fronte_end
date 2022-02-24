import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@bluebites/orders';
import { ProductsService } from '@bluebites/products';
import { UsersService } from '@bluebites/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-deshboard',
  templateUrl: './deshboard.component.html'
})
export class DeshboardComponent implements OnInit, OnDestroy {
  statistics:number[] = []
  endsubs$: Subject<any> = new Subject();

  constructor(
    private usersService:UsersService,
    private ordersService:OrdersService,
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrderCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe((values) => {
        this.statistics = values;
      });
  }

  ngOnDestroy(): void {
      this.endsubs$.next(null);
      this.endsubs$.complete();
  }
}
