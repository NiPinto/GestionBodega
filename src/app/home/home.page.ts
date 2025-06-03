import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { ItemsComponent } from '../items/items.component';
import { DiaryComponent } from '../diary/diary.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('contenedor', { read: ViewContainerRef, static: true })
  contenedor!: ViewContainerRef;

  mostrar: boolean = false; 

  toggleContenido() {
    this.mostrar = !this.mostrar; 
  }

  constructor() {}

  ngOnInit() {
    this.mostrarComponente('uno'); 
  }

  mostrarComponente(nombre: string) {
    this.contenedor.clear();

    switch (nombre) {
      case 'uno':
        this.contenedor.createComponent(InventoryComponent);
        break;
      case 'dos':
        this.contenedor.createComponent(ItemsComponent);
        break;
      case 'tres':
        this.contenedor.createComponent(DiaryComponent);
        break;
    }
  }

  activo: string = '';

  setActivo(nombre: string) {
    this.activo = nombre;
  }

  async productoCritico(){
    //Alerta para mostrar estado de producto critico
    
  }
  
  
}

