import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './produtoLista/Containers/produto-lista/produto-lista.component';
import { produtoResolver } from './produtoLista/Resolver/produto.resolver';
import { ProdutoFormComponent } from './produtoLista/Containers/produtoForm/produto-form.component';

export const routes: Routes = [
  {path: '', redirectTo: 'produtos',pathMatch:'full'},
  {path: 'produtosForm', component: ProdutoListaComponent},
  {path: 'produtosForm/add', component: ProdutoFormComponent},
  {path: 'produtosForm/edit/:id', component: ProdutoFormComponent,resolve: {produtos: produtoResolver}},
];
