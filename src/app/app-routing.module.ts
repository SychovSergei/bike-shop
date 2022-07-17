import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {ProductDetailsPageComponent} from "./product-details-page/product-details-page.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {EditProductPageComponent} from "./edit-product-page/edit-product-page.component";
import {RoleGuard} from "./shared/services/role.guard";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: '' , redirectTo: '/', pathMatch: 'full'},
      { path: '',
        component: ProductPageComponent
      },
      { path: 'contact',
        loadChildren: () => import('./contact-page/contact-page.module').then(module => module.ContactPageModule)
      },
      {
        path: 'product-details/:cardId',
        component: ProductDetailsPageComponent
      },
      { path: 'order',
        canActivate: [AuthGuard],
        loadChildren: () => import('./order-page/order-page.module').then(module => module.OrderPageModule)
      },
      { path: 'create-product',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: ['admin']
        },
        loadChildren: () => import('./create-product-page/create-product-page.module').then(module => module.CreateProductPageModule)
      },
      { path: 'edit/:cardId',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: ['admin', 'owner']
        },
        component: EditProductPageComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
