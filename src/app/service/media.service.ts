import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Actor } from "../model/actor";
import { CrewMember } from "../model/crewmember";
import { MediaInformation } from "../model/media-information";
import { SerieInformation } from "../model/serie-information";
import { Media } from "../model/media";
import { Movie } from "../model/movie";
import { Serie } from '../model/serie';
import { Genre } from "../model/genre";

import { ApiAuthenticationService } from './api-authentication.service';
import { Image } from "../model/image";

const apiKey = 'f16bfeb0210b43f1f12d8d4ccc114ee9';
const baseUrl = ' https://api.themoviedb.org/3';

const addToFavoritesUrl = (sessionId) => `${baseUrl}/account/{account_id}/favorite?api_key=${apiKey}&session_id=${sessionId}`;
const favoriteMoviesUrl = (sessionId) => `${baseUrl}/account/{account_id}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`;
const discoverMoviesUrl = `${baseUrl}/discover/movie?api_key=${apiKey}`;

const searchMediaUrl = (query, type) => `${baseUrl}/search/${type}?api_key=${apiKey}&query=${query}`;
const mediaInformationUrl = (mediaId, type) => `${baseUrl}/${type}/${mediaId}?api_key=${apiKey}`;
const mediaCreditsUrl = (mediaId, type) => `${baseUrl}/${type}/${mediaId}/credits?api_key=${apiKey}`;
const mediaExternalIdsUrl = (mediaId, type) => `${baseUrl}/${type}/${mediaId}/external_ids?api_key=${apiKey}`;
const mediaImagesUrl = (mediaId, type) => `${baseUrl}/${type}/${mediaId}/images?api_key=${apiKey}`;
const mediaRecommendationsUrl = (mediaId, type) => `${baseUrl}/${type}/${mediaId}/recommendations?api_key=${apiKey}`;

const genresUrl = (type) => `${baseUrl}/genre/${type}/list?api_key=${apiKey}`;

@Injectable()
export class MediaService
{
    private headers = new Headers({ 'content-type': 'application/json;charset=utf-8' });

    constructor(private http: Http, private apiAuthenticationService: ApiAuthenticationService)
    {

    }

    searchMedia<T extends Media>(title: string, type: string): Observable<T[]>
    {
        console.log(searchMediaUrl(title, type));
        return this.http.get(searchMediaUrl(title, type)).map(result => result.json().results as T[])
            .map(type == 'movie' ? this.mapResponseToMovies() : this.mapResponseToSeries()).catch(this.handleError);
    }

    getGenres(type: string): Observable<Genre[]>
    {
        console.log(genresUrl(type));
        return this.http.get(genresUrl(type)).map(result => result.json().genres as Genre[]).catch(this.handleError);
    }

    getMediaInformation<T extends Media, S extends MediaInformation>(media: T, type: string): Observable<S>
    {
        console.log(mediaInformationUrl(media.id, type));
        let si: SerieInformation;

        return this.http.get(mediaInformationUrl(media.id, type)).flatMap(response =>
        {
            let m = response.json();
            console.log(m);
            let mi: MediaInformation = new MediaInformation(m.id, 0, m.title, m.original_title, m.genres, [], [], [], [],
                m.poster_path, m.backdrop_path, [], [], m.overview, m.vote_average, m.vote_count, media.favorite);

            if (type == 'tv')
            {
                si = <SerieInformation> mi;
                si.title = m.name;
                si.originalTitle = m.original_name;
                si.inProduction = m.in_production;
                si.createdBy = m.created_by;
                si.networks = m.networks;
                si.numberOfEpisodes = m.number_of_episodes;
                si.numberOfSeasons = m.number_of_seasons;
                si.seasons = m.seasons;
                si.episodeRuntime = m.episode_run_time;
                si.firstAirDate = m.first_air_date;
                si.lastAirDate = m.last_air_date;
                si.status = m.status;
                si.type = m.type;
            }

            console.log(mediaCreditsUrl(media.id, type));
            return this.http.get(mediaCreditsUrl(media.id, type)).flatMap(response => {
                let m = response.json();
                console.log(m);
                m.cast.forEach((a) =>
                {
                    si.actors.push(new Actor(a.id, '', '', '', a.credit_id, a.name, null, 'unknown', 'unknown',
                        a.profile_path, [], [], [], '', a.cast_id, a.character, a.order, false));
                });
                m.crew.forEach((c) =>
                {
                    let crewMember = new CrewMember(c.id, '', '', '', c.credit_id, c.name, c.profile_path, [], [], [],
                        c.department, c.job);
                    if (c.department == 'Directing')
                    {
                        si.directors.push(crewMember);
                    }
                    else if (c.department == 'Production')
                    {
                        si.producers.push(crewMember);
                    }
                    else if (c.department == 'Writing')
                    {
                        si.writers.push(crewMember);
                    }
                });

                console.log(mediaExternalIdsUrl(media.id, type));
                return this.http.get(mediaExternalIdsUrl(media.id, type)).flatMap(response => {
                    si.imdbId = response.json().imdb_id;

                    return this.http.get(mediaImagesUrl(media.id, type)).map(response => {
                        this.mapImagesToImageArray(response.json().posters, si.posters);
                        this.mapImagesToImageArray(response.json().backdrops, si.backdrops);

                        console.log(si.posters);
                        console.log(si.backdrops);

                        return si;
                    });
                });
            })
            .catch(this.handleError);
        })
        .catch(this.handleError);
    }

    getRecommendations<T extends Media, S extends MediaInformation>(media: T, type: string): Observable<Media[]>
    {
        console.log(mediaRecommendationsUrl(media.id, type));
        return this.http.get(mediaRecommendationsUrl(media.id, type)).map(response => {
            let recommendations: Media[] = [];
            response.json().results.forEach(item => {
                    recommendations.push(new Serie(item.id, item.name, item.orginal_name, item.first_air_date,
                    item.poster_path, item.backdrop_path, item.overview, 0, item.genre_ids, item.vote_average,
                    item.vote_average, false));
            });
            return recommendations;
        }).catch(this.handleError);
    }

    private mapImagesToImageArray(images: any[], array: Image[]): void
    {
        images.forEach(image => {
            array.push(new Image(image.aspect_ratio, image.width, image.height, image.file_path));
        });
    }

    private mapResponseToMovies(): any
    {
        return (movies: Array<any>) =>
        {
            let response: Array<Movie> = [];
            if (movies)
            {
                movies.forEach((movie) =>
                {
                    response.push(new Movie(movie.id, movie.title, movie.original_title, movie.release_date,
                        movie.poster_path, movie.backdrop_path, movie.overview, movie.genre_ids, movie.vote_average,
                        movie.vote_average, false));
                });
            }
            return response;
        }
    }

    private mapResponseToSeries(): any
    {
        return (series: Array<any>) =>
        {
            let response: Array<Serie> = [];
            if (series)
            {
                series.forEach(serie =>
                {
                    response.push(new Serie(serie.id, serie.name, serie.orginal_name, serie.first_air_date,
                        serie.poster_path, serie.backdrop_path, serie.overview, 0, serie.genre_ids, serie.vote_average,
                        serie.vote_average, false));
                });
            }
            return response;
        }
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
