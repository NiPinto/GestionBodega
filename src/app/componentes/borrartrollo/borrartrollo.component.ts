import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-borrartrollo',
  templateUrl: './borrartrollo.component.html',
  styleUrls: ['./borrartrollo.component.scss'],
  standalone: false
})
export class BorrartrolloComponent {
  @Input() producto: any;
  cantidad: number = 0;
  constructor(private modalCtrl: ModalController) { }


  guardar() {
    this.modalCtrl.dismiss({ cantidad: this.cantidad });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
