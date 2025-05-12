import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone:false
})
export class QRPage{

async enableScanner() {
  const status = await BarcodeScanner.checkPermission({ force: true });

  if (status.granted) {
    // Mostrar la cámara
    await BarcodeScanner.hideBackground(); // Oculta fondo para que se vea la cámara
    document.body.classList.add('scanner-active'); // Por CSS podés poner fondo negro, etc.
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      console.log('Scanned:', result.content);
    }
  } else {
    alert('Permiso de cámara denegado');
  }
}
}
