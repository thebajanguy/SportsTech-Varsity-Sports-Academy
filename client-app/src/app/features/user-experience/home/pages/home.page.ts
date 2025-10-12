import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SocialPluginComponent } from "../../~common/components/social-plugin/social-plugin.component";
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';
import { BasePageComponent } from '../../../../core/directives/base-page.directive';
import { BaseHeroComponent } from "../../~common/components/base-hero/base-hero.component";


@Component({
    selector: 'app-home-page',
    standalone: true,

    imports: [CommonModule, RouterLink, SocialPluginComponent, NewsletterPage, NgbModule, BaseHeroComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage extends BasePageComponent {
    override pageName = 'vsa-page';
    description = `
        You have a dream — we have the game plan. At
        <strong>Varsity Sports Academy Prep</strong>, our motto
        <em>“Labor Durus”</em> (Hard Work Always Pays Off) guides student-athletes
        to succeed in academics and athletics. What you put into life is what
        you’ll get out — train harder, play better, achieve more.
        `.trim();

    // override enableNavbarTransparent = false;     // uncomment if this page should NOT make navbar transparent
}


