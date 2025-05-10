import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonDataService } from '../services/json-data.service';

import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone:false
})
export class ProductosPage implements OnInit {

  searchTerm: string = '';
  jsonData: any[] = [];
  uniqueGrupos: any[] = [];

  constructor(private jsonDataService: JsonDataService) { }
  
  buscarPorTexto() {
    const term = this.searchTerm.toLowerCase();
  
    this.productosFiltrados = this.jsonData.filter(item =>
      item.producto.toLowerCase().includes(term) ||
      item.sku.toLowerCase().includes(term) ||
      item.grupo.toLowerCase().includes(term)
    );
  }


  selectedGrupo: string = '';
  productosFiltrados: any[] = [];
  
  buscarProductosPorGrupo() {
    this.productosFiltrados = this.selectedGrupo
    ? this.jsonData.filter((item: any) => item.grupo === this.selectedGrupo)
    : this.jsonData;
  }
  

  ngOnInit() {
    this.jsonDataService.getData().subscribe(data => {
      this.jsonData = data;

      this.productosFiltrados = this.jsonData;

      this.uniqueGrupos = [...new Set(this.jsonData.map(item => item.grupo))];
    
    });
    
  } 
}
