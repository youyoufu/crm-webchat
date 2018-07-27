import { get, internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
import { hasLogin } from '@/util/session';
const PATH = '/user';
const userCenterPath = '/userCenter/getUserInfo';
// export interface Filter {
//   type: 'liked' | 'going' | 'past';
//   offset?: number;
//   limit?: number;
// }

const _user = {};

/* 获取用户信息 */
export function getUserInfo() {
  return hasLogin() ? get(stringifPath(PATH)) : Promise.resolve({});
}
export interface userCenterInfo {
  name: string;
  free_task_time: string;
  refund_task_time: string;
  bonus_point: string;
  taobao_account: string;
  jd_account: string;
  phone: string;
  refund_list:Array< {
    execute_time: string;
    id: string;
    refund: string;
    status: string;
  }>;
}
export function getUserCenter() {
  return internalFetch('POST')(true)(stringifPath(userCenterPath));
}
// 响应结构：
// {status: msg:
// data:{name:名字,free_task_time:免单次数, refund_task_time:挖宝次数, bonus_point:积分，
// taobao_account:淘宝账号, jd_account:京东账号, phone：电话，
// refund_list:[execute_time:执行时间,id:任务订单ID, refund:返现金额, status：返现状态（0、领取任务 1、淘口令验证成功 2、提交订单 3、审核失败 4、审核成功 5、返款）]}
// }
