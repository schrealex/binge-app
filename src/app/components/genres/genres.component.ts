import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'genres',
    templateUrl: 'genres.component.html'
})

export class GenresComponent {

    @Input() genres: any[];

    constructor() {

    }

    public getGenres() {
        return this.genres.map(genre => genre.name).join(', ');
    }
}
