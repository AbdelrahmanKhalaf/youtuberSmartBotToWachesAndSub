import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static acceptEnglisgh(control: AbstractControl): ValidationErrors | null {
    const re = /^[A-Zِa-z&\/\\#,+|_\-()\[\]:;+@$~%.`'":*?!{} ]*$/;
    if (!control.value) return null;
    const valid = re.test(control.value);
    return valid ? null : { acceptEnglisgh: true };
  }

  static userNameSpecialChars(
    control: AbstractControl
  ): ValidationErrors | null {
    const re = /([\\\/:*?^<>|'"Æ]|{end})/;
    if (!control.value) return null;
    const valid = re.test(control.value);
    return valid ? { userNameSpecialChars: true } : null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!control.value) return null;
    const valid = re.test(control.value.trim());
    return valid ? null : { email: true };
  }

  static shouldNotStartWith(value: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const opt: any[] = value.split(',');
      for (let i = 0; i < opt.length; i++) {
        let val = control.value;
        if (val != undefined && val.trim().toLowerCase().startsWith(opt[i])) {
          return { shouldNotStartWith: true };
        }
      }
      return null;
    };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  static minlen(minNum: number, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      return control.value.trim().length >= minNum ? null : error;
    };
  }

  static maxlen(maxNum: number, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      return control.value.trim().length <= maxNum ? null : error;
    };
  }

  static getAge(DOB: string) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  }
}
