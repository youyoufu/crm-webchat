import { internalFetch } from '@/util/fetch';
import { stringifPath } from './index';
const PATH = '/uploadImage/getSignPackage';
const UPLOADPATH = '/uploadImage/upload';
// import dot2val from 'dot2val'

export interface UploadImgInfo {
  taskOrderId: string;
  files: {};
  sequence: string;
}
export function getWXconfig(url: string) {
  return {
    app_id: 'wx3df9d19384a491c9',
    timestamp: 1531882841,
    noncestr: 'KfjWQZyeH6SGYR5q',
    signature: '40a9b35044d4f0dfdf5a095c47e3f06ad9dd5420',
    url: '/api/public/index.php?s=/uploadImage/getSignPackage'
  };
  // return internalFetch('GET')(true)(stringifPath(PATH), {
  //   body: { url }
  // });
}
export function setUploadImg(files: any) {
  // let formData = new FormData();
  // formData.append('thumb', files[0]); //由于我的请求接口需要openid所以需要再次向FormData对象添加openid字段，如果你们不需要可以不用此操作
  console.log('333', files[0]);
  fetch(stringifPath(UPLOADPATH), { method: 'POST', body: files[0] })
    .then(json => {
      console.log('222222222', json);
      // let imgData = dot2val.get(json, 'data.items.pic.0')
    })
    .catch((err: {}) => {
      console.log('图片上传失败333', err);
    });
  // return internalFetch('POST')(true)(stringifPath(UPLOADPATH), {
  //   body: { file: files[0] }
  // });
}
