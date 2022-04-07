import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@bluebites/orders';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { SetSelectedProduct } from '../../store/actions/product.action';
import { ProductState } from '../../store/state/product.state';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  @Select(ProductState.selectedProduct)selectedProduct$!: Observable<Product>;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  private _getProduct(id: string) {
    // this.productService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProduct =>{
    //   this.product = resProduct;
    // });
    this.store.dispatch(new SetSelectedProduct(id));
    this.selectedProduct$.subscribe(selcProd => {
      this.product = selcProd;
    });
  }

  ngOnDestroy(): void {
      this.endSubs$.next(null);
      this.endSubs$.complete();
  }

  addProductToCart(){
    const cartItem : CartItem = {
      productId :this.product.id,
      quantity :this.quantity 
    }
    
    this.cartService.setCartItem(cartItem);
  }
}
