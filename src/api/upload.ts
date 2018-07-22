import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const PATH = '/uploadImage/getSignPackage';
const UPLOADPATH = '/uploadImage/upload';

export interface UploadImgInfo {
  taskOrderId: string;
  files: {};
  sequence: string;
}
export function setUploadImg(files: any) {
  let formData = new FormData();
  formData.append('files', files[0]);
  return fetch(stringifPath(UPLOADPATH), {
    method: 'POST',
    body: formData
  }).then(response => response.json());
}
