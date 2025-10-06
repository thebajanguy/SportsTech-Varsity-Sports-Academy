import { CommonModule } from '@angular/common';
import { inject, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';


import { UtilitiesService } from '../../../../core/services/utilities.service';
import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component";

@Component({
    selector: 'app-recruitment-and-exposure',
    standalone: true,

    imports: [CommonModule, RouterLink, SocialPluginComponent, NewsletterPage, FixedSocialPluginComponent],
    templateUrl: './recruitment-exposure.page.html',
    styleUrl: './recruitment-exposure.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruitmentAndExposurePage implements OnInit, OnDestroy  {
    utilitiesService = inject(UtilitiesService);
    urlPath: string = ''; 
    loginPath: string = ''; 
    public date: Date = new Date();

    constructor( ) {
        this.urlPath = this.utilitiesService.UrlRoutePath; 
        this.loginPath = this.utilitiesService.LoginRoutePath;  
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('vsa-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('vsa-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}