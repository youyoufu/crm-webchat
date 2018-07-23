import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const submitRefundKeyPATH = '/taskOrder/refundOrderCommitKey';
const getRefundInfoPATH = '/taskOrder/refundOrderCommitKey';

export interface RefundInfo{
  key_word: string;
  task_order_id: string;
  status: string;
  task_no: string;
  gift: string;
  url: string;
}
export function setRefundTaobaoKey(taskOrderId: string, taobaoKey: string) {
  return internalFetch('POST')(true)(stringifPath(submitRefundKeyPATH), {
    body: { taskOrderId, taobaoKey }
  });
}


export function getRefundInfo(taskOrderId: string) {
  return internalFetch('POST')(true)(stringifPath(getRefundInfoPATH), {
    body: { taskOrderId}
  });
}

