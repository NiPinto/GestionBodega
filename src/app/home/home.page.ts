import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  mostrar: boolean = false; 

  toggleContenido() {
    this.mostrar = !this.mostrar; 
  }

  constructor() {}

}

