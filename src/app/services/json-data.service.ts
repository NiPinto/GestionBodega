// json-data.service.ts
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';

const FILE_NAME = 'Productos.json';
const RESUMEN_FILE = 'Resumen.json';
@Injectable({ providedIn: 'root' })
export class JsonDataService {
  constructor(private http: HttpClient) {}

  // Inicializar archivo desde assets si no existe
  async initDataFile() {
    try {
      await Filesystem.readFile({
        path: FILE_NAME,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    } catch {
      const assetData = await firstValueFrom(
        this.http.get<any[]>('assets/Productos.json')
      );
      await this.saveData(assetData);
    }
  }
  async resetDataFromAssets(): Promise<void> {
  await Filesystem.deleteFile({
    path: FILE_NAME,
    directory: Directory.Data,
  });

  await this.initDataFile(); // volverá a copiar desde assets
}

  // Leer inventario como Observable
getData(): Observable<any[]> {
  return from(
    Filesystem.readFile({
      path: FILE_NAME,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    }).then(result => {
      if (typeof result.data === 'string') {
        return JSON.parse(result.data);
      } else if (result.data instanceof Blob) {
        return result.data.text().then(text => JSON.parse(text));
      } else {
        throw new Error('Formato de datos no válido');
      }
    })
  );
}


  // Guardar inventario actualizado
  async saveData(data: any[]): Promise<void> {
    await Filesystem.writeFile({
      path: FILE_NAME,
      data: JSON.stringify(data),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  }


  //resumen config
  async logMovimiento(accion: 'ingreso' | 'retiro', item: any, cantidad: number, cantCajaT : number) {
  let Resumen: any[] = [];

  try {
    const resultResumen = await Filesystem.readFile({
      path: RESUMEN_FILE,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    if (typeof resultResumen.data === 'string') {
      Resumen = JSON.parse(resultResumen.data);
    } else if (resultResumen.data instanceof Blob) {
      const text = await resultResumen.data.text();
      Resumen = JSON.parse(text);
    }
  } catch {
    Resumen = []; // si el archivo no existe o está vacío
  }

  Resumen.push({
    fecha: new Date().toISOString(),
    accion,
    grupo:item.grupo,
    sku: item.sku,
    producto: item.producto,
    rollosT:cantidad,
    //cajaT:item.cajaT,
    cantCajaT,
    cantidad
  });

  await Filesystem.writeFile({
    path: RESUMEN_FILE,
    data: JSON.stringify(Resumen),
    directory: Directory.Data,
    encoding: Encoding.UTF8
  });
}
}