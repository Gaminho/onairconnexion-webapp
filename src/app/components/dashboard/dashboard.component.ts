import { Component, OnInit } from '@angular/core';
import { faArchive, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BeatStatus, VoiceStatus, Work, WorkType } from 'src/app/interfaces/work';
import { CacheService } from 'src/app/services/cache.service';
import { WorkService } from 'src/app/services/fb-services/work.service';
import { formatArtistFromIds } from 'src/app/utils/song-utils';
import { findOneByVoiceStatus, isWorkFinish, translateBeatStatus, translateSongStatus } from 'src/app/utils/work-utils';
import { NewWorkComponent } from '../dialogs/new-work/new-work.component';
import { WorkAdvancementComponent } from '../dialogs/work-advancement/work-advancement.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public faEdit = faEdit;
  public faArchive = faArchive;

  public works: Work[] = [];

  constructor(private readonly workService: WorkService,
    private cacheService: CacheService,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.refreshWork();
  }

  get songCount(): number {
    return this.works ? this.works.filter(x => x.type === WorkType.SONG).length : 0;
  }

  get beatCount(): number {
    return this.works ? this.works.filter(x => x.type === WorkType.BEAT).length : 0;
  }

  public getArtists(work: Work): string {
    if (work.voiceStatus) {
      let ids = []; 
      if (work.voiceStatus instanceof Map) {
        ids = Array.from(work.voiceStatus.keys());
      } else {
        ids = Object.keys(work.voiceStatus);
      }
      
      return formatArtistFromIds(ids, this.cacheService);
      
    } else {
      return '';
    }
  }

  public updateStatus(work: Work, value: BeatStatus) {
    work.beatStatus = value;
  }

  public getAdvancement(work: Work): string {
    if (work.type === WorkType.BEAT) {
      return translateBeatStatus(work.beatStatus);
    } else if (work.type === WorkType.SONG) {
      if (work.voiceStatus && Object.keys(work.voiceStatus).length > 0) {
        if (findOneByVoiceStatus(work, VoiceStatus.WRITING)) {
          return translateSongStatus(VoiceStatus.WRITING);
        } else if (findOneByVoiceStatus(work, VoiceStatus.RECORDING)){
          return translateSongStatus(VoiceStatus.RECORDING);
        } else if (findOneByVoiceStatus(work, VoiceStatus.MIX)){
          return translateSongStatus(VoiceStatus.MIX);
        } else if (findOneByVoiceStatus(work, VoiceStatus.FINISH)){
          return translateSongStatus(VoiceStatus.FINISH);
        } else {
          return translateSongStatus(VoiceStatus.DONE);
        }
      }
    }
    
  return 'Inconnu';  
  }

  public isFinish(work: Work): boolean {
    return isWorkFinish(work);
  }

  public open(work: Work): void {
    const modalRef = this.modalService.open(WorkAdvancementComponent);
    modalRef.result.then(output => {
      const work = this.works.find(w => w.id === output.id);
      work.voiceStatus = output.status;
      this.updateWork(work);
    }).catch(() => {});
    modalRef.componentInstance.work = work;
   }

   public newWork() {
    const modalRef = this.modalService.open(NewWorkComponent);
    modalRef.result.then(output => this.createWork(output));
   }

   public updateWork(work: Work): void {
    this.workService.updateWork({...work}).subscribe({
      error: e => console.error(e)
    });
   }

   public createWork(work: Work): void {
     work.createdOn = new Date();
    this.workService.saveWotk({...work}).subscribe({
      next: d => this.refreshWork(),
      error: e => console.error(e)
    });
   }

   public refreshWork(): void {
    this.workService.getWorks().subscribe({
      next: d => this.works = d.sort((a, b) => a.createdOn < b.createdOn ? -1 : 1),
      error: e => console.error('works', e)
    });
   }

}

