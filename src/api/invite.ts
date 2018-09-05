import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const getInviteInfoPATH = '/userInfo/getInviteInfo';
const getShareInfoPATH = '/unregisterUserInfo/getShareInfo';
const saveAccountInfoPATH = '/unregisterUserInfo/saveAccountInfo';
export interface shareInfo {
  name: string;
  phone: string;
  status: string;
  invite_list: Array<{
    name: string;
    success: string;
    bonus_point: string;
  }>;
}
export function getInviteInfo() {
  return internalFetch('POST')(true)(stringifPath(getInviteInfoPATH));
}
export function getShareInfoCode(account: string) {
  return internalFetch('POST')(true)(stringifPath(getShareInfoPATH), {
    body: { account }
  });
}

export function saveAccountInfo(phone: string, account: string, seller_account: string, invitor_phone: string) {
  return internalFetch('POST')(true)(stringifPath(saveAccountInfoPATH), {
    body: { phone, account, seller_account, invitor_phone }
  });
}
