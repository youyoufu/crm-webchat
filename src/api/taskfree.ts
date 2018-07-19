import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const PATH = '/taskOrder/checkTaobaoKey';
const submitOrderNoPATH = '/taskOrder/commitOrderNo';
export interface CheckTBkeyInfo {
  taskOrderId: string;
  taobaoKey1: string;
  taobaoKey2: string;
}
export interface OrderNoInfo {
  taskOrderId: string;
  orderNo: string;
}
export function setCheckTBkey({ taskOrderId, taobaoKey1, taobaoKey2 }: CheckTBkeyInfo) {
  return internalFetch('GET')(true)(stringifPath(PATH), {
    body: { taskOrderId, taobaoKey1, taobaoKey2 }
  });
}
export function setOrderNo({ taskOrderId, orderNo }: OrderNoInfo) {
  return internalFetch('GET')(true)(stringifPath(submitOrderNoPATH), {
    body: { taskOrderId, orderNo }
  });
}

