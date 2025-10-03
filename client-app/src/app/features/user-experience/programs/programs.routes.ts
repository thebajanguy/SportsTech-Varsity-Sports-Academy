import { Routes } from '@angular/router';
export const PROGRAMS_ROUTES: Routes = [
    {   
        path: '', loadComponent: () => import('./pages/programs-list.page').then(m => m.ProgramsListPage), 
        data: { title: 'Programs | VSA Prep' } 
    },
    {   
        path: 'camps-clinics', loadComponent: () => import('./pages/camps-clinics-list.page').then(m => m.CampsClinicsListPage), 
        data: { title: 'Camps & Clinics | VSA Prep' } 
    },
    {
        path: 'camps/:slug', loadComponent: () => import('./pages/camps-clinics-detail.page').then(m => m.CampClinicsDetailPage),
        resolve: { camp: () => import('./resolvers/camp.resolver').then(m => m.campResolver) },
        data: { title: 'Camp Detail | VSA Prep' }
    }
];