import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Sessions } from './pages/sessions/sessions';
import { MovieDetailsPage } from './pages/movie-details-page/movie-details-page';
import { ProfilePage } from './pages/profile-page/profile-page';


export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'sessions', component: Sessions},
    {path: 'movies/:slug', component: MovieDetailsPage},
    {path: 'profile', component: ProfilePage},
];
