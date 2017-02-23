import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';

import { Serie } from '../../model/serie';
import { SerieInformation } from "../../model/serie-information";
import { MediaInformation } from "../../model/media-information";
import { Person } from "../../model/person";

import { MediaService } from '../../service/media.service';
import { Util } from "../../util/movie.util";



@Component({
    moduleId: module.id,
    selector: 'serie-detail',
    templateUrl: 'serie-detail.component.html',
    styleUrls: ['serie-detail.component.css']
})

export class SerieDetailComponent
{
    @Input() serie: Serie;
    @Output() addFavorite = new EventEmitter();

    serieInformation: MediaInformation;

    constructor(private mediaService: MediaService)
    {

    }

    ngOnChanges(changes: SimpleChange)
    {
        console.log(changes);
        this.getSerieInformation(this.serie, 'tv');
    }

    getSerieInformation(serie: Serie, type: string)
    {
        this.mediaService.getMediaInformation(serie, type)
            .subscribe(
                serieData =>
                {
                    this.serieInformation = serieData;
                    console.log(this.serieInformation);
                },
                error => console.log('ERROR: ' + error),
                () => console.log('Retrieving serie information for', serie.title, 'complete.')
            );
    }

    getAverageRuntime(serieInformation: SerieInformation) {
        return serieInformation.episodeRuntime.reduce((a,b) => (a+b)) / serieInformation.episodeRuntime.length;
    }

    getSeriePoster(serie: Serie): string {
        return new Util().getImage(serie.posterPath, null, 'Poster');
    }

    getProfileImage(person: Person): string {
        return new Util().getImage(person.profilePath, 'w45', 'Profile');
    }

    onAddFavorite() {
        if(this.serie) {
            this.addFavorite.next(this.serie);
        }
    }

    // setFavorite(isFavorite: boolean)
    // {
    //     this.movieInformation.favorite = isFavorite;
    //     this.favorite.emit(isFavorite);
    // }
}
