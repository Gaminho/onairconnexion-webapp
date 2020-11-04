export class Song {
    id: string;
    title: string;
    durationInSec: number;
    artists: string[] = [];
    projectId: string;
    comment: string;
    songPath: string;
    prodPath: string;
}