import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterPage } from '../../correspondence/components/newsletter.component';
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component";
import { BasePageComponent } from '../../../../core/directives/base-page.directive';
import { BaseHeroComponent } from "../../~common/components/base-hero/base-hero.component";

@Component({
    selector: 'app-recruitment-and-exposure',
    standalone: true,

    imports: [CommonModule, RouterLink, NewsletterPage, FixedSocialPluginComponent, BaseHeroComponent],
    templateUrl: './recruitment-exposure.page.html',
    styleUrl: './recruitment-exposure.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruitmentAndExposurePage extends BasePageComponent {
    override pageName = 'vsa-page';
}