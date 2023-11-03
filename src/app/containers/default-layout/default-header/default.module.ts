import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { HttpClientModule } from '@angular/common/http';
import { DefaultHeaderComponent } from './default-header.component';


@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule
  ],
  declarations: [
    DefaultHeaderComponent,
  ]
})
export class DefaultModule {
}
