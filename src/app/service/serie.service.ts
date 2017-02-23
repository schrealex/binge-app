import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Movie } from '../model/movie';
import { MovieInformation } from "../model/movie-information";

import { ApiAuthenticationService } from './api-authentication.service';
import { Actor } from "../model/actor";
import { CrewMember } from "../model/crewmember";
import { Serie } from "../model/serie";

const apiKey = 'f16bfeb0210b43f1f12d8d4ccc114ee9';
const baseUrl = ' https://api.themoviedb.org/3';

const addToFavoritesUrl = (sessionId) => `${baseUrl}/account/{account_id}/favorite?api_key=${apiKey}&session_id=${sessionId}`;
const favoriteMoviesUrl = (sessionId) => `${baseUrl}/account/{account_id}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`;
const discoverMoviesUrl = `${baseUrl}/discover/movie?api_key=${apiKey}`;

const searchTvUrl = (query) => `${baseUrl}/search/tv?api_key=${apiKey}&query=${query}`;
const tvInformationUrl = (tvId) => `${baseUrl}/tv/${tvId}?api_key=${apiKey}`;
const tvCreditsUrl = (tvId) => `${baseUrl}/tv/${tvId}/credits?api_key=${apiKey}`;

@Injectable()
export class SerieService
{
    private headers = new Headers({'content-type': 'application/json;charset=utf-8'});

    constructor(private http: Http, private apiAuthenticationService: ApiAuthenticationService)
    {

    }

    searchSeries(title: string): Observable<Serie[]>
    {
        console.log(searchTvUrl(title));
        return this.http.get(searchTvUrl(title)).map(result => <Serie[]> result.json().results)
            .map(this.mapResponseToSeries()).catch(this.handleError);
    }

    private mapResponseToSeries(): any {
        return (series: Array<any>) =>
        {
            let response: Array<Serie> = [];
            if (series)
            {
                series.forEach((serie) =>
                {
                    response.push(new Serie(serie.id, serie.name, serie.original_name, serie.first_air_date,
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
