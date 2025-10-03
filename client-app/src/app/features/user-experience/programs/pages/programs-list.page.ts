import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-programs-list',
    standalone: true,
imports: [RouterLink],
template: `
<section class="container mx-auto p-6">
<h2 class="text-2xl font-semibold">Programs directory</h2>
<ul class="list-disc pl-6 mt-3">
<li><a routerLink="/programs/camps-clinics" class="underline">Camps & Clinics</a></li>
</ul>
</section>
`
})
export class ProgramsListPage {}