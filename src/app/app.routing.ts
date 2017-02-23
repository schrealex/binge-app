import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard.component";
import { MoviesComponent } from './movies.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieAddComponent } from "./movie-add.component";
import { RecommendationsComponent } from "./components/recommendations/recommendations.component";
import { SeriesComponent } from "./components/series/series.component";
import { PersonDetailComponent } from "./components/persons/details/person-detail.component";
import { SearchPersonsComponent } from "./components/persons/search/search-persons.component";
import { GamesComponent } from './games.component';
import { DetailComponent } from "./movies/details/detail.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'movie/detail/:title/:id',
    component: DetailComponent
  },
  {
    path: 'movie/add',
    component: MovieAddComponent
  },
  {
    path: 'series',
    component: SeriesComponent
  },
  {
    path: 'person/detail/:name/:id',
    component: PersonDetailComponent
  },
  {
    path: 'persons',
    component: SearchPersonsComponent
  },
  {
    path: 'games',
    component: GamesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
