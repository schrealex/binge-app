import { Component, Input, SimpleChange, ViewChild, Renderer, Directive, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Media } from "../../model/media";
import { Movie } from '../../model/movie';

import { Util } from "../../util/movie.util";
import { MediaService } from "../../service/media.service";

@Component({
    moduleId: module.id,
    selector: 'media-recommendations',
    templateUrl: 'media.recommendations.component.html'
})

export class MediaRecommendationsComponent<T extends Media>
{
    @Input() media: T;

    recommendations: Media[] = [];

    constructor(private router: Router, private mediaService: MediaService, private renderer: Renderer)
    {

    }

    ngOnChanges(changes: SimpleChange)
    {
        console.log(changes);
        this.getRecommendations(this.media, 'tv');
    }

    getRecommendations(media: Media, type: string): void
    {
        this.mediaService.getRecommendations(this.media, type).subscribe(
            recommendationsData =>
            {
                this.recommendations = recommendationsData;
                console.log(this.recommendations);
            },
            error => console.log('ERROR: ' + error),
            () => console.log('Retrieving', type, 'recommendations for', media.title, 'complete.')
        );
    }

    getMediaPoster(media: Media): string
    {
        return new Util().getImage(media.posterPath, 'w250_and_h141_bestv2', 'poster');
    }

    onScrollScrollLeft(event: any)
    {
        let target = event.currentTarget;
        let style = target.firstElementChild.currentStyle || window.getComputedStyle(target.firstElementChild);
        let imageWidth = target.firstElementChild.offsetWidth + parseInt(style.marginRight);
        let multiplier = Math.floor(target.offsetWidth / imageWidth);
        let scrollLeftValue = Math.abs((multiplier * imageWidth) / Math.abs(event.wheelDeltaY));

        target.scrollLeft -= event.wheelDeltaY * scrollLeftValue;
        event.preventDefault();
    }
}
