import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faFilePen,
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from '../../Flotantes/alert/alert.component';
import { User } from '../../../../domain/models/user.model';
import { ReferenceEntity } from '../../../../domain/models/reference.model';

export interface Permisos {
  idUSer: string;
  editar: boolean;
  leer: boolean;
}

@Component({
  selector: 'app-muesta-referido',
  imports: [FaIconComponent, FontAwesomeModule, AlertComponent],
  templateUrl: './muesta-referido.component.html',
  styleUrl: './muesta-referido.component.scss',
})
export class MuestaReferidoComponent {
  @Input() modo!: string;
  @Input() user!: User;
  @Input() referido!: ReferenceEntity;
  @Output() dataSelect = new EventEmitter<[Permisos, boolean]>();
  // iconos
  faSquareCheck = faSquareCheck; // check
  faSquareXmark = faSquareXmark; // cancel
  faFilePen = faFilePen; // editar

  // estados
  idUser: string | null = 'pruba';
  editar: boolean = false; // estado editar
  leer: boolean = false; // estado leer
  addSelect: boolean = false; // estado select
  listChanges: (string | boolean)[] = [];
  alert: boolean = false; // abre el modal alert
  selected: boolean = false; // valida que este seleccionado
  data!: Permisos; 

  observeData(): void {
     this.data = {
      idUSer: `${this.idUser}`,
      leer: this.leer,
      editar: this.editar,
    };
  }


  addList(): void {
    if (!this.editar && !this.leer) {
      this.addSelect = false;
      this.openCloseModal();
    } else {
      this.addSelect = true;
      this.onSelected();
      this.observeData();
      this.dataSelect.emit([this.data, this.selected]);
    }
  }

  onRemove(): void {
    this.selected = false;
    this.editar = false;
    this.leer = false;
    this.observeData;
    this.dataSelect.emit([this.data, this.selected]);
  }

  onSelected(): void {
    this.selected = !this.selected;
  }
  // abre / cierra modal alert
  openCloseModal() {
    this.alert = !this.alert;
  }

  //  on / off  editar
  onchangeEdit(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.editar = checked;
    this.leer = checked;
  }

  //  on / off  leer
  onChangeLeer(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.leer = checked;
  }
}
