import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { JsonDataService } from '../services/json-data.service';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone:false
})
export class QRPage{
//
a = ""
jsonData: any[] = [];
 constructor(private jsonDataService: JsonDataService) {}

  async ngOnInit() {
  await this.jsonDataService.initDataFile(); // Asegura que el archivo exista

  this.jsonDataService.getData().subscribe(data => {
    this.jsonData = data.map(item => ({
      ...item,
      rollosT: parseInt(item.rollosT?.toString().trim()) || 0,
      cajaT: parseInt(item.cajaT?.toString().trim()) || 0,//pasa los datos del json a int
      stockCritico: parseInt(item.stockCritico?.toString().trim()) || 0
    }));

    ;
  });
    
  }


async scanCode() {
  try {
    const result = await BarcodeScanner.scan();

    if (result.barcodes && result.barcodes.length > 0) {
      const codigoEscaneado = result.barcodes[0].rawValue;
      console.log('Código escaneado:', codigoEscaneado);

      // Buscar el producto por SKU
      this.jsonDataService.getData().subscribe(async productos => {
        const productoEncontrado = productos.find(p => p.sku === codigoEscaneado);

        if ( productoEncontrado) {
          const cantidad = parseInt(productoEncontrado.rollosT || '0');
          productoEncontrado.rollosT = cantidad + 1;

          productoEncontrado.cajaT = Math.floor(productoEncontrado.rollosT / productoEncontrado.rollos);

          await this.jsonDataService.saveData(productos);
          //await this.jsonDataService.saveData(this.jsonData);
          await this.jsonDataService.logMovimiento('ingreso', productoEncontrado, productoEncontrado.cantidad, productoEncontrado.cantCajaT);
          alert(`SE INGRESA ${productoEncontrado.rollosT} ROLLO DE:${productoEncontrado.producto}  `);
        } else {
          alert('Producto no encontrado en inventario.');
        }

      });
    } else {
      alert('No se detectó ningún código.');
    }

  } catch (error) {
    console.error('Error al escanear:', error);
    alert('Hubo un error al escanear el código.');
  }
}
}

