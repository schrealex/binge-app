import { Component, Input } from '@angular/core';

import { Genre } from "../../model/genre";

@Component({
    moduleId: module.id,
    selector: 'genres',
    templateUrl: 'genres.component.html'
})

export class GenresComponent {

    @Input() genres: Genre[];

    constructor() {

    }
}
