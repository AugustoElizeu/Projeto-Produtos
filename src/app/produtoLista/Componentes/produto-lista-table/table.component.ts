import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { Produtos } from '../../Model/Produtos';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatIconModule,MatTableModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() prods: Produtos[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ["codigo","nome","categoria","estoque","preco","action"];

  constructor(){

  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(produtos: Produtos){
    this.edit.emit(produtos);
  }

  onDelete(produtos:Produtos){
    this.delete.emit(produtos);
  }
}
