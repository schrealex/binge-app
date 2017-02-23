import { Component } from '@angular/core';

import { Movie } from "../model/movie";
import { Person } from "../model/person";
import { Media } from "../model/media";

const imageUrl = (size: string, filePath: string) => `http://image.tmdb.org/t/p/${size}${filePath}`;
const dummyPosterUrl = `app/images/movie-reel.jpg`;
const dummyProfileUrl = `app/images/profile-small.jpg`;

@Component({
    moduleId: module.id,
    selector: 'movieUtil'
})

export class Util
{
    getImage(filePath: string, size: string, type: string): string
    {
        let imageSize = size != null ? size : 'w342';
        if(filePath == null) {
            switch(type) {
                case 'Poster':
                case 'Backdrop':
                    return dummyPosterUrl;
                case 'Profile':
                    return dummyProfileUrl;
            }
        }
        return imageUrl(imageSize, filePath);
    }
}
