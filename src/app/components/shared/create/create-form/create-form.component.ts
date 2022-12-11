import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IFormFields } from '../../../../models/form-fields.model';
import { FORMS_CONFIG } from '../../../../../assets/consts/configs/forms-config.consts';
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
  model: 'team';

  filterFields: IFormFields[];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.model = params['model'];
      this.filterFields = FORMS_CONFIG[this.model] as IFormFields[];
      if (this.filterFields) {
        this.dynamicForm = this.generateDynamicForm();
      }
    });
  }

  onSubmit() {
    console.log('hey');
    console.log(this.dynamicForm);
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
}
