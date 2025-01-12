import { Component, ElementRef } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { UtilityService } from '../../utils/utility.service';

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
        private elementRef: ElementRef,
        private Util: UtilityService
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
                    this.Util.showFloatingMessage("Usuario modificado correctamente");
                });
        } else {
            const camposFaltantes = this.labelForValues.filter((campo) => {
                
                const nombreCampo = campo.toLowerCase().trim();
                
                const propiedadFormulario = Object.keys(this.usuarioForm).find(
                    key => key.toLowerCase() === nombreCampo
                );

                if (propiedadFormulario) {
                  const valor = this.usuarioForm[propiedadFormulario as keyof Usuario];
                  return this.esCampoVacio(valor);
                }

                return true;
            });
            
            if (camposFaltantes.length > 0){
                const msg = 'Por favor, verifique las siguientes advertencias antes de guardar nuevamente la informacion contenida en el formulario de registro';
                const showMsg = `
                    ${msg}:<br>
                    <ul class="swal-text-left">
                        ${camposFaltantes
                            .map((campo) => `<li>${campo}</li>`)
                            .join('')}
                    </ul>`;
                this.alertService.showAlert(showMsg, 'Advertencia!', 'warning');
            }else{
                this.usuarioService.createUsuario(this.usuarioForm)
                    .subscribe(() => {
                        this.resetForm();
                        this.cargarUsuarios();
                        this.Util.showFloatingMessage("Usuario creado correctamente");
                    });
            }
        }
    }

    esCampoVacio(valor: any): boolean {
        if (valor === null || valor === undefined) return true;
        if (typeof valor === 'string') return valor.trim() === '';
        if (typeof valor === 'number') return false;
        if (Array.isArray(valor)) return valor.length === 0;
        return false;
    }

    editarUsuario(usuario: Usuario): void {
        this.usuarioForm = {...usuario};
        this.editando = true;
        this.usuarioId = usuario.id!;
    }

    eliminarUsuario(id: number): void {
        const msg = '¿Estás seguro de eliminar este usuario?';

        this.alertService.showAlert(msg, 'Confirmacion', 'info', 
            () => {
                this.usuarioService.deleteUsuario(id)
                    .subscribe(() => {
                        this.cargarUsuarios();
                        this.Util.showFloatingMessage("Usuario eliminado correctamente");
                    });
            }, true
        );
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
