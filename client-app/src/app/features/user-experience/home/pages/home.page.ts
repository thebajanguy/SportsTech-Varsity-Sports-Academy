import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ChangeDetectionStrategy, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UtilitiesService } from '../../../../core/services/utilities.service';
import { SocialPluginComponent } from "../../~common/components/social-plugin/social-plugin.component";
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';

export class Correspondence {
    fullName?: string | null = '';
    email?: string | null = '';
    emailSentTo?: string | null = '';
    phoneNumber?: string | null = '';
    age?: string | null = '';
    gender?: string | null = '';
    interest?: string | null = '';
    firstName?: string | null = '';
    lastName?: string | null = '';
    subject?: string | null = '';
    message?: string | null = '';
    country?: string | null = '';
    sport?: string | null = '';
}

@Component({
    selector: 'app-home-page',
    standalone: true,

    imports: [CommonModule, NgbModule, SocialPluginComponent, NewsletterPage],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomePage implements OnInit, OnDestroy  {
    utilitiesService = inject(UtilitiesService);
    urlPath: string = ''; 
    loginPath: string = ''; 

    needsLogin!: boolean;
    _userName: string = '';

    // Correspondence
    public message?: string | null = '';
    public submitted?: boolean | null = false;
    public loading?: boolean | null = false;
    public Correspondence!: Correspondence;
    //public CorrespondenceProfile: CorrespondenceProfile;


    public date: Date = new Date();
    focus: any;
    focus1: any;
    activeTab = 1;

    public showSubscribeForm = 'true';
    public showContactForm = 'false';

    public showAllPricing = 'true';
    public showAthletePricing = 'false';
    public showCoachPricing = 'false';

    constructor( ) {
        this.urlPath = this.utilitiesService.UrlRoutePath; 
        this.loginPath = this.utilitiesService.LoginRoutePath;  
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('varsity-sports-academy-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('varsity-sports-academy-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}


