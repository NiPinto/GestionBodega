// json-data.service.ts
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';

const FILE_NAME = 'Productos.json';

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
}
