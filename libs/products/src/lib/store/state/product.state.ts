import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Product } from "../../models/product";
import { ProductsService } from "../../services/products.service";
import { GetProducts, SetSelectedProduct } from "../actions/product.action";

//State Model
export class ProductStateModel {
    products? : (Product | undefined)[];
    productsLoaded?: boolean;
    selectedProduct?: Product;
    selectedProdsByCategories?: (Product | undefined)[];
}

//State
@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        productsLoaded: false,
        selectedProduct: undefined,
        selectedProdsByCategories: undefined 
    }
})

@Injectable()
export class ProductState{

    constructor(private prodService: ProductsService) {}
    //Selecter has logic to get state data

    //Get Employee list from state
    @Selector()
    static getProductList(state: ProductStateModel) {
        return state.products
    }

    //Get Loaded Product from state
    @Selector()
    static productsLoaded(state: ProductStateModel) {
        return state.productsLoaded
    }

    //Get Selected Product
    @Selector()
    static  selectedProduct(state: ProductStateModel) {
        return state.selectedProduct
    }

    //Get Products as per selected categories
    @Selector()
    static selectedProdsByCategories(state: ProductStateModel){
        return state.selectedProdsByCategories
    }

    @Action(GetProducts)
    getProducts({getState, setState}: StateContext<ProductStateModel>, { catFilter }: GetProducts){
        //catFiter is array of categories
        if (!catFilter || !catFilter?.length) { 
            return this.prodService.getProducts().pipe(tap(res => {
                const state = getState();
    
                setState({
                    ...state,
                    products: res,
                    productsLoaded: true
                })
            }));                 
        } else {   
            const  state = getState();
            const prodList:(Product | undefined)[] = state?.products ?? [];

            const filterdProd:(Product | undefined)[]  =  prodList.filter( prod => {
                return ((catFilter || []).indexOf(prod?.category?.id || "") > -1)
            })
            setState({
                ...state,
                selectedProdsByCategories: filterdProd,
            })
            return null;
        }
    }   
    
    @Action(SetSelectedProduct)
    setSelectedProduct({getState, setState}: StateContext<ProductStateModel>, {id}: SetSelectedProduct){
        const  state = getState();
        const prodList:(Product | undefined)[] = state?.products ?? [];

        const index = prodList?.findIndex(pro => pro?.id === id);
        
        setState({
            ...state,
            selectedProduct: prodList[index]
        })
    }
}