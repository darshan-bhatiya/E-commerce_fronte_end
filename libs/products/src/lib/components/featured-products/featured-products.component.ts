import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts() {
    this.productService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.featuredProducts = products;
    })
  }

  ngOnDestroy(): void {
      this.endSubs$.next(null);
      this.endSubs$.complete();
  }
}
