export interface IFormFields {
  key: string;
  title: string;
  type: inputTypes;
  errorMessage?: string;
  span?: string;
  options?: IFormOptions[];
  validators: string[];
  maxSelected?: number;
}

export interface IFormOptions {
  value: string;
  label: string;
}

type inputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'select'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
