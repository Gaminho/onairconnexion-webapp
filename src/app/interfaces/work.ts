export class Work {
    id: string;
    title: string;
    beatTitle: string;
    type: WorkType;
    voiceStatus: any;
    beatStatus: BeatStatus;
    createdOn: Date;
}

export enum WorkType {
    SONG = 'SONG',
    BEAT = 'BEAT'
}

export enum BeatStatus {
    MIX = 'MIX',
    MAKING = 'MAKING',
    FINISH = 'FINISH',
    DONE = 'DONE'
}

export enum VoiceStatus {
    WRITING = 'WRITING',
    RECORDING = 'RECORDING',
    MIX = 'MIX',
    FINISH = 'FINISH',
    DONE = 'DONE'
}
