import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-register-hub',
    standalone: true,
imports: [RouterLink],
template: `
<section class="container mx-auto p-6">
<h2 class="text-2xl font-semibold">Registration Hub</h2>
<ul class="list-disc pl-6 mt-3">
<li><a routerLink="/register/after-school" class="underline">After-School</a></li>
<li><a routerLink="/register/camps/brains-ballers-gold-camp" class="underline">Brains & Ballers Gold Camp</a></li>
</ul>
</section>
`
})
export class RegisterHubPage {}