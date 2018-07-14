import { internalFetch, deletx } from '@/util/fetch';
import { saveLogin, loginOut as logout } from '@/util/session';
import { stringifPath } from './index';

const PATH = '/login/connect';

export interface LoginInfo {
  username: string;
  otherid: string;
  type: string;
}

/* 登陆 */
export function login() {
  return internalFetch('GET')(true)(stringifPath(PATH), {
    body: { sellerId: '1' }
  });
}

/* 退出 */
export function loginOut() {
  return deletx(stringifPath(PATH)).then(logout);
}
