import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Produtos } from '../Model/Produtos';
import { ProdutoServiceService } from '../service/ProdutoService/produto-service.service';

export const produtoResolver: ResolveFn<Observable<Produtos>> = (route, state, service:ProdutoServiceService = inject(ProdutoServiceService)) => {
  if (route.params?.['id']) {
    return service.loadById(route.params['id']).pipe(
      catchError(() => of({_id: "", codigo: "", nome: "", categoria: "",preco:"",estoque:""})) // Tratamento de erro
    );
  }
  return of({_id: "", codigo: "", nome: "", categoria: "",preco:"",estoque:""});
};

/*
  _id:string,
  codigo:string,
  nome:string,
  categoria:string,
  preco:string,
  estoque:string,

*/
