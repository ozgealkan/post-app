import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null
        }

        const hasUpperCase = /[A-Z]+/.test(value)
        const hasLowerCase = /[a-z]+/.test(value)
        const hasNumber = /[0-9]+/.test(value)
        const validPassword = hasLowerCase && hasUpperCase && hasNumber;

        return !validPassword ? { passwordStrength: true } : null;

    }
}