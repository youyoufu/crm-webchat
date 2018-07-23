import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const PATH = '/uploadImage/getSignPackage';
const UPLOADPATH = '/uploadImage/upload';
export function setUploadImg(files: any, taskOrderId: string, sequence: string) {
  let formData = new FormData();
  formData.append('files', files[0]);
  formData.append('taskOrderId', taskOrderId);
  formData.append('sequence', sequence);
  return fetch(stringifPath(UPLOADPATH), {
    method: 'POST',
    body: formData
  }).then(response => response.json());
}
