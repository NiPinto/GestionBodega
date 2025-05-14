import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone:false
})
export class QRPage{

async scanCode() {
    try {
      const result = await BarcodeScanner.scan();

    if (result.barcodes && result.barcodes.length > 0) {
      const first = result.barcodes[0];
      console.log('Código escaneado:', first.rawValue);
      alert(`Código: ${first.rawValue}`);
    } else {
      alert('No se detectó ningún código.');
    }
    } catch (error) {
      console.error('Error al escanear:', error);
      alert('Hubo un error al escanear el código.');
    }
  }

}
