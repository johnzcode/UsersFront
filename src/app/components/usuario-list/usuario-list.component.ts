import { Component, ElementRef } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

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
        telefono: '',
        sexo: ''
    }

    editando = false;
    usuarioId: number | null = null;
    labelForValues: string[] = [];

    constructor(
        private usuarioService: UsuarioService,
        private alertService: AlertService,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.cargarUsuarios();
    }

    ngAfterViewInit(){
        const labels = this.elementRef.nativeElement.querySelectorAll('label[for]');
        this.labelForValues = Array.from(labels).map((label) =>
            (label as HTMLElement).getAttribute('for') || ''
        );
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
            telefono: '',
            sexo: ''
        };
        this.editando = false;
        this.usuarioId = null;
    }

}
