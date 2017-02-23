import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Person } from "../model/person";
import { Actor } from "../model/actor";
import { Image } from "../model/image";
import { Credits } from "../model/credits";
import { CastCredits } from "../model/cast-credits";
import { CrewCredits } from "../model/crew-credits";
import { Movie } from "../model/movie";
import { Serie } from "../model/serie";

import { ConfigurationService } from "./configuration.service";

// const apiKey = 'f16bfeb0210b43f1f12d8d4ccc114ee9';
const baseUrl = 'https://api.themoviedb.org/3';

const searchPersonUrl = (apiKey, query, adult) => `${baseUrl}/search/person?api_key=${apiKey}&query=${query}&include_adult=${adult}`;

const personDetailsUrl = (apiKey, personId) => `${baseUrl}/person/${personId}?api_key=${apiKey}`;
const personExternalIdsUrl = (apiKey, personId) => `${baseUrl}/person/${personId}/external_ids?api_key=${apiKey}`;
const personImagesUrl = (apiKey, personId) => `${baseUrl}/person/${personId}/images?api_key=${apiKey}`;
const personMovieCreditsUrl = (apiKey, personId) => `${baseUrl}/person/${personId}/movie_credits?api_key=${apiKey}`;
const personTvCreditsUrl = (apiKey, personId) => `${baseUrl}/person/${personId}/tv_credits?api_key=${apiKey}`;

@Injectable()
export class ActorService
{
    private apiKey = '';

    constructor(private http: Http, private configurationService: ConfigurationService)
    {
        this.configurationService.getConfiguration().subscribe(configurationData => {
            this.apiKey = configurationData.apiKey;
        });
    }

    getPersonDetails<T extends Person>(personId: number): Observable<T>
    {
      let actor: Actor = null;

        console.log('getPersonDetails');
        console.log(personDetailsUrl(this.apiKey, personId));
        return this.http.get(personDetailsUrl(this.apiKey, personId))
        .flatMap(response =>
        {
          let p = response.json();
          let gender = p.gender == '0' ? 'female' : 'male';
          actor = new Actor(p.id, p.imdb_id, '', '', '', p.name, p.birthday, p.place_of_birth, gender,
            p.profile_path, [], [], [], p.biography, '', '', 0, p.adult);

          return this.http.get(personExternalIdsUrl(this.apiKey, personId));
        })
        .flatMap(response =>
        {
          actor.imdbId = response.json().imdb_id;

          return this.http.get(personImagesUrl(this.apiKey, personId));
        })
        .flatMap(response =>
        {
          this.mapImagesToImageArray(response.json().profiles, actor.profiles);

          return this.getMovieCredits(actor);
        })
        .flatMap(response =>
        {
          return this.getTvCredits(actor);
        })
        .map(response => {
          return actor;
        })
        .catch(this.handleError);
    }

    searchActor(actorName: string, adult: boolean): Observable<any>
    {
        console.log(searchPersonUrl(this.apiKey, actorName, adult));
        return this.http.get(searchPersonUrl(this.apiKey, actorName, adult)).map(response => {
            console.log(response.json().results);
            return response.json().results;
        })
        .catch(this.handleError);
    }

    public getMovieCredits<T extends Person>(person: T): Observable<T> {
        return this.http.get(personMovieCreditsUrl(this.apiKey, person.id)).map(response =>
        {
            this.mapCreditsToCreditsArray(response.json().cast, person.castCredits, 'CastCredits', 'movie');
            this.mapCreditsToCreditsArray(response.json().crew, person.crewCredits, 'CrewCredits', 'movie');

            return person;
        });
    }

    public getTvCredits<T extends Person>(person: T): Observable<T> {
        return this.http.get(personTvCreditsUrl(this.apiKey, person.id)).map(response =>
        {
            this.mapCreditsToCreditsArray(response.json().cast, person.castCredits, 'CastCredits', 'tv');
            this.mapCreditsToCreditsArray(response.json().crew, person.crewCredits, 'CrewCredits', 'tv');

            return person;
        });
    }

    private mapImagesToImageArray(images: any[], array: Image[]): void
    {
        images.forEach(image => {
            array.push(new Image(image.aspect_ratio, image.width, image.height, image.file_path));
        });
    }

    private mapCreditsToCreditsArray<C extends Credits[]>(credits: any[], array: C, arrayType: string, type: string): void
    {
        credits.forEach(credit => {
            let movie: Movie = null;
            let serie: Serie = null;
            if(type == 'movie') {
                movie = new Movie(0, credit.title, credit.orginal_title, credit.release_date, credit.poster_path,
                    '', '', [], 0, 0, false);
            } else if (type == 'tv') {
                serie = new Serie(0, credit.name, credit.orginal_name, credit.first_air_date, credit.poster_path,
                    '', '', credit.episode_count, [], 0, 0, false)
            }

            if(arrayType == 'CastCredits') {
                array.push(new CastCredits(credit.id, credit.credit_id, movie, serie, credit.character, credit.adult));
            } else if(arrayType == 'CrewCredits') {
                array.push(new CrewCredits(credit.id, credit.credit_id, movie, serie, credit.department, credit.job));
            }
        });
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
