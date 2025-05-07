import { Component, OnInit } from '@angular/core';
import { JsonDataService } from '../services/json-data.service';
import { EditrolloComponent } from '../componentes/editrollo/editrollo.component';
import { BorrartrolloComponent } from '../componentes/borrartrollo/borrartrollo.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  standalone:false
})
export class InventarioPage implements OnInit {

  searchTerm: string = '';
  jsonData: any[] = [];
  uniqueGrupos: any[] = [];

  constructor(private jsonDataService: JsonDataService,private modalCtrl: ModalController) { }
  
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

      this.uniqueGrupos = [...new Set(this.jsonData.map(item => item.grupo))];
    
    });
    
  }


  async abrirModalAgregar(item: any) {
    const modal = await this.modalCtrl.create({
      component: EditrolloComponent,
      componentProps: {
        producto: item
      }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data && data.cantidad) {
      item.rollosT += data.cantidad;
    }
  }

  async abrirModalEliminar(item: any) {
    const modal = await this.modalCtrl.create({
      component: BorrartrolloComponent,
      componentProps: {
        producto: item
      }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data && data.cantidad) {
      item.rollosT -= data.cantidad;
    }
  }
}
