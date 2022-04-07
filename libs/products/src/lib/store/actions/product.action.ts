export class GetProducts {
    static readonly type = '[Product] Get';
    constructor(public catFilter?: (string|undefined)[]) {}
}

export class SetSelectedProduct {
    static readonly type = '[Product] Set';
    constructor(public id:string) {}
}

// export class GetProdBySelectedCategories {
//     static readonly type = '[Products] Get';
// }

// export class GetProduct {
//     static readonly type = '[Product] Get'
//     constructor(public id:string) {}
// }

// export class GetProductsCount {
//     static readonly type = '[ProductsCount] Get'
// }

// export class GetFeaturedProducts {
//     static readonly type = '[FeaturedProducts] Get'
// }