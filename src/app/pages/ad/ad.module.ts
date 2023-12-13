import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AdPageRoutingModule} from './ad-routing.module';

import {AdPage} from './ad.page';
import {ToolbarPageModule} from "../toolbar/toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdPageRoutingModule,
    ToolbarPageModule
  ],
  declarations: [AdPage]
})
export class AdPageModule {}
