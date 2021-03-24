import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.scss'],
  providers: []
})
export class ColaboradorFormComponent extends FormPrefabs {

  @Input() isEditMode = false;
  @Input() EditFormData: FormGroup

  @Output() RecourceFormData = new EventEmitter<FormGroup>();
  @Output() EditElement = new EventEmitter<FormGroup>();

  PROFILE_ID

  constructor(private formBuilder: FormBuilder, private routeStorage: ActivatedRoute) { 
    super()

    this.routeStorage.params.subscribe(data => {
      this.PROFILE_ID = Number.parseInt(data.id)
    })

    this.resourceForm = this.formBuilder.group({
      id: [0, Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.email],
      senha: ['', Validators.required],
      tipoId: [1, Validators.required],
      cpfCnpj: ['', Validators.required],
      perfilId: [this.PROFILE_ID, Validators.required],
      inativo: ['', Validators.required]
    })
  }

  ngOnInit() {
    if(this.isEditMode) {
      console.log(this.EditFormData)
      this.tempItem = this.EditFormData;
      this.initFormData()
      this.resourceForm.get('email').disable()
      this.resourceForm.get('cpfCnpj').disable()
      this.resourceForm.get('tipoId').disable()
      this.resourceForm.get('perfilId').disable()
    }
    
    console.log(this.resourceForm.value)
  }

  enviar() {
    this.RecourceFormData.emit(this.resourceForm)
  }

  atualizar() {
    this.EditElement.emit(this.resourceForm)
  }
}
