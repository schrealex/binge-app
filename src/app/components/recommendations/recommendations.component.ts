import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Movie } from '../../model/movie';
import { MovieService } from '../../service/movie.service';
import { Observable } from 'rxjs';
import { Util } from "../../util/movie.util";

@Component({
    moduleId: module.id,
    selector: 'recommendations',
    templateUrl: 'recommendations.component.html',
    styleUrls: ['recommendations.component.css']
})

export class RecommendationsComponent implements OnInit
{
    movies: Movie[] = [];

    addedMovie: string = '';
    mouseOver: boolean = false;
    addedToFavorites: boolean = false;

    constructor(private router: Router, private movieService: MovieService, title: Title)
    {
        title.setTitle('B I N G E / recommendations')
    }

    ngOnInit(): void
    {
        this.getDiscoverMoviesFiltered();
    }

    getDiscoverMoviesFiltered(): void
    {
        this.movies = this.movieService.discoverMoviesFiltered();
    }

    getMoviePoster(movie: Movie): string {
        return new Util().getImage(movie.posterPath, null, 'Poster');
    }

    gotoDetail(movie: Movie): void
    {
        let link = ['/movie/detail', movie.title, movie.id];
        console.log(link);
        this.router.navigate(link);
    }

    displayMouseOver()
    {
        this.mouseOver = !this.mouseOver;
    }

    addToFavorites(movie: Movie) {
        this.movieService.addToFavorites(movie.id, true).subscribe(response => {
            if(response.status_code == 1) {
                this.addedToFavorites = true;
                this.addedMovie = movie.title;
                console.log(`${movie.title} added to favorites`);
                this.getDiscoverMoviesFiltered();
            }
        });
    }
}
