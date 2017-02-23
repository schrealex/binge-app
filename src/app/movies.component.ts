import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Movie } from './model/movie';

import { MovieService } from './service/movie.service';

import { Util } from './util/movie.util';

@Component({
    moduleId: module.id,
    selector: 'movies',
    templateUrl: 'movies.component.html',
    styleUrls: ['movies.component.css']
})

export class MoviesComponent
{
    selectedMovie: Movie = null;
    movies: Movie[] = [];
    movieTitle: string = '';
    adult: boolean = false;
    displayNoMoviesFound: boolean = false;

    constructor(private router: Router, private movieService: MovieService)
    {

    }

    searchMovies()
    {
        this.clearMovies();
        this.movieService.searchMovies(this.movieTitle, this.adult)
            .subscribe(
                movieData =>
                {
                    this.movies = movieData;
                    this.displayNoMoviesFound = this.movies.length == 0;
                },
                error => console.log('ERROR: ' + error),
                () => console.log('Searching movies with titles containing', this.movieTitle, 'complete.')
            );
    }

    selectMovie(movie: Movie)
    {
        this.selectedMovie = movie;
    }

    getMoviePoster(movie: Movie): string
    {
        return new Util().getImage(movie.posterPath, null, 'Poster');
    }

    toggleAdult()
    {
        this.adult = !this.adult;
    }

    onAddFavorite(movie: Movie)
    {
        this.movieService.addToFavorites(movie.id, true).subscribe();
    }
    clearMovies()
    {
        this.movies = [];
        this.selectedMovie = null;
    }
}
