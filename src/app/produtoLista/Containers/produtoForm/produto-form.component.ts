import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Produtos } from '../../Model/Produtos';
import { ProdutoServiceService } from '../../service/ProdutoService/produto-service.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatSelectModule, MatInputModule,MatButtonModule, MatCardModule,MatSnackBarModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit {

  form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  constructor(private formBuilder : FormBuilder,
    private service:  ProdutoServiceService,
    private location: Location,
    private route: ActivatedRoute,
  ){
      this.form = this.formBuilder.group({
          _id:[''],
          codigo: [null],
          nome: [null],
          preco: [null],
          estoque: [null],
          categoria: [null],
      });
  }


  ngOnInit(): void {
    const produtos: Produtos = this.route.snapshot.data['produtos'];
    this.form.setValue({
            _id: produtos._id,
            codigo: produtos.codigo,
            nome: produtos.nome,
            estoque: produtos.estoque,
            categoria: produtos.categoria,
            preco: produtos.preco,
    });
}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(data => {this.onSuccess()},error => {this.onFailure()});
  }
  onCancel(){
      this.location.back();
  }
  onSuccess(){
    this._snackBar.open("Parabéns, Processo realizado com sucesso!!!","Fechar",{duration:5000})
    this.onCancel();
  }
  onFailure(){
    this._snackBar.open("Erro ao salvar informações","Fechar",{duration:5000})
  }

}
