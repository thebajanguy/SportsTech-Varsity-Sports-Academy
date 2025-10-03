// app.routes.ts
import { Routes, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { languageCanMatch } from '../core/guards/language.guard';
import { seoResolve } from '../core/resolvers/seo.resolver';
import { UserExperienceLayout } from '../features/user-experience/~layout/user-experience.layout';

export const DEFAULT_LANG = 'en';
export const SUPPORTED_LANGS = ['en', 'es', 'fr'] as const;

const routes: Routes = [
  // Localized shell
  {
    path: ':lang',
    component: UserExperienceLayout,
    canMatch: [languageCanMatch(SUPPORTED_LANGS, DEFAULT_LANG)],
    children: [
      { // Default child → Home
        path: '',
        pathMatch: 'full',
        redirectTo: 'academic-tutoring-and-sports-training'
      },
      { path: 'academic-tutoring-and-sports-training',loadChildren: () => import('../features/user-experience/home/home.routes').then(m => m.HOME_ROUTES) },
      { path: 'who-we-are',loadChildren: () => import('../features/user-experience/who-we-are/who-we-are.routes').then(m => m.WHO_WE_ARE_ROUTES) },
      { path: 'what-we-do',loadChildren: () => import('../features/user-experience/what-we-do/what-we-do.routes').then(m => m.WHAT_WE_DO_ROUTES) },

      { path: '', loadChildren: () => import('../features/user-experience/correspondence/correspondence.routes').then(m => m.CORRESPONDENCE_ROUTES) },
      { path: 'programs-directory', loadChildren: () => import('../features/user-experience/programs/programs.routes').then(m => m.PROGRAMS_ROUTES) },
      { path: 'registration-hub', loadChildren: () => import('../features/user-experience/register/register.routes').then(m => m.REGISTER_ROUTES) },

      // System pages
      { path: '404', loadComponent: () => import('../core/system/error-pages/not-found.page').then(m => m.NotFoundPage), resolve: { seo: seoResolve({ title: 'Page Not Found', robots: 'noindex,nofollow' }) } },
      { path: '500', loadComponent: () => import('../core/system/error-pages/error.page').then(m => m.ErrorPage), resolve: { seo: seoResolve({ title: 'Error', robots: 'noindex,nofollow' }) } },
      // Child catch-all (localized 404)
      { path: '**', redirectTo: '404' }
    ]
  },

  // Root redirects to default language
  { path: '', pathMatch: 'full', redirectTo: `${DEFAULT_LANG}` },

  // Any other root miss → default home
  { path: '**', redirectTo: `${DEFAULT_LANG}/404` }
];

export const ROUTER_PROVIDERS = [
  provideRouter(routes,
    withInMemoryScrolling({ 
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
    withPreloading(PreloadAllModules) // faster perceived loads
  )

];


