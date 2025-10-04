import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';
import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';


@Component({
    selector: 'app-approach',
    standalone: true,

    imports: [CommonModule, NgbModule, FormsModule, SocialPluginComponent, NewsletterPage],
    templateUrl: './approach.page.html',
    styleUrl: './approach.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ApproachPage implements OnInit, OnDestroy  {
    data : Date = new Date();

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