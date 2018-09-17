import { internalFetch } from '@/util/fetch';
import { setCookie, getCookie } from '@/util/cookie';
import { accountToken, taobaoAccount, myPhone, invitorPhone } from '@/util/session';
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
    let invitor_phone = getCookie(invitorPhone);
    let phone = getCookie(myPhone);
    let taobao_account = getCookie(taobaoAccount);
    let localurl = stringifPath(PATH) + '?return_url=' + encodeURIComponent(devServer + url + '?account=' + account) + '&account=' + account + '&invitor_phone=' + invitor_phone + '&phone=' + phone + '&taobao_account=' + taobao_account;
    setCookie(invitorPhone, '');
    setCookie(myPhone, '');
    setCookie(taobaoAccount, '');
    location.href = localurl;
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
