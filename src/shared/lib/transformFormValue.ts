import { ChangeEvent } from 'react';
import { FormTypeElement } from '../model';

export const transformFormValue = <K, T extends keyof K>(
  e: ChangeEvent<FormTypeElement>,
  key: T,
) => {
  const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
  return { [key]: value } as K;
};
