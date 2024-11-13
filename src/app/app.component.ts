import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule,MatIconModule, MatButtonModule,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-end_Projeto';
  @Output() listOn = new EventEmitter(false);

  constructor(private router: Router){ }

  onList(): void{
    this.router.navigate(['/produtosForm']);
  }
  onAdd(): void{
    this.router.navigate(['produtosForm/add']);
  }
}
