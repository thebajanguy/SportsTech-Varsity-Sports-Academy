import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';


import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';
import { BasePageComponent } from '../../../../core/directives/base-page.directive';
import { BaseHeroComponent } from "../../~common/components/base-hero/base-hero.component";


@Component({
    selector: 'app-approach',
    standalone: true,

    imports: [CommonModule, RouterLink, SocialPluginComponent, NewsletterPage, BaseHeroComponent],
    templateUrl: './approach.page.html',
    styleUrl: './approach.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ApproachPage extends BasePageComponent {
    override pageName = 'vsa-page';

    description = `
    <strong>All Elete Sports</strong> provides full-cycle sports training designed to improve the way young athletes approach sports fundamentals, performance and growth,
    by creating a multi-sports curriculum that activates, educates and provides an opportunity for young athletes to unlock their full potential.
    We provide effective, safe and transparent sports performance and fundamentals training so young athletes can develop and reach their true potential.
    We enlist a set of diverse experts to support youth athletes with a full-cycle approach that includes body, performance and mental training.
    <br /><br />
    Want to begin your Elite Athlete journey?
    `.trim();
}