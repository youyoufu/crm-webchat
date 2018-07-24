import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const PATH = '/taskOrder/checkTaobaoKey';
const submitOrderNoPATH = '/taskOrder/commitOrderNo';
const submitTaoBaoKeyPATH = '/taskOrder/commitTaobaoKey';
const getFreeOrderDetailPath = '/taskOrder/freeOrder';
export interface CheckTBkeyInfo {
  taskOrderId: string;
  taobaoKey1: string;
  taobaoKey2: string;
}
export interface OrderNoInfo {
  taskOrderId: string;
  orderNo: string;
}
export interface freeInfo {
  id: string;
  status: string;
  task_no: string;
  gift: string;
  taobao_key: string;
  check_first_url: string;
  check_second_url: string;
  goods: Array<{ keyword: string; url: string; good_name: string; sku: string; long_url: string; square_url: string }>;
  comments: string;
  order_pic_url: string;
  wechat_code_url: string;
}
export function setCheckTBkey(taskOrderId: string, taobaoKey1: string, taobaoKey2: string) {
  return internalFetch('POST')(true)(stringifPath(PATH), {
    body: { taskOrderId, taobaoKey1, taobaoKey2 }
  });
}
export function setOrderNo(taskOrderId: string, orderNo: string) {
  return internalFetch('POST')(true)(stringifPath(submitOrderNoPATH), {
    body: { taskOrderId, orderNo }
  });
}
export function setTaobaoKey(taskOrderId: string, key: string) {
  return internalFetch('POST')(true)(stringifPath(submitTaoBaoKeyPATH), {
    body: { taskOrderId, key }
  });
}
export function getFreeOrderDetail(taskOrderId: string) {
  return internalFetch('POST')(true)(stringifPath(getFreeOrderDetailPath), {
    body: { taskOrderId }
  });
}
