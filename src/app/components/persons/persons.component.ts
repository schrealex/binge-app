import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from "../../model/person";
import { Util } from "../../util/movie.util";

@Component({
    moduleId: module.id,
    selector: 'persons',
    templateUrl: 'persons.component.html',
    styleUrls: ['persons.component.css']
})

export class PersonsComponent {

    @Input() headerTitle: string;
    @Input() persons: Person[];

    private open: boolean = false;

    constructor(private router: Router) {

    }

    getProfileImage(person: Person): string {
        return new Util().getImage(person.profilePath, 'w45', 'Profile');
    }

    gotoPersonDetail(person: Person): void
    {
        let link = ['/person/detail', person.name, person.id];
        this.router.navigate(link);
    }

    toggleOpen() {
      this.open = !this.open;
    }
}
