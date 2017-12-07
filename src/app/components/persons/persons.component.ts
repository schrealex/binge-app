import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from '../../model/person';
import { Util } from '../../util/movie.util';

@Component({
    moduleId: module.id,
    selector: 'persons',
    templateUrl: 'persons.component.html',
    styleUrls: ['persons.component.scss']
})

export class PersonsComponent {

    @Input() headerTitle: string;
    @Input() persons: Person[];

    private open = false;

    constructor(private router: Router) {

    }

    public getProfileImage(person: Person): string {
        return new Util().getImage(person.profilePath, 'w45', 'Profile');
    }

    public gotoPersonDetail(person: Person): void {
        this.router.navigate(['/person/detail', person.name, person.id]);
    }

    public toggleOpen() {
        this.open = !this.open;
    }
}
