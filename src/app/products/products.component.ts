import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  pageTitle: string = 'Product List';
  imageWidth:number=50;
  imageMargin:number=2;
  showImage:boolean=false;
  _listFilter: string = '';

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts= this.listFilter?this.performFilter(this.listFilter):this.products;
  }

  filteredProducts:IProduct[];
  products: IProduct[]=[];
  errorMessage:string='';
  
  constructor( private productService: ProductService) {}

  onRatingClicked(message:string):void{
    this.pageTitle='Product List: '+message;
  }

  ngOnInit() {
    
    this.productService.getProducts().subscribe({
      next:products=> {
        this.products= products
        this.filteredProducts= this.products;
      },
      error:err=>this.errorMessage = err
    });

   
  }

  toggleImage():void{
    this.showImage=!this.showImage;
  }

  performFilter(filterBy:string):IProduct[]{
    filterBy= filterBy.toLocaleLowerCase();
    return this.products.filter((product:IProduct)=>
    product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
}
