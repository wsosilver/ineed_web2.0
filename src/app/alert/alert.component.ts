import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() ErrorMenssages
  @Input() SuccessMensage

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.ErrorMenssages = null;
    this.SuccessMensage = null;
  }
}
