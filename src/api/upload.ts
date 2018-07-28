import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
import { getCookie, removeCookie } from '@/util/cookie';
import { TOKEN } from '@/util/session';
const PATH = '/uploadImage/getSignPackage';
const UPLOADPATH = '/taskOrder/uploadImage';

export function setUploadImg(files: any, taskOrderId: string, sequence: string) {

      let headers = new Headers();
      // if (!isGetToken) {
        headers.set(TOKEN, getCookie(TOKEN));
      // }

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
