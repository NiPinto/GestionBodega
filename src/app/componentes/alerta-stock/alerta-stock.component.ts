import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alerta-stock',
  templateUrl: './alerta-stock.component.html',
  styleUrls: ['./alerta-stock.component.scss'],
  standalone:false
})
export class AlertaStockComponent {
  @Input() productos: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}