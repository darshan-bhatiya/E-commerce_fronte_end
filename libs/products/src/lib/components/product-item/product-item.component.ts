import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { GetProducts } from '../../store/actions/product.action';
import { ProductState } from '../../store/state/product.state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: []
})

export class ProductsListComponent implements OnInit, OnDestroy{
  
  @Select(ProductState.getProductList)products$!: Observable<Product[]>;
  @Select(ProductState.selectedProdsByCategories)productsByCats$!: Observable<Product[]>;
  @Select(ProductState.productsLoaded)productsLoaded$!: Observable<boolean>;

  // products: Product[] = [];
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();
  isCategoryPage!: boolean;
  productsList$ = this.products$; 

  constructor(
    private prodService: ProductsService,
    private catesService: CategoriesService,
    private route: ActivatedRoute,
    private store:Store
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: (string|undefined)[]){
    this.productsLoaded$
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (res) => {
        if(!res) {this.store.dispatch(new GetProducts())}
        if((categoriesFilter || []).length) {this.store.dispatch(new GetProducts(categoriesFilter))}
        this.productsList$ = !(categoriesFilter || []).length ? this.products$ : this.productsByCats$;
        }, 
        error: (err) => console.log("Error In getProducts", err)
    });
  }

  private _getCategories() {
    
    this.catesService.getCategories().pipe(takeUntil(this.endSubs$))
      .subscribe(resCats => this.categories = resCats);
  }

  categoryFilter(){
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category.id);
    
    this._getProducts(selectedCategories);
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }
}
