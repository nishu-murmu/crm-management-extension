import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const stringAtomFamily = atomFamily(() => atom(''));
export const booleanAtomFamily = atomFamily(() => atom(false));
export const objectAtomFamily = atomFamily(() => atom({}));
export const arrayAtomFamily = atomFamily(() => atom([]));
export const mainPopupRefAtom =
  // @ts-ignore
  atom<HTMLElement | null>(null);
export const floatingButtonRefAtom =
  // @ts-ignore
  atom<HTMLElement | null>(null);
export const toastAtom = atom({
  state: false,
  message: '',
});
