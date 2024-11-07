import { en } from './en';

export function translate(string) {
  return en[string] || string;
}
