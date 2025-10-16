import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterPage } from "../../correspondence/components/newsletter.component";
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component"; 
import { BasePageComponent } from '../../../../core/directives/base-page.directive';
import { BaseHeroComponent } from "../../~common/components/base-hero/base-hero.component";

@Component({
    selector: 'app-who-we-are',
    standalone: true,

    imports: [CommonModule, RouterLink, NewsletterPage, FixedSocialPluginComponent, BaseHeroComponent],
    templateUrl: './who-we-are.page.html',
    styleUrl: './who-we-are.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhoWeArePage extends BasePageComponent {
    override pageName = 'vsa-page';
    description =`At <strong>Varsity Sports Academy Prep</strong>, we prepare student-athletes to excel
    both in the classroom and on the field. Through our unique blend of
    <strong>academic tutoring, elite sports training, and NCAA compliance guidance</strong>,
    we help youth unlock their full potential and pursue opportunities worldwide.
    <br /><br />
    Rooted in discipline, teamwork, and our motto
    <strong>Labor Durus</strong> (<em>“hard work”</em>), we focus on developing
    not just athletes, but well-rounded leaders.`;
}