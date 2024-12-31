import { Component } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
    usuarios: Usuario[] = [];
    usuarioForm: Usuario = {
        nombre: '',
        email: '',
        telefono: ''
    }

    editando = false;
    usuarioId: number | null = null;

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit(): void {
        this.cargarUsuarios();
    }

    cargarUsuarios(): void {
        this.usuarioService.getUsuarios()
            .subscribe(data => this.usuarios = data);
    }

    guardarUsuario(): void {
        if (this.editando && this.usuarioId) {
            this.usuarioService.updateUsuario(this.usuarioId, this.usuarioForm)
                .subscribe(() => {
                    this.resetForm();
                    this.cargarUsuarios();
                });
        } else {
            this.usuarioService.createUsuario(this.usuarioForm)
                .subscribe(() => {
                    this.resetForm();
                    this.cargarUsuarios();
                });
        }
    }

    editarUsuario(usuario: Usuario): void {
        this.usuarioForm = {...usuario};
        this.editando = true;
        this.usuarioId = usuario.id!;
    }

    eliminarUsuario(id: number): void {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            this.usuarioService.deleteUsuario(id)
                .subscribe(() => {
                    this.cargarUsuarios();
                });
        }
    }

    resetForm(): void {
        this.usuarioForm = {
            nombre: '',
            email: '',
            telefono: ''
        };
        this.editando = false;
        this.usuarioId = null;
    }

}
