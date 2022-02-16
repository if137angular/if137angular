import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FlightInfoState } from 'src/app/store/flight-info.state';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Select(FlightInfoState.loading) loading$: Observable<any>;

  loading: boolean;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loading$.pipe(untilDestroyed(this)).subscribe((loading) => {
      this.loading = loading;
      this.cdRef.detectChanges();
    });

  }
  toggle: boolean = false;

  toggling(event: any) {

    function checkClass(className: any) {
      return event.target.classList.contains(className)
    }

    if (checkClass('filter-btn')) {
      this.toggle = true;
    }

    if (checkClass('close-btn')) {
      this.toggle = false;
    }

    if (checkClass('filterWrapper')) {
      this.toggle = false;
    }

    if (this.toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

  }
}
