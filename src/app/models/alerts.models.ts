export interface IAlert {
  title?: string;
  text?: string;
  icon?: 'error' | 'success' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  iconColor?: string;
  timer?: number;
  input?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'range'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'url';
  color?: string;
  background?: string;
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  allowEnterKey?: boolean;
  showConfirmButton?: boolean;
  showDenyButton?: boolean;
  showCancelButton?: boolean;
  denyButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  denyButtonColor?: string;
  confirmButtonAriaLabel?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  html?: string;
}
