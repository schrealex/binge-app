import { Component, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../model/movie';
import { MovieInformation } from '../../model/movie-information';
import { MovieService } from '../../service/movie.service';
import { Util } from '../../util/movie.util';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.component.css']
})
export class DetailComponent {

    private movie: Movie;
    private movieId;
    private movieTitle;

    public movieInformation: MovieInformation;

    @Output() onAddFavorite = new EventEmitter();

    constructor(private route: ActivatedRoute, private movieService: MovieService) {
        this.movieTitle = this.route.snapshot.params['title'];
        this.movieId = this.route.snapshot.params['id'];

        this.getMovieInformation(this.movieId);
    }

    public getMovieInformation(id: number) {
        this.movieService.getMovieInformation(id, false)
            .subscribe(
                movieData => {
                    this.movieInformation = movieData;
                    console.log(this.movieInformation);
                },
                error => console.log('ERROR: ' + error),
                () => console.log('Retrieving movie information for', this.movieTitle, 'complete.')
            );
    }

    public getMoviePoster(movie: Movie): string {
        return new Util().getImage(movie.posterPath, null, 'Poster');
    }

    addFavorite() {
        console.log('Add favorite ' + this.movieInformation.title);
        this.movieService.addToFavorites(this.movieInformation.id, true).subscribe(response => {
            if (response.status_code === 1) {
                this.movieInformation.favorite = true;
                this.onAddFavorite.emit(this.movie);
            }
        });
    }
}
