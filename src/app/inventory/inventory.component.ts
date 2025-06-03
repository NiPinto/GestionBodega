import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonDataService } from '../services/json-data.service';
import { EditrolloComponent } from '../componentes/editrollo/editrollo.component';
import { BorrartrolloComponent } from '../componentes/borrartrollo/borrartrollo.component';
import { ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  standalone: false
})
export class InventoryComponent  implements OnInit {

  searchTerm: string = '';
  jsonData: any[] = [];
  uniqueGrupos: any[] = [];

   @ViewChild('pageContent', { static: false }) pageContent!: IonContent;


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
  

  async ngOnInit() {
  await this.jsonDataService.initDataFile(); // Asegura que el archivo exista

  this.jsonDataService.getData().subscribe(data => {
    this.jsonData = data.map(item => ({
      ...item,
      rollosT: parseInt(item.rollosT?.toString().trim()) || 0,
      cajaT: parseInt(item.cajaT?.toString().trim()) || 0,
      
    }));

    this.productosFiltrados = [...this.jsonData];
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
  /*  if (data && data.cantidad) {
      item.rollosT += data.cantidad;
    }
*/
    if (data && data.cantidad) {
    data.cantCaja = item.cajaT
    item.rollosT += data.cantidad;
    item.cajaT = Math.floor(item.rollosT / item.rollos);
    data.cantCajaT =  1 *(item.cajaT - data.cantCaja)
    await this.jsonDataService.saveData(this.jsonData); // Guardar los cambios
    await this.jsonDataService.logMovimiento('ingreso', item, data.cantidad, data.cantCajaT);
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
    /*    if (data && data.cantidad) {
      item.rollosT -= data.cantidad;
    } */
    if (data && data.cantidad) {
      data.cantCaja = item.cajaT
      item.rollosT -= data.cantidad;
      item.cajaT = Math.floor(item.rollosT / item.rollos);
       data.cantCajaT =  1 *(item.cajaT - data.cantCaja)
       await this.jsonDataService.logMovimiento('retiro', item, data.cantidad, data.cantCajaT);
    if (item.rollosT < 0) item.rollosT = 0; // evitar negativos
      await this.jsonDataService.saveData(this.jsonData); // Guardar cambios
      
}
  }
  // Scroll Inventario
  irArriba() {
    // 300 ms de animación; a 0 va instantáneo
    this.pageContent.scrollToTop(300);
  }
  
}
