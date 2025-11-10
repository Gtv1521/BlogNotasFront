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
import {
  ReferenceEntity,
  ReferenceWithNoteEntity,
} from '../../../../domain/models/reference.model';
import { RequestDeleteComponent } from '../../Flotantes/request-delete/request-delete.component';
import { ModifyComponent } from "../modify/modify.component";

export interface Permisos {
  idUSer: string;
  editar: boolean;
  leer: boolean;
}

@Component({
  selector: 'app-muesta-referido',
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    AlertComponent,
    RequestDeleteComponent,
    ModifyComponent
],
  templateUrl: './muesta-referido.component.html',
  styleUrl: './muesta-referido.component.scss',
})
export class MuestaReferidoComponent {
  @Input() modo!: string;
  @Input() user!: User;
  @Input() blocked!: boolean;
  @Input() list: Permisos[] = [];
  @Input() referido!: ReferenceEntity | ReferenceWithNoteEntity;
  @Input() state!: boolean;
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
  alertDelete: boolean = false; // abre el modal delete
  selected: boolean = false; // valida que este seleccionado
  data!: Permisos; // data a enviar
  modifyPermits: boolean = false;

  ngOnInit() {
    const index = this.list.find((e) => e.idUSer === this.user.id);

    if (index) {
      this.editar = index.editar;
      this.leer = index.leer;
      this.selected = true;
    }
    if(this.referido) {
      this.leer = this.referido.leer;
      this.editar = this.referido.editar;
    }
  } 

  observeData(): void {
    this.data = {
      idUSer: `${this.user.id}`,
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

  onModify(): void {
    this.modifyPermits = !this.modifyPermits;
  }

  // abre el modal para eliminar el referido
  deleteReferido(): void {
    this.openCloseDelete();
  }

  // abre / cierra el modal de eliminar referido
  openCloseDelete() {
    this.alertDelete = !this.alertDelete;
  }

  responseDelete($event: boolean) {
    $event ? this.goDelete() : this.openCloseDelete();
  }
  // elimina el referido de la base de datos
  goDelete(): void {
    this.openCloseDelete();
    console.log('eliminar referido', this.referido.id);
  }

  updatePermits($event: [Permisos]) {
    console.log('nuevos permisos', $event);
  }
}
