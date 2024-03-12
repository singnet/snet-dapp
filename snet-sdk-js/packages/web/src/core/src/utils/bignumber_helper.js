import { BigNumber } from 'bignumber.js';

export function toBNString(value) {
  return new BigNumber(value).toFixed();
}
