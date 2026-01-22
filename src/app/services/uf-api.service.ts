import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { EstadoApiResponse, MunicipioApiResponse } from '../uf-api.model';

@Injectable({
  providedIn: 'root'
})
export class UfApiService {

  private http = inject(HttpClient);
  baseUrl: string = 'https://brasilapi.com.br/api';

  getEstados(): Observable<EstadoApiResponse[]> {
    return this.http.get<EstadoApiResponse[]>(`${this.baseUrl}/ibge/uf/v1`);
  }
  getMunicipios(uf: string): Observable<MunicipioApiResponse[]> {
    return this.http.get<MunicipioApiResponse[]>(`${this.baseUrl}/ibge/municipios/v1/${uf}`);
  }
}
