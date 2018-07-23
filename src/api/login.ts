import { internalFetch, deletx } from '@/util/fetch';
import { stringifPath } from './index';
let { devServer } = require('../../.config.js');

const PATH = '/login/connect';
const BINDACCOUNTPATH = '/userAccount/saveUserAccount';

export interface LoginInfo {
  account: string;
  type: string;
  phone: string;
}

/* 登陆 */
export function login() {
  location.href = stringifPath(PATH) + '?return_url=' + encodeURIComponent(devServer);
}
export function BindAccount(account: string, phone: string, type: string) {
  return internalFetch('POST')(true)(stringifPath(BINDACCOUNTPATH), {
    body: { account, type, phone }
  });
}
// /* 退出 */
// export function loginOut() {
//   return deletx(stringifPath(PATH)).then(logout);
// }
