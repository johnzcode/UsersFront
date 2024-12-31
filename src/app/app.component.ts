import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';

@Component({
  selector: 'app-root',
  imports: [UsuarioListComponent],
  template: '<app-usuario-list />',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-front';
}
