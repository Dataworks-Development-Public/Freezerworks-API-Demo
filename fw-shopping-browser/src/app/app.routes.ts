import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
    {
      path: 'samples',
      component: HomeComponent
    },
    {
      path: 'samples/:sampleType',
      component: ItemDetailComponent
    },
    {
      path:'my-requests',
      component: MyRequestsComponent
    },
    {
      path: 'shopping-cart',
      component: ShoppingCartComponent
    },
    {
      path: '',
      redirectTo: 'samples',
      pathMatch: 'full'
    }
];
