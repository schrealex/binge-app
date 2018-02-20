import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from './model/movie';
import { Util } from './util/movie.util';
import { MovieService } from './service/movie.service';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnChanges {

    movies: Movie[];

    removedMovie = '';
    mouseOver = false;
    removedFromFavorites = false;

    constructor(private router: Router, private movieService: MovieService, title: Title) {
        title.setTitle('B I N G E / dashboard');
    }

    ngOnInit(): void {
        this.getFavoriteMovies();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getFavoriteMovies();
    }

    getFavoriteMovies() {
        this.movieService.favoriteMovies().subscribe(favoriteMovies => {
            this.movies = favoriteMovies;
        });
    }

    getMoviePoster(movie: Movie): string {
        return new Util().getImage(movie.posterPath, null, 'Poster');
    }

    displayMouseOver() {
        this.mouseOver = !this.mouseOver;
    }

    removeFromFavorites(movie: Movie) {
        this.removedMovie = movie.title;
        this.movieService.addToFavorites(movie.id, false).subscribe(response => {
            if (response.status_code === 13) {
                this.removedFromFavorites = true;
                window.scrollTo(0, 0);
                console.log(`${this.removedMovie} removed from favorites`);
                this.getFavoriteMovies();
            }
        });
    }

    gotoDetail(movie: Movie): void {
        this.router.navigate(['/movie/detail', movie.title, movie.id]);
    }
}
