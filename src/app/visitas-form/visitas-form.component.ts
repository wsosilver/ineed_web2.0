import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitas-form',
  templateUrl: './visitas-form.component.html',
  styleUrls: ['./visitas-form.component.scss'],
  providers: []
})
export class VisitasFormComponent extends FormPrefabs {

  @Input() isEditMode = false;
  @Input() EditFormData: FormGroup
  @Input() CATEGORIALIST 

  @Input() VISUALIZATIONMODE = false;

  @Output() RecourceFormData = new EventEmitter<FormGroup>();
  @Output() EditElement = new EventEmitter<FormGroup>();

  resourceForm: FormGroup;
  tempItem

  DATALIST

  constructor(private formBuilder: FormBuilder, private routeStorage: ActivatedRoute) { 
    super()

    this.resourceForm = this.formBuilder.group({
      id: [ '' ],
      nome: [ '' ],
      cliente: [''],
      email: [ '' ],
      valor: [ '' ],
      avaliacao: [''],
      confirmada: [''],
      concluida: [''],
      observacao: ['']
    })
  }

  initFormData() {
    console.log(this.resourceForm.value)
    console.log(this.EditFormData)
    
    const FormKeys = Object.keys(this.resourceForm.value)
    

    for (let key of FormKeys) {
        this.resourceForm.get(key).setValue(this.tempItem[key]);
    }

    let nomeCliente: any = this.EditFormData;

    let nomeCFinal;
    if(nomeCliente.usuarioCollaborador.length > 1) {
      nomeCliente.usuarioCollaborador.forEach(item => {
        nomeCFinal += item.nome + ','
      });
      this.resourceForm.get('nome').setValue(nomeCFinal)
    } else {
      this.resourceForm.get('nome').setValue(nomeCliente.usuarioCollaborador[0].nome)
    }

    this.resourceForm.get('cliente').setValue(nomeCliente.solicitacao.usuario.nome)
    this.resourceForm.get('email').setValue(nomeCliente.usuarioCollaborador[0].email)
  }

  ngOnInit() {
    if(this.isEditMode) {
      console.log(this.EditFormData)
      this.tempItem = this.EditFormData;
      this.initFormData()
    }
    this.resourceForm.disable()

    console.log('Terno', this.tempItem)
  }

  enviar() {
    this.RecourceFormData.emit(this.resourceForm)
  }

  atualizar() {
    this.EditElement.emit(this.resourceForm)
  }
}