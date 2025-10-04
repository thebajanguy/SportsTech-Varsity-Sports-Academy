import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SocialPluginComponent } from "../../~common/components/social-plugin/social-plugin.component";
import { NewsletterPage } from "../../correspondence/pages/newsletter.page";
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component"; 

@Component({
    selector: 'app-who-we-are',
    standalone: true,

    imports: [CommonModule, NgbModule, RouterLink, SocialPluginComponent, NewsletterPage, FixedSocialPluginComponent],
    templateUrl: './who-we-are.page.html',
    styleUrl: './who-we-are.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhoWeArePage implements OnInit, OnDestroy  {
    data : Date = new Date();

    ngOnInit() {
        
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('about-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent'); 
    }
    
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('about-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}