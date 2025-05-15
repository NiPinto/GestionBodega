import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}

