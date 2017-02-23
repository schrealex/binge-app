import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { Person } from "../../../model/person";

import { Util } from "../../../util/movie.util";

import { ActorService } from "../../../service/actors.service";
import { CarouselOptions } from "../../carousel/carousel-options";
import { Media } from "../../../model/media";
import { Movie } from '../../../model/movie';
import { CrewCredits } from "../../../model/crew-credits";

@Component({
    moduleId: module.id,
    selector: 'person-detail',
    templateUrl: 'person-detail.component.html',
    // styleUrls: ['person-detail.component.css']
})

export class PersonDetailComponent<T extends Person, M extends Media> implements OnInit
{
    person: T;
    backdrops: string[];

    private crewCredits: Array<CrewCredits>;

    private carouselOptions: CarouselOptions = new CarouselOptions('profilePicturesCarousel', true, 0, 200, 'w185', '');

    constructor(private actorService: ActorService, private route: ActivatedRoute, private title: Title)
    {

    }

    ngOnInit(): void
    {
        this.route.params.forEach((params: Params) =>
        {
            let id = +params['id'];
            let name = params['name'];

            this.getPersonDetails(id);
            this.getBackdrops(name);
        });
    }

    getPersonDetails(personId: number)
    {
        this.actorService.getPersonDetails(personId)
            .subscribe(
                personDetailData =>
                {
                    console.log(personDetailData);
                    this.person = <T>personDetailData;
                },
                error => console.log('ERROR: ' + error),
                () =>
                {
                    console.log('Retrieving person details for', personId, 'complete.');
                    this.setTitle();
                    this.crewCredits = this.getCrewCredits();
                }
            );
    }

    getBackdrops(actorName: string)
    {
        this.actorService.searchActor(actorName, true)
            .subscribe(
                personData =>
                {
                    console.log('personData');
                    console.log(personData[0].known_for);

                    let backdrops: string[] = [];
                    personData[0].known_for.forEach(k => {
                        backdrops.push(k.backdrop_path);
                    });

                    this.backdrops = backdrops;
                },
                error => console.log('ERROR: ' + error),
                () =>
                {
                    console.log('Searching person with name', actorName, 'complete.');
                }
            );
    }

    setTitle()
    {
        this.title.setTitle(`B I N G E / ${this.person.name} details`);
    }

    getProfileImage(person: T, size: string): string
    {
        return new Util().getImage(person.profilePath, size, 'Profile');
    }

    getMoviePoster(media: M, size: string): string
    {
        return new Util().getImage(media.posterPath, size, 'Poster');
    }

    getBackdropImage(media: M, size: string): string
    {
        return new Util().getImage(media.backdropPath, size, 'Backdrop');
    }

    getCrewCredits(): Array<CrewCredits> {
      let crewCredits = this.person.crewCredits;
      let filteredCrewCredits = new Array<any>();
      crewCredits.forEach(credits => {
          if(filteredCrewCredits.length === 0) {
              filteredCrewCredits.push(credits);
          } else {
            let creditsFound: boolean = false;
            filteredCrewCredits.forEach(filtered => {
              if((credits.movie != null && filtered.movie != null && credits.movie.title === filtered.movie.title) ||
                (credits.serie != null && filtered.serie != null && credits.serie.title === filtered.serie.title)) {
                creditsFound = true;
              }
            });
            if(!creditsFound) {
              filteredCrewCredits.push(credits);
            }
          }
      });
      return filteredCrewCredits;
    }
}
