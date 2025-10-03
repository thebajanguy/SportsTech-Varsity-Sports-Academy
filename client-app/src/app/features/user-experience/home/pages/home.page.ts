import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ChangeDetectionStrategy, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Rellax from 'rellax';
import { UtilitiesService } from '../../../../core/services/utilities.service';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
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

    imports: [CommonModule, NgbModule, AngularMultiSelectModule, SocialPluginComponent, NewsletterPage],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomePage implements OnInit, OnDestroy, AfterViewInit  {
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
        var rellaxHeader = new Rellax('.rellax-header');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('varsity-sports-academy-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    ngAfterViewInit(){
      setTimeout(function(){
        if (window.innerWidth >= 991) {
            var rellax = new Rellax('.rellax', {
                center: true
            });
            var rellax1 = new Rellax('.rellax1', {
                center: true
            });
            var rellax5 = new Rellax('.rellax5', {
                center: true
            });
            var rellax6 = new Rellax('.rellax6', {
                center: true
            });
            var rellax7 = new Rellax('.rellax7', {
                center: true
            });
            var rellax8 = new Rellax('.rellax8', {
                center: true
            });
            var rellax9 = new Rellax('.rellax9', {
                center: true
            });
            var rellax10 = new Rellax('.rellax10', {
                center: true
            });
            var rellax11 = new Rellax('.rellax11', {
                center: true
            });
            var rellax12 = new Rellax('.rellax12', {
                center: true
            });
            var rellax13 = new Rellax('.rellax13', {
                center: true
            });
            var rellax14 = new Rellax('.rellax14', {
                center: true
            });

            var rellaxHeader = new Rellax('.rellax-header');
            var rellaxText = new Rellax('.rellax-text');
        }
      },200);

    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('varsity-sports-academy-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}


