import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Rellax from 'rellax';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component";

@Component({
    selector: 'app-academic-tutoring',
    standalone: true,

    imports: [CommonModule, NgbModule, AngularMultiSelectModule, RouterLink, SocialPluginComponent, NewsletterPage, FixedSocialPluginComponent],
    templateUrl: './academic-tutoring.page.html',
    styleUrl: './academic-tutoring.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicTutoringPage  {
    data : Date = new Date();

    ngOnInit() {
        var rellaxHeader = new Rellax('.rellax-header');
        // var rellaxText = new Rellax('.rellax-text');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('vsa-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
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
        body.classList.remove('vsa-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}