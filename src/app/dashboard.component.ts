import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Movie } from './model/movie';
import { Util } from './util/movie.util';
import { MovieService } from './service/movie.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnChanges {

    movies: Observable<Movie[]>;
    // movies: Array<Movie>;

    removedMovie: string = '';
    mouseOver: boolean = false;
    removedFromFavorites: boolean = false;

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
        console.log('getFavoriteMovies');
        this.movies = this.movieService.favoriteMovies();
        // this.movies = new Array<Movie>();
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
                console.log(`${this.removedMovie} removed from favorites`);
                this.getFavoriteMovies();
            }
        });
    }

    gotoDetail(movie: Movie): void {
        const link = ['/movie/detail', movie.title, movie.id];
        console.log(link);
        this.router.navigate(link);
    }
}
