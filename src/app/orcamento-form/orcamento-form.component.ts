import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento-form.component.html',
  styleUrls: ['./orcamento-form.component.scss']
})
export class OrcamentoFormComponent extends FormPrefabs {
  
  @Input() isEditMode = false;
  @Input() EditFormData: FormGroup
  @Input() CATEGORIALIST 

  @Output() RecourceFormData = new EventEmitter<FormGroup>();
  @Output() EditElement = new EventEmitter<FormGroup>();

  resourceForm: FormGroup;
  tempItem

  DATALIST

  constructor(private formBuilder: FormBuilder, private routeStorage: ActivatedRoute) { 
    super()

    this.resourceForm = this.formBuilder.group({
      id: [0, Validators.required],
      nome: [ null , Validators.required ],
      nomeCliente: [ null , Validators.required ],
      emailCliente: [ null , Validators.required ],
      inativo: [ null , Validators.required ],
      observacao: [ null , Validators.required ],
      colaborador: [ null , Validators.required ],
      categoriaId: [ null, Validators.required ],
      codcielo: [ null, Validators.required ],
    })
  }

  initFormData() {
    console.log(this.resourceForm.value)
    
    const FormKeys = Object.keys(this.resourceForm.value)

    for (let key of FormKeys) {
        this.resourceForm.get(key).setValue(this.tempItem[key]);
    }

    console.log(this.resourceForm.value)


    let nomeColaborador: string = ''
    this.tempItem.usuarioCollaborador.forEach(element => {
      nomeColaborador += `${element.nome}, `
    });

    this.resourceForm.get('nome').setValue(nomeColaborador)

    if (this.tempItem.requisicao)
      this.resourceForm.get('codcielo').setValue(this.tempItem.requisicao.codigodePagamentoCielo)
    
    this.resourceForm.get('nomeCliente').disable()
    this.resourceForm.get('codcielo').disable()
    this.resourceForm.get('emailCliente').disable()
    this.resourceForm.get('observacao').disable()
    this.resourceForm.get('nome').disable()
  }

  ngOnInit() {
    if(this.isEditMode) {
      console.log(this.EditFormData)
      this.tempItem = this.EditFormData;
      this.initFormData()
    }
  }

  enviar() {
    this.RecourceFormData.emit(this.resourceForm)
  }

  atualizar() {
    this.EditElement.emit(this.resourceForm)
  }
}
