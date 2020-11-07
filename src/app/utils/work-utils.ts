import { BeatStatus, VoiceStatus, Work, WorkType } from '../interfaces/work';

export const translateWorkType = (type: WorkType) => {
    switch (type) {
        case WorkType.BEAT:
            return 'Prod';
        case WorkType.SONG:
            return 'Morceau';
        default:
            return '';
    }
};

export const translateBeatStatus = (status: BeatStatus) => {
    switch (status) {
        case BeatStatus.MIX:
            return 'Mix';
        case BeatStatus.MAKING:
            return 'Composition';
        case BeatStatus.DONE:
            return 'Terminé';
        case BeatStatus.FINISH:
            return 'Finitions';
        default:
            return '';
    }
};

export const translateSongStatus = (status: VoiceStatus) => {
    switch (status) {
        case VoiceStatus.MIX:
            return 'Mix';
        case VoiceStatus.RECORDING:
            return 'Enregistrement';
        case VoiceStatus.WRITING:
            return 'Ecriture';
        case VoiceStatus.DONE:
            return 'Terminé';
        case VoiceStatus.FINISH:
            return 'Finitions';
        default:
            return '';
    }
};

export const findOneByVoiceStatus = (work: Work, voiceStatus: VoiceStatus): Work => {
    if (work.voiceStatus) {
        return Object.keys(work.voiceStatus).map(x => work.voiceStatus[x]).find(status => status === voiceStatus);
    } else {
        return undefined;
    }
};

export const isWorkFinish = (work: Work): boolean => {
    if (work.voiceStatus && work.beatStatus) {
        const artistIds = Object.keys(work.voiceStatus);
        return work.beatStatus === BeatStatus.DONE
            && artistIds.length > 0 && artistIds.map(id => work.voiceStatus[id])
                .filter(status => status === VoiceStatus.DONE).length === artistIds.length;
    } else {
        return false;
    }
}
