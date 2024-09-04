import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Criteria } from '../../model/criteria';
import { CriteriaType } from '../../model/criteria-type';
import { CriteriaComparator } from '../../model/criteria-comparator';
import { SaveableCriteria } from '../../model/saveable-criteria';
import { Filter } from '../../model/filter';
import { FilterService } from '../../service/filter.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationUtilities } from '../../util/notification.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrl: './add-filter.component.scss'
})
export class AddFilterComponent implements OnInit {

  @Output() savedFilterEvent = new EventEmitter<Filter>();

  CriteriaType = CriteriaType;
  CriteriaComparator = CriteriaComparator;

  filterForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddFilterComponent>,
    private formBuilder: UntypedFormBuilder,
    private filterService: FilterService,
    private notificationUtil: NotificationUtilities
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filterName: this.formBuilder.control(null, [Validators.required]),
      criterias: this.formBuilder.array([
        this.buildCriteriaForm()
      ])
    });
  }

  get criteriasArray() {
    return <FormArray>this.filterForm.get('criterias');
  }

  getCurrentCriteriaType(index: number) {
    return (this.filterForm.get('criterias') as FormArray).at(index).get('type')?.value;
  }

  criteriaTypeSelected(index: number, criteria: Criteria): void {
    if (criteria.type.toString() === CriteriaType[CriteriaType.AMOUNT]) {
      this.criteriasArray.at(index).get('comparator')?.setValue(CriteriaComparator.MORE_THAN);
    } else if (criteria.type.toString() === CriteriaType[CriteriaType.TITLE]) {
      this.criteriasArray.at(index).get('comparator')?.setValue(CriteriaComparator.STARTS_WITH);
    } else {
      this.criteriasArray.at(index).get('comparator')?.setValue(CriteriaComparator.FROM);
    }
  }

  addCriteriaRow(): void {
    const newCriteria = this.buildCriteriaForm();
    this.criteriasArray.controls.push(newCriteria);
  }

  removeCriteriaRow(index: number): void {
    let formArray: FormArray = this.filterForm.get('criterias') as FormArray;
    formArray.removeAt(index);
  }

  saveFilter(): void {
    if (!this.getFormErrors(this.filterForm)) {
      const criteriasFormArray: FormArray = this.filterForm.get('criterias') as FormArray;
      const saveableCriterias: SaveableCriteria[] = (criteriasFormArray.controls as FormControl[]).map((control: FormControl) => control.value);

      const criterias = saveableCriterias.map(criteria => {
        return <Criteria>{
          type: criteria.type,
          comparator: criteria.comparator,
          ...(criteria.type.toString() === CriteriaType[CriteriaType.AMOUNT] ? { amountValue: criteria.value } : {}),
          ...(criteria.type.toString() === CriteriaType[CriteriaType.TITLE] ? { titleValue: criteria.value } : {}),
          ...(criteria.type.toString() === CriteriaType[CriteriaType.DATE] ? { dateValue: criteria.value } : {}),
        };
      })

      const saveableFilter: Filter = {
        name: this.filterForm.get('filterName')?.value,
        criterias: criterias
      }

      this.filterService.saveFilter(saveableFilter).subscribe({
        next: (filter: Filter) => {
          this.closeDialog(filter);
        },
        error: () => {
          this.notificationUtil.openSnackbar("Error occured when saving a filter!", "Error!");
        },
        complete: () => {
          this.notificationUtil.openSnackbar("Filter saved!", "Success!");
        }
      });
    } else {
      this.notificationUtil.openSnackbar("Fields are invalid", "Error!");
    }
  }

  private getFormErrors(form: FormGroup): boolean {
    let errorsExist: boolean = false;
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors != null) {
        errorsExist = true;
      }
    })

    return errorsExist;
  }

  private buildCriteriaForm(): FormGroup {
    return this.formBuilder.group({
      type: this.formBuilder.control(CriteriaType[CriteriaType.AMOUNT], [Validators.required]),
      comparator: this.formBuilder.control(CriteriaComparator.MORE_THAN, [Validators.required]),
      value: this.formBuilder.control(null, [Validators.required])
    })
  }

  private closeDialog(filter: Filter) {
    this.dialogRef.close({ data: filter });
  }

}
