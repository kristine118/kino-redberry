import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export const cardValidator: ValidatorFn = (c) => {
  const v = String(c.value ?? '').replace(/\s/g, '');
  return /^\d{16}$/.test(v) ? null : { msg: 'Card number must be 16 digits' };
};

export const expiryValidator: ValidatorFn = (c) => {
  const m = /^(\d{2})\/(\d{2})$/.exec(String(c.value ?? ''));
  if (!m) return { msg: 'Use MM/YY' };
  const month = +m[1];
  const year = 2000 + +m[2];
  if (month < 1 || month > 12) return { msg: 'Invalid month' };
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  return endOfMonth > new Date() ? null : { msg: 'Card has expired' };
};
export function nameValidator(c: AbstractControl): ValidationErrors | null {
  const v = String(c.value ?? '').trim();
  if (!v) return { msg: 'Name is required' };
  if (v.length < 3) return { msg: 'Name must be at least 3 characters' };
  if (v.length > 50) return { msg: 'Name must not exceed 50 characters' };
  return null;
}

export function birthValidator(c: AbstractControl): ValidationErrors | null {
  const v = c.value as string;
  if (!v) return { msg: 'Date of birth is required' };
  const birth = new Date(v);
  const today = new Date();
  if (birth > today) return { msg: 'Please enter a valid date of birth' };
  const min = new Date(birth);
  min.setFullYear(min.getFullYear() + 12);
  if (min > today) return { msg: 'You must be at least 12 years old to create an account' };
  return null;
}
export function mobileValidator(c: AbstractControl): ValidationErrors | null {
  const v = String(c.value ?? '').replace(/\s/g, '');
  if (!v) return { msg: 'Mobile number is required' };
  if (!/^\d+$/.test(v))
    return { msg: 'Please enter a valid Georgian mobile number (9 digits starting with 5)' };
  if (v[0] !== '5') return { msg: 'Georgian mobile numbers must start with 5' };
  if (v.length !== 9) return { msg: 'Mobile number must be exactly 9 digits' };
  return null;
}
export function emailValidator(c: AbstractControl): ValidationErrors | null {
  const v = String(c.value ?? '').trim();
  if (!v) return { msg: 'Email is required' };
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : { msg: 'Enter a valid email' };
}
export function cvvValidator(c: AbstractControl): ValidationErrors | null {
  return /^\d{3}$/.test(String(c.value ?? '')) ? null : { msg: 'CVV must be 3 digits' };
}