import { Component, Input } from '@angular/core';
import { Media } from "../../model/media";
import { Util } from "../../util/movie.util";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html'
})

export class ThumbnailComponent<M extends Media>
{
  @Input() id: string;
  @Input() media: M;

  constructor(private router: Router)
  {

  }

  getMoviePoster(media: M, size: string): string
  {
    return new Util().getImage(media.posterPath, size, 'Poster');
  }

  gotoDetail(movieId: string, movieTitle: string): void
  {
    let link = ['/movie/detail', movieTitle, movieId];
    this.router.navigate(link);
  }
}
