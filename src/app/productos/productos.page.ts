import { Component, OnInit } from '@angular/core';
import { JsonDataService } from '../services/json-data.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone:false
})
export class ProductosPage implements OnInit {

  jsonData: any = [];

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit() {
    this.jsonDataService.getData().subscribe(data => {
      this.jsonData = data;
    });
  }

}
