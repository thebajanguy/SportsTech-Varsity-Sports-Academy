import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-camps-clinics-detail',
    standalone: true,
    template: `
    <section class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold">Camp: {{ data?.title || slug }}</h2>
    <p class="mt-2">Details loading from resolver…</p>
    <pre class="mt-4 bg-gray-100 p-3 rounded">{{ data | json }}</pre>
    </section>
    `,
imports: [JsonPipe]
})
export class CampClinicsDetailPage {
    private ar = inject(ActivatedRoute);
    slug = this.ar.snapshot.paramMap.get('slug');
    data = this.ar.snapshot.data['camp'];
}