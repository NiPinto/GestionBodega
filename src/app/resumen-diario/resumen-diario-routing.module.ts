import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenDiarioPage } from './resumen-diario.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenDiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenDiarioPageRoutingModule {}
