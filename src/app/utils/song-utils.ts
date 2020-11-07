import { Song } from '../interfaces/song';
import { CacheService } from '../services/cache.service';

export const friendlyDuration = (s: number) => { return (s-(s%=60))/60+(9<s?'\'':'\'0')+s};

export const formatArtists = (song: Song, cacheService: CacheService) => {
    return song.artists ? formatArtistFromIds(song.artists, cacheService) : '';
}

export const formatArtistFromIds = (artistIds: string[], cacheService: CacheService) => {
    let str = '';
    if (artistIds) {
        str = artistIds.map(id => cacheService.findArtistById(id))
            .filter(x => x !== undefined)
            .map(X => X.name)
            .sort((a, b) => b < a ? 1: -1)
            .join(', ');
    }

    return str;
}