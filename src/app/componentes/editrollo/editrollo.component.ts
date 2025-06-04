import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editrollo',
  templateUrl: './editrollo.component.html',
  styleUrls: ['./editrollo.component.scss'],
  standalone:false
})
export class EditrolloComponent{
  @Input() producto: any;
  cantidad: number = 0;
  constructor(private modalCtrl: ModalController) {}

  guardar() {
    this.modalCtrl.dismiss({ cantidad: this.cantidad });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  increment() {
    this.cantidad++;
  }

  decrement() {
    if (this.cantidad > 0) {
      this.cantidad--;
    }
  }
}
