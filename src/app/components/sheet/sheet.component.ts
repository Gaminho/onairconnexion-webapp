import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  public sheetForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  /* Init artist form. */
  private initForm(): void {
    this.sheetForm = this.formBuilder.group({ 
      content: new FormControl('', [Validators.required])
    });
  }

  public saveSheet(): void {
    let data = this.sheetForm.value;
    data.userId = 12;
    alert('Nouveau sheet !');
    console.log('sheet: ', data);
  }

}
