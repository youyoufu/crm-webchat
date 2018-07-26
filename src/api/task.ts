import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';

const TaskListPath = '/task/findTasksBySellerId';
const createTaskPath = '/taskOrder/findTask';
const CenterTaskPath = '/taskOrder/findTask';
export interface TasksListData {
  id: string;
  url: string;
}
/*获取对应任务*/
export function getTasksList(type: string) {
  return internalFetch('POST')(true)(stringifPath(TaskListPath), {
    body: { type }
  });
}
/*领取任务*/
export function getCreateTask(type: string, taskId: string) {
  return internalFetch('POST')(true)(stringifPath(createTaskPath), {
    body: { type, taskId }
  });
}
export interface CenterTaskData {
  free_task: Array<{ refund_rate: string; gift: string; url: string }>;
  refund_task: Array<{ url: string; bonus_point: string }>;
}
/*获取所有任务*/
export function getCenterTask() {
  return internalFetch('POST')(true)(stringifPath(CenterTaskPath));
}
const PATH = '/events';
export interface Filter {
  after?: number;
  before?: number;
  channels?: string;
  offset?: number;
  limit?: number;
}
/* 获取活动 */
export function getTaskList(options: Filter) {
  return _products;
  // return get(stringifPath(PATH), {
  //   body: { options }
  // });
}
const _products = [
  { id: '1', title: 'iPad 4 Mini', price: '500.01', inventory: '2' },
  { id: '2', title: 'H&M T-Shirt White', price: '10.99', inventory: '10' },
  { id: '3', title: 'Charli XCX - Sucker CD', price: '19.99', inventory: '5' }
];
export default {
  getProducts(cb: Function) {
    setTimeout(() => {
      cb(_products);
    }, 100);
  },
  buyProducts(products: Array<{}>, cb: Function, errorCb: Function) {
    setTimeout(() => {
      Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1 ? cb() : errorCb();
    }, 100);
  }
};
