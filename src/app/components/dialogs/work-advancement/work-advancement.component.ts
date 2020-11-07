import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from 'src/app/interfaces/artist';
import { VoiceStatus, Work } from 'src/app/interfaces/work';
import { CacheService } from 'src/app/services/cache.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-work-advancement',
  templateUrl: './work-advancement.component.html',
  styleUrls: ['./work-advancement.component.scss']
})
export class WorkAdvancementComponent implements OnInit {

  @Input() public readonly work: Work;

  public faTimes = faTimes;
  public currentStatus: any;
  
  constructor(public activeModal: NgbActiveModal, 
    private cacheService: CacheService) {}

  ngOnInit() {
    this.currentStatus = {...this.work.voiceStatus};
  }

  public getName(id: string): string {
    const artist = this.cacheService.findArtistById(id);
    return artist ? artist.name : 'Inconnu';
  }

  public updateStatus(id: string, value: VoiceStatus): void {
    this.currentStatus[id] = value;
  }

  public addArtist(id: string): void {
    this.currentStatus[id] = VoiceStatus.WRITING;
  }

  public delete(id: string): void {
    this.currentStatus[id] = undefined;
  }

  public getAvailableArtists(): Artist[] {
    return this.cacheService.getArtists().filter(x => {
      return this.currentStatus[x.id] === undefined 
        || Object.keys(this.currentStatus).indexOf(x.id) === -1
    });
  }

  public close(sendData: boolean) {
    if (sendData) {
      const status = this.cleanStatus(this.currentStatus);
      return this.activeModal.close({id: this.work.id, status: status});
    } else {
      return this.activeModal.dismiss();
    }
  }

  private cleanStatus(currentStatus: any): any {
    const status = {};
    Object.keys(currentStatus)
      .filter(id => currentStatus[id] !== undefined)
      .forEach(id => status[id] = currentStatus[id]);
    return status;
  }

  get keys(): string[] {
    return Object.keys(this.currentStatus).filter(x => this.currentStatus[x] !== undefined);
  }

}
