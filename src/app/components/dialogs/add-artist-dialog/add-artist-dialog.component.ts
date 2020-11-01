import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-artist-dialog',
  templateUrl: './add-artist-dialog.component.html',
  styleUrls: ['./add-artist-dialog.component.scss']
})
export class AddArtistDialogComponent implements OnInit {

  public artistForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddArtistDialogComponent>) { 

    }

  ngOnInit() {
    this.initForm();
  }

  /* Init artist form. */
  private initForm(): void {
    this.artistForm = this.formBuilder.group({ 
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', []),
      phone: new FormControl('', []),
      mail: new FormControl('', []),
      imgUrl: new FormControl('', []),
      facebook: new FormControl('', []),
      instagram: new FormControl('', [])
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public saveArtist(): void {
    this.dialogRef.close(this.artistForm.value);
  }

}
