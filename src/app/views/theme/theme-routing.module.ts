import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { MapsComponent } from './maps.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login',
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cliente',
      },
      {
        path: 'cliente',
        component: ClienteComponent,
        data: {
          title: 'Cliente',
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'maps',
      },
      {
        path: 'maps',
        component: MapsComponent,
        data: {
          title: 'Maps',
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'logout',
      },
      {
        path: 'logout',
        component: LoginComponent,
        data: {
          title: 'Logout',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
