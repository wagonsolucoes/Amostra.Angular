import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModule,ButtonModule, FormModule, ModalModule, ToastModule, CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ClienteComponent } from './cliente.component';
import { MapsComponent } from './maps.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { ColorsComponent, ThemeColorComponent } from './colors.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';
import {NgxMaskModule} from 'ngx-mask-2'

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { EmprestadoComponent } from './emprestado.component';
import { LivroComponent } from './livro.component';

import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  ListGroupModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TooltipModule,
} from '@coreui/angular';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbWj4XPsIwYXRrsGZC8DSupHhx5oett-I',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    AgmDrawingModule,
    AlertModule,
    ModalModule,
    FormsModule,
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    ToastModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    CarouselModule,
    CollapseModule,
    DropdownModule,
    ListGroupModule,
    PaginationModule,
    PlaceholderModule,
    PopoverModule,
    ProgressModule,
    SharedModule,
    SpinnerModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    FormModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ClienteComponent,
    EmprestadoComponent,
    LivroComponent,
    LoginComponent,
    ColorsComponent,
    ThemeColorComponent,
    MapsComponent
  ]
})
export class ThemeModule {
}
