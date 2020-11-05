import { Song } from '../interfaces/song';
import { CacheService } from '../services/cache.service';

export const friendlyDuration = (s: number) => { return (s-(s%=60))/60+(9<s?'\'':'\'0')+s};

export const formatArtists = (song: Song, cacheService: CacheService) => {
    let str = '';
    if (song.artists) {
        str = song.artists.map(id => cacheService.getArtists()
        .find(x => x.id === id).name)
        .sort((a, b) => b < a ? 1: -1)
        .join(', ');
    }

    return str;
}