import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenDiarioPageRoutingModule } from './resumen-diario-routing.module';

import { ResumenDiarioPage } from './resumen-diario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenDiarioPageRoutingModule
  ],
  declarations: [ResumenDiarioPage]
})
export class ResumenDiarioPageModule {}
