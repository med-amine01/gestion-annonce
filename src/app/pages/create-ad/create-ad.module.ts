import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreateAdPageRoutingModule} from './create-ad-routing.module';

import {CreateAdPage} from './create-ad.page';
import {ToolbarPageModule} from "../toolbar/toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdPageRoutingModule,
    ReactiveFormsModule,
    ToolbarPageModule
  ],
  declarations: [CreateAdPage]
})
export class CreateAdPageModule {}
