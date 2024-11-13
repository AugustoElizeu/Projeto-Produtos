import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../ConfirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { ErroDialogComponent } from '../../../erro-dialog/erro-dialog.component';
import { TableComponent } from '../../Componentes/produto-lista-table/table.component';
import { Produtos } from '../../Model/Produtos';
import { ProdutoServiceService } from '../../service/ProdutoService/produto-service.service';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatCardModule,TableComponent,MatToolbarModule,MatProgressSpinnerModule,MatPaginatorModule],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.scss'
})
export class ProdutoListaComponent {
  prods$: Observable<Produtos[]>;

  private _snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private produtosService : ProdutoServiceService ,
    public dialog: MatDialog,
    private router :Router,
    private acroute: ActivatedRoute,
  ) {
    //this.pokemon = [];
    //this.pokemonsService = new PokemonsService;
    this.prods$ = this.produtosService.list().pipe(catchError(err => {
      this.onError('Não foi possível encontrar a lista de produtos desejada');
      return of([])
    }));
  }

  refresh() {
      this.prods$ = this.produtosService.list()
      .pipe(
        catchError(error =>{
          this.onError("Erro ao carregar produtos.");
          return of([])
        })
      )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onError(errorMsg:string) {
    this.dialog.open(ErroDialogComponent, {
      data: errorMsg,
      panelClass: 'custom-dialog'
    });
  }

  onAdd(){
    this.router.navigate(['add'], {relativeTo:this.acroute});
  }
  onEdit(prods: Produtos){
    this.router.navigate(['edit', prods._id], {relativeTo:this.acroute});
  }
  onDelete(prods: Produtos){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.produtosService.delete(prods._id).subscribe(
          () => {
            this.refresh();
            this._snackBar.open('Produto removido com sucesso', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover produto.')
        );
      }
    });
  }

}
