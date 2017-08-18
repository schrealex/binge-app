import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Observable } from 'rxjs/Rx';

import { Movie } from '../model/movie';
import { MovieInformation } from "../model/movie-information";

import { ApiAuthenticationService } from './api-authentication.service';
import { Actor } from "../model/actor";
import { CrewMember } from "../model/crewmember";

const apiKey = 'f16bfeb0210b43f1f12d8d4ccc114ee9';
const baseUrl = ' https://api.themoviedb.org/3';


const addToFavoritesUrl = (sessionId) => `${baseUrl}/account/{account_id}/favorite?api_key=${apiKey}&session_id=${sessionId}`;
const favoriteMoviesUrl = (sessionId, page) => `${baseUrl}/account/{account_id}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}&page=${page}`;
const discoverMoviesUrl = `${baseUrl}/discover/movie?api_key=${apiKey}`;

const searchMoviesUrl = (query, includeAdult) => `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&include_adult=${includeAdult}`;
const movieInformationUrl = (movieId) => `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
const movieCreditsUrl = (movieId) => `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;

@Injectable()
export class MovieService
{
  private headers = new Headers({ 'content-type': 'application/json;charset=utf-8' });

  constructor(private http: Http, private apiAuthenticationService: ApiAuthenticationService)
  {

  }

  discoverMovies(): Observable<Movie[]>
  {
    console.log(discoverMoviesUrl);
    return this.http.get(discoverMoviesUrl).map(result => <Movie[]> result.json().results)
      .map(this.mapResponseToMovies()).catch(this.handleError);
  }

  addToFavorites(movieId: number, addToFavorites: boolean): Observable<any>
  {
    return this.apiAuthenticationService.getSessionId().flatMap(sessionId =>
    {
      console.log(addToFavoritesUrl(sessionId));
      return this.http.post(addToFavoritesUrl(sessionId),
        { media_type: "movie", media_id: movieId, favorite: addToFavorites }, this.headers).map(result =>
      {
        return result.json();
      })
        .catch(this.handleError);
    })
      .catch(this.handleError);
  }

  favoriteMovies(): Observable<Movie[]>
  {
    return this.apiAuthenticationService.getSessionId().flatMap(sessionId =>
    {
      return this.http.get(favoriteMoviesUrl(sessionId, 2))
          .map(result => {
            console.log(result.json());
            return <Movie[]> result.json().results;
          })
          .map(this.mapResponseToMovies())
          .debounceTime(500)
          .distinctUntilChanged()
          .catch(this.handleError);
    });

    // return this.apiAuthenticationService.getSessionId().flatMap(sessionId =>
    // {
    //   return this.http.get(favoriteMoviesUrl(sessionId, 1))
    //   .map(result =>
    //   {
    //     if (result.json().total_pages === 1)
    //     {
    //       return <Movie[]> result.json().results;
    //     } else {
    //       return this.http.get(favoriteMoviesUrl(sessionId, 1));
    //     }
    //   });
    // });

      // let page = 1;
      // return this.http.get(favoriteMoviesUrl(sessionId, page))
      //   .map(result =>
      //   {
      //     console.log(result.json().total_pages);
      //     if (result.json().total_pages === 1)
      //     {
      //       return <Movie[]> result.json().results;
      //     } else {
      //
      //     }
      //   })
      //   .map(this.mapResponseToMovies())
      //   .debounceTime(500)
      //   .distinctUntilChanged()
      //   .catch(this.handleError);
  }

  discoverMoviesFiltered(): Movie[]
  {
    let discoveredMovies: Movie[] = [];
    let favoritedMovies: Movie[] = [];
    let filteredMovies: Movie[] = [];
    this.discoverMovies().flatMap(response =>
    {
      discoveredMovies = response;
      return this.favoriteMovies().map(response =>
      {
        favoritedMovies = response;

        discoveredMovies.forEach(function (discoveredMovie)
        {
          let addMovieToFilteredMovies: boolean = true;
          favoritedMovies.forEach(function (favoriteMovie)
          {
            if (discoveredMovie.id == favoriteMovie.id)
            {
              addMovieToFilteredMovies = false;
            }
          });
          if (addMovieToFilteredMovies)
          {
            filteredMovies.push(discoveredMovie);
          }
        });
      });
    }).subscribe();
    return filteredMovies;
  }

  searchMovies(title: string, includeAdult: boolean): Observable<Movie[]>
  {
    console.log(searchMoviesUrl(title, includeAdult));
    return this.http.get(searchMoviesUrl(title, includeAdult))
      .map(result => <Movie[]> result.json().results)
      .map(this.mapResponseToMovies())
      .debounceTime(500)
      .distinctUntilChanged()
      .catch(this.handleError);
  }

  getMovieInformation(movieId: number, favorite: boolean): Observable<MovieInformation>
  {
    console.log(movieInformationUrl(movieId));

    return this.http.get(movieInformationUrl(movieId)).flatMap(response =>
    {
      let m = response.json();
      console.log(m);
      let mi: MovieInformation = new MovieInformation(m.id, m.imdb_id, m.title, m.original_title, m.release_date,
        m.genres, [], [], [], [], m.runtime, m.poster_path, m.backdrop_path, [], [], m.overview, m.tagline,
        m.vote_average, m.vote_count, favorite);

      console.log(movieCreditsUrl(movieId));
      return this.http.get(movieCreditsUrl(movieId)).map(response => response.json()).map((m: any) =>
      {
        console.log(m);
        m.cast.forEach((a) =>
        {
          mi.actors.push(new Actor(a.id, '', '', '', a.credit_id, a.name, null, 'unknown', 'unknown',
            a.profile_path, [], [], [], '', a.cast_id, a.character, a.order, false));
        });
        m.crew.forEach((c) =>
        {
          let crewMember = new CrewMember(c.id, '', '', '', c.credit_id, c.name, c.profile_path, [], [], [],
            c.department, c.job);
          if (c.department == 'Directing')
          {
            mi.directors.push(crewMember);
          } else if (c.department == 'Writing')
          {
            mi.writers.push(crewMember);
          } else if (c.department == 'Production')
          {
            mi.producers.push(crewMember);
          }
        });
        return mi;
      })
        .catch(this.handleError);
    })
      .catch(this.handleError);
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
          response.push(new Movie(movie.id, movie.title, movie.orginal_title, movie.release_date,
            movie.poster_path, movie.backdrop_path, movie.overview, movie.genre_ids, movie.vote_average,
            movie.vote_average, false));
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
