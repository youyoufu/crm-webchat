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
  task_order_id: string;
  status: string;
  task_no: string;
  gift: string;
  taobao_key: string;
  taobao_key_url: string;
  taobao_key_url1: string;
  goods: Array<{ key_word: string; url: string; good_name: string }>;
  comments: string;
  webchatcode_url: string;
  taobaoorder_url: string;
}
export function setCheckTBkey(taskOrderId: string, taobaoKey1: string, taobaoKey2: string) {
  return internalFetch('GET')(true)(stringifPath(PATH), {
    body: { taskOrderId, taobaoKey1, taobaoKey2 }
  });
}
export function setOrderNo(taskOrderId: string, orderNo: string) {
  return internalFetch('GET')(true)(stringifPath(submitOrderNoPATH), {
    body: { taskOrderId, orderNo }
  });
}
export function setTaobaoKey(taskOrderId: string, key: string) {
  return internalFetch('GET')(true)(stringifPath(submitTaoBaoKeyPATH), {
    body: { taskOrderId, key }
  });
}
export function getFreeOrderDetail(taskOrderId: string) {
  return internalFetch('GET')(true)(stringifPath(getFreeOrderDetailPath), {
    body: { taskOrderId }
  });
}
