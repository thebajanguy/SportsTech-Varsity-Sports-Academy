import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChangeDetectionStrategy, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { UtilitiesService } from '../../../../core/services/utilities.service';
import { SocialPluginComponent } from "../../~common/components/social-plugin/social-plugin.component";
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';


@Component({
    selector: 'app-home-page',
    standalone: true,

    imports: [CommonModule, RouterLink, SocialPluginComponent, NewsletterPage, NgbModule],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomePage implements OnInit, OnDestroy  {
    utilitiesService = inject(UtilitiesService);
    public urlPath: string = ''; 
    public loginPath: string = ''; 
    public date: Date = new Date();

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


