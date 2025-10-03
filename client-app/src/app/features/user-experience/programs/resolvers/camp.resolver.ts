import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';


export const campResolver: ResolveFn<any> = (route) => {
    const slug = route.paramMap.get('slug')!;
    // Replace with real API
    return of({ slug, title: 'Brains & Ballers Gold Camp', dates: 'Oct 22–26, 2025', location: 'The St. Michael School, Barbados' });
};