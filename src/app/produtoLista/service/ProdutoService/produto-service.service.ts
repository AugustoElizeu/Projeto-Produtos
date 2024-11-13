import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Produtos } from '../../Model/Produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  private readonly endPoint = "/api/produtosList"

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Produtos[]>(this.endPoint).pipe(first());
  }

  loadById(id:string){
    return this.http.get<Produtos>(`${this.endPoint}/${id}`);
  }

  save(record: Partial<Produtos>){
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Produtos>) {
    return this.http.post<Produtos[]>(this.endPoint, record).pipe(first());
  }

  private update(record: Partial<Produtos>) {
    return this.http.put<Produtos[]>(`${this.endPoint}/${record._id}`, record).pipe(first());
  }
  delete(id: String) {
    return this.http.delete(`${this.endPoint}/${id}`).pipe(first());
  }


}
