import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataBasePrefabs } from '../share/data-base';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
  providers: []
})
export class ServicosComponent extends FormPrefabs {

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
      inativo: [ null , Validators.required ],
      descricao: [ null , Validators.required ],
      categoriaId: [ null, Validators.required ],
    })
  }

  initFormData() {
    console.log(this.resourceForm.value)
    
    const FormKeys = Object.keys(this.resourceForm.value)

    for (let key of FormKeys) {
        this.resourceForm.get(key).setValue(this.tempItem[key]);
    }

    console.log(this.resourceForm.value)
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
