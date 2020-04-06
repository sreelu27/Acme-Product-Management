import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements  CanActivate{

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      let id = +route.url[1].path;
      if(isNaN(id) || id <1){
        alert('Invalid product id');
        this.router.navigate(['/products']);
        return false;
      };

    return true;
  }
  
}
