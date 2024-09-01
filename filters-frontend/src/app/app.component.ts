import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from './service/filter.service';
import { Filter } from './model/filter';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddFilterComponent } from './components/add-filter/add-filter.component';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { CriteriaType } from './model/criteria-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  CriteriaType = CriteriaType;

  displayedColumns: string[] = ['expand', 'name', 'criterias'];
  criteriaDisplayedColumns: string[] = ['type', 'comparator', 'value'];
  expandedFilter: Filter | null;

  filters: Filter[] = [];
  filtersSub: Subscription = new Subscription();

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.filtersSub = this.filterService.getFilters().subscribe((filters: Filter[]) => {
      this.filters = filters;
    })
  }

  openAddFilterDialog() {
    this.dialog.open(AddFilterComponent, {width: '1200px'});
  }

  ngOnDestroy(): void {
    this.filtersSub?.unsubscribe();
  }
}
