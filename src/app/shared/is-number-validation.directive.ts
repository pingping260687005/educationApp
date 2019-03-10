import { ValidatorFn, AbstractControl } from "@angular/forms";

export function isNumberValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return Number.isNaN(Number(control.value)) ? {'isNotNumber': {value: control.value}} : null;
    };
  }