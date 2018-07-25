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
export function login(sid:string,url:string) {
  console.log(1111,encodeURIComponent(devServer+url));
  location.href = stringifPath(PATH) + '?return_url=' + encodeURIComponent(devServer+url)+'&sellerId='+sid;
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
