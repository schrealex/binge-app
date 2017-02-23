import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Person } from '../../../model/person';

import { ActorService } from '../../../service/actors.service';

import { Util } from '../../../util/movie.util';

@Component({
    moduleId: module.id,
    selector: 'search-persons',
    templateUrl: 'search-persons.component.html',
    styleUrls: ['search-persons.component.css']
})

export class SearchPersonsComponent
{
    persons: Person[] = [];
    personName: string = '';
    adult: boolean = false;
    displayNoPersonsFound: boolean = false;

    constructor(private router: Router, private actorService: ActorService)
    {

    }

    searchPersons()
    {
        this.clearPersons();
        this.actorService.searchActor(this.personName, this.adult)
            .subscribe(
                personData =>
                {
                    this.persons = personData;
                    this.displayNoPersonsFound = this.persons.length == 0;
                },
                error => console.log('ERROR: ' + error),
                () => console.log('Searching persons with name containing', this.personName, 'complete.')
            );
    }

    gotoPersonDetail(person: Person): void
    {
        let link = ['/person/detail', person.name, person.id];
        console.log(link);
        this.router.navigate(link);
    }

    getProfileImage(person: Person): string {
        return new Util().getImage(person.profilePath, 'w45', 'Profile');
    }

    getImage(imagePath: string, size: string): string {
        return new Util().getImage(imagePath, size, 'Profile');
    }

    toggleAdult() {
        this.adult = !this.adult;
    }

    clearPersons()
    {
        this.persons = [];
    }
}
