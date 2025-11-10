import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@app/domain/models/user.model';
import { Permisos } from '../muesta-referido/muesta-referido.component';

@Component({
  selector: 'app-modify',
  imports: [],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss'
})
export class ModifyComponent {
  // estados de entrada
  @Input() user!: User;
  @Input() note!: string; 
  @Input() editar!: boolean;
  @Input() leer!: boolean;
  @Output() cancelar = new EventEmitter<boolean>();
  @Output() modifyPermits = new EventEmitter<[Permisos]>();

  // metodos
  onCancelar(): void {
    this.cancelar.emit(true);
  }

  onUpdate(): void {
    const data: [Permisos] = [{
      idUSer: this.user.id,
      editar: this.editar,
      leer: this.leer
    }];
    this.modifyPermits.emit(data);
  }

  onChangesEdit(event: Event):void {
    const edit = (event.target as HTMLInputElement).checked;
    this.editar = edit;
    this.leer = edit; 
  }
  
  onChangeRead(event: Event): void {
    const read = (event.target as HTMLInputElement).checked;
    this.leer = read;
  }
}
