import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonDataService } from '../services/json-data.service';
import { EditrolloComponent } from '../componentes/editrollo/editrollo.component';
import { BorrartrolloComponent } from '../componentes/borrartrollo/borrartrollo.component';
import { ModalController } from '@ionic/angular';
import { AlertaStockComponent } from '../componentes/alerta-stock/alerta-stock.component';
import { IonContent } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';


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


  constructor(private jsonDataService: JsonDataService,private modalCtrl: ModalController,private alertCtrl: AlertController) { }
  
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
  await this.jsonDataService.initDataFile();

  this.jsonDataService.getData().subscribe(async data => {
    this.jsonData = data.map(item => ({
      ...item,
      rollosT: parseInt(item.rollosT?.toString().trim()) || 0,
      cajaT: parseInt(item.cajaT?.toString().trim()) || 0,
      stockCritico: parseInt(item.stockCritico?.toString().trim()) || 0,
    }));
    console.log("🔎 Datos transformados:");
this.jsonData.forEach((item: any) => {
  console.log(`Producto: ${item.producto}, CajaT: ${item.cajaT}, StockCrítico: ${item.stockCritico}`);
});


    this.productosFiltrados = [...this.jsonData];
    this.uniqueGrupos = [...new Set(this.jsonData.map(item => item.grupo))];

  try {
    const Stock_Critico = this.jsonData.filter(item => item.cajaT < item.stockCritico);
    console.log('Productos con stock crítico:', Stock_Critico);
    if (Stock_Critico.length > 0) {
      await this.alertaStock(Stock_Critico); 
    }
  } catch (err) {
    console.error('Error al intentar mostrar alerta de stock:', err);
  }

  });
}



async alertaStock(productos: any[]) {
   console.log('Mostrando modal con productos críticos:', productos);
  const modal = await this.modalCtrl.create({
    component: AlertaStockComponent,
    componentProps: {
      productos
    }
  });
  await modal.present();
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
  
async resetearDatos() {
  await this.jsonDataService.resetDataFromAssets();

  // Volver a cargar la data actualizada en pantalla
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


}
