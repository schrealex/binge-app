import { Component, Input } from '@angular/core';
import { Image } from "../../model/image";
import { CarouselOptions } from "./carousel-options";
import { Util } from "../../util/movie.util";

@Component({
    moduleId: module.id,
    selector: 'carousel',
    templateUrl: 'carousel.component.html',
    styles: [`
        .carousel-inner > .item > img,
        .carousel-inner > .item > a > img {
            width: 100%;
            margin: auto;
        }
    `]
})

export class CarouselComponent {

    @Input() options: CarouselOptions;
    @Input() images: Image[];

    constructor() {

    }

    getImage(imagePath: string, size: string): string {
        return new Util().getImage(imagePath, size, 'poster');
    }
}
