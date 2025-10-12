import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NewsApi {
    getList(): Observable<any[]> {
        return of([
            { slug: 'brains-and-ballers-camp', title: 'Brains & Ballers Gold Camp Announced', date: '2025-10-22' },
            { slug: 'academic-honors', title: 'VSA Prep Students Earn Academic Honors', date: '2025-11-10' }
        ]);
    }

    getArticleBySlug(slug: string): Observable<any> {
        return of({ slug, title: 'Sample Article', content: 'Article body for ' + slug });
    }
}