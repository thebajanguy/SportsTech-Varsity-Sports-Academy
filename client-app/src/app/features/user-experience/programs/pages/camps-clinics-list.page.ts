import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-camps-clinics-list',
    standalone: true,
    imports: [RouterLink],
    template: `
    <section class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold">Camps & Clinics</h2>
    <ul class="list-disc pl-6 mt-3">
    <li><a routerLink="/programs/camps-clinics/brains-ballers-gold-camp" class="underline">Brains & Ballers Gold Camp</a></li>
    </ul>
    </section>
    `
})
export class CampsClinicsListPage {}