import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from 'src/app/interfaces/artist';
import { BeatStatus, VoiceStatus, Work, WorkType } from 'src/app/interfaces/work';
import { CacheService } from 'src/app/services/cache.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.scss']
})
export class NewWorkComponent implements OnInit {

  private work: Work = new Work();
  public workForm: FormGroup;
  public readonly faTimes = faTimes;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cacheService: CacheService) { }

  ngOnInit() {
    this.work.voiceStatus = {};
    this.initForm();
  }

  /* Init artist form. */
  private initForm(): void {
    this.workForm = this.formBuilder.group({ 
      title: new FormControl('', [Validators.required]),
      beatStatus: new FormControl(BeatStatus.MAKING, [Validators.required]),
      createdOn: new FormControl('', []),
      type: new FormControl(WorkType.SONG, [Validators.required]),
      voiceStatus: new FormControl({}, [])
    });
  }

  public getAvailableArtists(): Artist[] {
    return this.cacheService.getArtists().filter(x => {
      return Object.keys(this.cleanStatus(this.workForm.controls.voiceStatus.value)).indexOf(x.id) === -1;
    });
  }

  public addArtist(artistId: string): void {
    this.updateVoiceStatus(artistId, VoiceStatus.WRITING);
  }

  public close(sendData: boolean): void{
    if (sendData) {
      return this.activeModal.close(this.workForm.value);
    } else {
      return this.activeModal.dismiss();
    }
  }

  public removeArtist(artistId: string) {
    this.updateVoiceStatus(artistId, undefined);
  }

  public updateType(type: WorkType): void {
    this.workForm.controls.type.setValue(type);
  }

  public updateBeatStatus(beatStatus: BeatStatus): void {
    this.workForm.controls.beatStatus.setValue(beatStatus);
  }

  public updateVoiceStatus(artistId: string, voiceStatus: VoiceStatus) {
    const status = this.workForm.controls.voiceStatus.value;
    status[artistId] = voiceStatus;
    this.workForm.controls.voiceStatus.setValue(this.cleanStatus(status));
  }

  get artists(): Artist[] {
    return Object.keys(this.cleanStatus(this.workForm.controls.voiceStatus.value))
      .map(id => this.cacheService.findArtistById(id));
  }

  get isSong(): boolean {
    return this.workForm.controls.type.value === WorkType.SONG;
  }

  get isWorkValid(): boolean {
    return this.workForm.valid && this.artistsValid();
  }

  private artistsValid(): boolean {
    if (this.workForm.controls.type.value === WorkType.BEAT) {
      return true;
    } else if (this.workForm.controls.type.value === WorkType.SONG) {
      return Object.keys(this.cleanStatus(this.workForm.controls.voiceStatus.value)).length > 0;
    } else {
      return false;
    }
  };

  private cleanStatus(currentStatus: any): any {
    const status = {};
    Object.keys(currentStatus)
      .filter(id => currentStatus[id] !== undefined)
      .forEach(id => status[id] = currentStatus[id]);
    return status;
  }

}
