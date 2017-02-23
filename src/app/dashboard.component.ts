import { Component, OnInit, SimpleChange } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Movie } from './model/movie';

import { MovieService } from './service/movie.service';

import { Util } from "./util/movie.util";

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit
{
    movies: Observable<Movie[]>;

    removedMovie: string = '';
    mouseOver: boolean = false;
    removedFromFavorites: boolean = false;

    constructor(private router: Router, private movieService: MovieService, title: Title)
    {
        title.setTitle('B I N G E / dashboard')
    }

    ngOnInit(): void
    {
        this.getFavoriteMovies();
    }

    ngOnChanges(changes: SimpleChange)
    {
        console.log(changes);
        this.getFavoriteMovies();
    }

    getFavoriteMovies() {
        this.movies = this.movieService.favoriteMovies();
    }

    getMoviePoster(movie: Movie): string {
        return new Util().getImage(movie.posterPath, null, 'Poster');
    }

    displayMouseOver()
    {
        this.mouseOver = !this.mouseOver;
    }

    removeFromFavorites(movie: Movie) {
        this.removedMovie = movie.title;
        this.movieService.addToFavorites(movie.id, false).subscribe(response => {
            if(response.status_code == 13) {
                this.removedFromFavorites = true;
                console.log(`${this.removedMovie} removed from favorites`);
                this.getFavoriteMovies();
            }
        });
    }

    gotoDetail(movie: Movie): void
    {
        let link = ['/movie/detail', movie.title, movie.id];
        console.log(link);
        this.router.navigate(link);
    }
}
