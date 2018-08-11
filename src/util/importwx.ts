/// <reference path="../typings/window.extend.d.ts" />
import { internalFetch } from '@/util/fetch';
import { stringifPath } from '@/api/index';
export function getClient() {
  let client = 'm';
  let ua = navigator.userAgent;
  if (ua.indexOf('MicroMessenger') > -1) {
    client = 'wx';
  }
  return client;
}

/* 引入微信JSSDK */
export function importWxJS() {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
    script.onload = resolve;
    script.onerror = reject;
    let doc = document.querySelector('head') || null;
    if (doc) {
      doc.appendChild(script);
    }
  });
}
const PATH = '/userInfo/getSignPackage';
export interface ShareConfig {
  debug: boolean;
  app_id?: string;
  timestamp?: number;
  noncestr?: string;
  signature?: string;
}
/* 获取微信配置信息 */
export function getWXconfig(url: string): Promise<ShareConfig> {
  return internalFetch('POST')(true)(stringifPath(PATH), {
    body: { url }
  }).then((data: any) => data);
}

export interface WxConfig {
  debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: string; // 必填，企业号的唯一标识，此处填写企业号corpid
  timestamp: number; // 必填，生成签名的时间戳
  nonceStr: string; // 必填，生成签名的随机串
  signature: string; // 必填，签名，见附录1
  jsApiList?: Array<string>; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}
