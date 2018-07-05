import { get } from '@/util/fetch';
import { stringifPath } from './index';

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
  return get(stringifPath(PATH), {
    body: {options },
  });
}
