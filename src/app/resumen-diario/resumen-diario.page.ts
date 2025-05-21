import { Component, OnInit } from '@angular/core';
import { Filesystem,Directory, Encoding } from '@capacitor/filesystem';


@Component({
  selector: 'app-resumen-diario',
  templateUrl: './resumen-diario.page.html',
  styleUrls: ['./resumen-diario.page.scss'],
  standalone:false
})
export class ResumenDiarioPage implements OnInit {

Resumen: any[] = [];
fechaSeleccionada: string = '';
Filtrofecha: any[] = []
fechas: string[] = [];


//Configuracion del filtro
 async ngOnInit() {
  try {
    const result = await Filesystem.readFile({
      path: 'Resumen.json',
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    const data = typeof result.data === 'string'
      ? JSON.parse(result.data)
      : JSON.parse(await result.data.text());

    this.Resumen = data.reverse();
    this.Filtrofecha = [...this.Resumen];

    // EXTRAER FECHAS
    this.fechas = [
      ...new Set(
        this.Resumen
          .filter(item => item.fecha)
          .map(item => item.fecha.slice(0, 10))
      )
    ];

    console.log('Fechas cargadas:', this.fechas);

  } catch (error) {
    console.error('Error al cargar resumen:', error);
  }
}
//Filtro resumen
    buscarFecha() {
      this.Filtrofecha = this.fechaSeleccionada
        ? this.Resumen.filter(item =>
            item.fecha.startsWith(this.fechaSeleccionada)
          )
        : [...this.Resumen];
    }

  }

