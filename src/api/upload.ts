import { stringifPath } from './index';
import { getCookie } from '@/util/cookie';
import { TOKEN } from '@/util/session';
const UPLOADPATH = '/taskOrder/uploadImage';

export function setUploadImg(files: any, taskOrderId: string, sequence: string) {
  let headers = new Headers();
  headers.set(TOKEN, getCookie(TOKEN));
  headers.set('account', getCookie('account'));
  let formData = new FormData();
  formData.append('files', files[0]);
  formData.append('taskOrderId', taskOrderId);
  formData.append('sequence', sequence);
  return fetch(stringifPath(UPLOADPATH), {
    headers,
    method: 'POST',
    body: formData
  }).then(response => response.json());

}
