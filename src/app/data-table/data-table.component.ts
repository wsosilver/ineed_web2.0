import { Component, OnInit, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { trigger, style, transition, state, animate } from '@angular/animations';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({opacity: 0})),
      transition('void => *', [
        style({ opacity: 0}),
        animate('900ms 300ms ease-out', style({opacity: 1}))
      ])
    ]),
  ]
})
export class DataTableComponent implements OnInit {

  //INPUTS
  @Input() HEADERLIST: Array<any>
  @Input() CONTENTLIST: Array<any>
  @Input() RESOURCE_FORM: FormGroup
  @Input() HIDE_NEW = false;
  @Input() ONLY_SEE = false;
  @Input() REMOVE_TITLE = ''

  // LOADINGS
  @Input() TABLE_LOADING;
  @Input() REMOVEMODAL_LOADING;
  @Input() ADDMODAL_LOADING;
  @Input() EDITMODAL_LOADING;

  @Input() NO_EDIT = false;
  @Input() NO_EXCLUDE = false

  @Output() searchValue = new EventEmitter<any>();

  //MODAL CALLS
  @Output() showModal = new EventEmitter<any>();
  @Output() removeElement = new EventEmitter<number>();
  @Output() editElement = new EventEmitter<any>();
  @Output() eyeFilter = new EventEmitter<any>();
  
  // @Output() emitFilterObject = new EventEmitter<any>();

  @ViewChild('confirm', null)
  private ConfirmModal: TemplateRef<any>;

  TEMPITEM
  SHOWKEYSFORM: FormGroup

  //VARIAVEIS
  page = 1;
  pageSize = 10;
  searchInput = '';
  closeResult: string;
  keyList: Array<any>

  // @Output() filterValues = new EventEmitter<any>();

  constructor(private modalService: NgbModal, private config: NgbModalConfig, private builder: FormBuilder) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.HEADERLIST.filter(c => {
      if (c.visivel == true) return c;
    })
  }

  emitSearch() {
    this.searchValue.emit(this.searchInput)
  }

  sendModalData(modal: string) {
    this.showModal.emit(modal);
  }

  open(content, item = null, edit = null) {
    this.TEMPITEM = item

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result == 'DELETE') {
        this.removeElement.emit(item)
      }

      if (result == 'SHOW') {

      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getElementColor(element) {
    switch(element) {
      case 'Pendente':
        return '#E65100'; 
      case 'Aguardando Avaliação':
        return '#0770b6';
      case 'Confirmação Pendente':
        return '#580786';
      case 'Cancelado':
          return '#b60707';
      case 'Aguardando Serviço':
        return '#b65607';
      default:
        return '#07b670'
    }
  }

  sendEditData(event, seestatus = null) {
    console.log('XXXXX', event)

    this.TEMPITEM = event;
    event['seeonly'] = seestatus;
    this.editElement.emit(event);
  }

  getResource(image) {
    return environment.imageUrl + `/` + image
  }

  getSubmitValues() {
    let keys = this.getSubmitKeys();
    let result = [];

    for (let i of keys) {
      result[i] = this.RESOURCE_FORM.get(i).value
    }

    return result;
  }

  consoleHeader(key) {
    for (let i of this.HEADERLIST) {
      if (key == i.key) {
        i.visivel = !i.visivel
      }
    }
  }

  getSubmitKeys() {
    return Object.keys(this.RESOURCE_FORM.value);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getItemById(id) {
    for (let u of this.CONTENTLIST) {
      if (u.id == id) {
        return u
      }
    }
  }
}
