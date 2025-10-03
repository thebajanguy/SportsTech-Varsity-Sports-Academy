import { Routes } from '@angular/router';
export const REGISTER_ROUTES: Routes = [
{ path: '', loadComponent: () => import('./pages/register-hub.page').then(m => m.RegisterHubPage), data: { title: 'Register | VSA Prep' } },
{ path: 'after-school', loadComponent: () => import('./pages/register-after-school.page').then(m => m.RegisterAfterSchoolPage), data: { title: 'Register: After-School' } },
{ path: 'camps/:slug', loadComponent: () => import('./pages/register-camp.page').then(m => m.RegisterCampPage), data: { title: 'Register: Camp' } }
];