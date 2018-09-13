import { getCookie, setCookie, removeCookie } from './cookie';
export const TOKEN = 'my-store-token';
export const accountToken = 'my-store-token-account';
export const taobaoAccount = 'taobao-account';
export const myPhone = 'my-phone';
export const invitorPhone = 'invitor-phone';

/* 检查是否登陆 */
export function hasLogin(account: string) {
  if (account !== getCookie(accountToken)) {
    return false;
  } else {
    return !!getCookie(TOKEN);

  }
}

/* 保持登陆态 */
export function saveLogin(token: string) {
  return setCookie(TOKEN, token);
}

/* 撤销 */
export function loginOut() {
  return removeCookie(TOKEN);
}
