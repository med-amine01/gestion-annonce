import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateAdPage} from './create-ad.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAdPageRoutingModule {}
