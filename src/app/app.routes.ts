import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Sessions } from './pages/sessions/sessions';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'sessions', component: Sessions},
];
