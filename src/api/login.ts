import { internalFetch } from '@/util/fetch';
import { setCookie } from '@/util/cookie';
import { accountToken } from '@/util/session';
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
export function login(account: string, url: string) {
  if (account) {

    setCookie(accountToken, account);
    location.href = stringifPath(PATH) + '?return_url=' + encodeURIComponent(devServer + url) + '&account=' + account;
  }
  else {
    return;
  }
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
