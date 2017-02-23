import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from "./movies.component";
import { MovieService } from "./service/movie.service";
import { DateFormatPipe } from "./util/date-format.pipe";
import { MovieDetailComponent } from "./movie-detail.component";
import { GenresComponent } from "./components/genres/genres.component";
import { PersonsComponent } from "./components/persons/persons.component";
import { PersonDetailComponent } from "./components/persons/details/person-detail.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { routing } from "./app.routing";
import { SearchPersonsComponent } from "./components/persons/search/search-persons.component";
import { DashboardComponent } from "./dashboard.component";
import { ConfigurationService } from "./service/configuration.service";
import { ApiAuthenticationService } from "./service/api-authentication.service";
import { MediaService } from "./service/media.service";
import { SerieService } from "./service/serie.service";
import { ActorService } from "./service/actors.service";
import { RecommendationsComponent } from "./components/recommendations/recommendations.component";
import { MediaRecommendationsComponent } from "./components/recommendations/media.recommendations.component";
import { MovieAddComponent } from "./movie-add.component";
import { SeriesComponent } from "./components/series/series.component";
import { SerieDetailComponent } from "./components/series/serie-detail.component";
import { DetailComponent } from "./movies/details/detail.component";
import { GamesComponent } from "./games.component";
import { ThumbnailComponent } from "./components/thumbnail/thumbnail.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CarouselComponent,
    GenresComponent,
    PersonsComponent,
    RecommendationsComponent,
    MediaRecommendationsComponent,
    MoviesComponent,
    MovieAddComponent,
    MovieDetailComponent,
    SeriesComponent,
    SerieDetailComponent,
    DetailComponent,
    PersonDetailComponent,
    SearchPersonsComponent,
    GamesComponent,
    ThumbnailComponent,
    DateFormatPipe
  ],
  providers: [
    ConfigurationService,
    ApiAuthenticationService,
    MediaService,
    MovieService,
    SerieService,
    ActorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
