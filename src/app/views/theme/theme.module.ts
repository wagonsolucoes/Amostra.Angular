import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AlertModule, ModalModule, ToastModule, CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ClienteComponent } from './cliente.component';
import { MapsComponent } from './maps.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { ColorsComponent, ThemeColorComponent } from './colors.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';

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
    ToastModule
  ],
  declarations: [
    ClienteComponent,
    LoginComponent,
    ColorsComponent,
    ThemeColorComponent,
    MapsComponent
  ]
})
export class ThemeModule {
}
