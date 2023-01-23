import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IFormFields } from '../../../../models/form-fields.model';
import { FORMS_CONFIG } from '../../../../../assets/consts/configs/forms-config.consts';
import { Observable } from 'rxjs';
import { TeamsFacade } from '../../../../services/teams/teams.facade';
import { TournamentsFacade } from '../../../../services/tournaments/tournaments.facade';
import { createTournamentCalendar } from '../../../../utils/createTournamentCalendar';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  dynamicForm: FormGroup;
  dragAndDropItems: Observable<any>;
  model: 'team' | 'tournament';
  filterFields: IFormFields[];
  step = 1;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teamFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.model = params['model'];
      this.filterFields = FORMS_CONFIG[this.model] as IFormFields[];
      if (this.filterFields) {
        this.dynamicForm = this.generateDynamicForm();
      }
      if (this.model === 'tournament') {
        this.dragAndDropItems = this.teamFacade.selectAllTeams();
      }
    });
  }

  onSubmit() {
    this.step === 1 && this.model === 'tournament'
      ? this.step++
      : this.handleOnSubmit();
  }

  handleOnSubmit() {
    console.log(this.dynamicForm.value);

    switch (this.model) {
      case 'team':
        // this.teamFacade.createTeam(this.dynamicForm.value);
        break;
      case 'tournament':
        const calendar = createTournamentCalendar(
          this.dynamicForm.controls['teams'].value
        );
        this.tournamentsFacade.createTournament({
          ...this.dynamicForm.value,
          calendar,
        });
        break;
    }
  }

  onClose(key: string, message: string, max: number) {
    return this.dynamicForm.get(key).value.length === max ? message : null;
  }

  generateDynamicForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.filterFields.forEach((field) => {
      baseForm.addControl(
        field.key,
        new FormControl('', this.getValidators(field.validators))
      );
    });
    return baseForm;
  }

  getValidators(validators: string[]) {
    const validatorsArr: any = [];
    validators.forEach((key) => {
      let keySplitted;
      if (key.includes(':')) {
        keySplitted = key.split(':');
      }
      if (key === 'required') validatorsArr.push(Validators.required);
      if (key.includes('maxLength'))
        validatorsArr.push(Validators.maxLength(Number(keySplitted[1].trim())));
      if (key.includes('minLength'))
        validatorsArr.push(Validators.minLength(Number(keySplitted[1].trim())));
      if (key.includes('pattern'))
        validatorsArr.push(Validators.pattern(keySplitted[1].trim()));
      if (key.includes('email')) validatorsArr.push(Validators.email);
      if (key === 'min')
        validatorsArr.push(Validators.min(Number(keySplitted[1].trim())));
      if (key === 'max')
        validatorsArr.push(Validators.max(Number(keySplitted[1].trim())));
    });

    return validatorsArr;
  }

  getFormDefaultImage(): string {
    return this.model === 'tournament'
      ? '../../../../../assets/icons/default-tournament-logo.svg'
      : '../../../../../assets/icons/person.svg';
  }

  setControlInvalidStyle(controlName: string) {
    return (
      this.dynamicForm.get(controlName).touched &&
      this.dynamicForm.get(controlName).invalid
    );
  }

  getMultiSelectPlaceholder(item: any) {
    return this.dynamicForm.get(item.key).value.length === 0
      ? item.title
      : null;
  }

  getButtonLabel() {
    if (this.model === 'tournament') {
      return 'Next';
    }
    return 'Create';
  }

  onDragAndDropEvent(e: any) {
    if (this.dynamicForm.controls['teams'])
      this.dynamicForm.controls['teams'].setValue(e);
  }
}
