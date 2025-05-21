import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { EditrolloComponent } from './componentes/editrollo/editrollo.component';
import { BorrartrolloComponent } from './componentes/borrartrollo/borrartrollo.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemsComponent } from './items/items.component';
import { DiaryComponent } from './diary/diary.component';

@NgModule({
  declarations: [AppComponent,EditrolloComponent,BorrartrolloComponent, InventoryComponent, ItemsComponent, DiaryComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule , FormsModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
