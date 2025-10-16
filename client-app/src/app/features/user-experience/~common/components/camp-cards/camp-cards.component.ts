import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityApi, Activity } from '../../apis/activity.api';

@Component({
  selector: 'app-camp-cards',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './camp-cards.component.html',
  styles: [`
    .sr-only {
      position:absolute!important;
      height:1px;width:1px;overflow:hidden;
      clip:rect(1px,1px,1px,1px); white-space:nowrap; border:0; padding:0; margin:-1px;
    }
    .mt-20 { margin-top: 20px; }
  `]
})
export class CampCardsComponent  {
  @Input({ required: true }) interest!: 'basketball' | 'soccer' | string;
  @Input() urlPath: string = 'en'; // supply from parent as needed
  @Input({ required: true }) cityAndCountry: string = 'Barbados';        // NEW
  @Input() activeOnly?: boolean = false;        // NEW
  @Input({ required: true }) activityType:  string = 'Basketball-Camp';

  private activitySvc = inject(ActivityApi);
  activities$!: Observable<Activity[]>;

  ngOnInit(): void {
    //cityAndCountry = this.route.snapshot.queryParamMap.get('city') ?? undefined;
    this.activities$ = this.activitySvc.getActivities$(this.interest.trim().toLocaleLowerCase(), this.cityAndCountry.trim().toLocaleLowerCase(), this.activeOnly);
  }

  trackById = (_: number, c: Activity) => c.id;
  sameYear(c: Activity): boolean {
    const s = new Date(c.dates.start); 
    const e = new Date(c.dates.end);
    return s.getFullYear() === e.getFullYear();
  }
}
