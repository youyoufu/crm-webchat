/// <reference path="../typings/window.extend.d.ts" />
// import { getWXconfig } from '@/api/upload';
import { internalFetch } from '@/util/fetch';
import { stringifPath } from '@/api/index';

/* 引入微信JSSDK */
function importWxJS() {
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
const PATH = '/uploadImage/getSignPackage';
interface ShareConfig {
  debug: boolean;
  app_id?: string;
  timestamp?: number;
  noncestr?: string;
  signature?: string;
}
// export function getWXconfig(url: string) {
//   return internalFetch('POST')(true)(stringifPath(PATH), {
//     body: { url }
//   });
// }
/* 获取微信配置信息 */
function getWXconfig(url: string): Promise<ShareConfig> {
  return internalFetch('POST')(true)('/oauth/getsignpackage', {
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
export function isWifi() {
  let wifi: boolean = true;
  let client = getClient();
  if (client === 'wx') {
    Promise.all([getWXconfig(window.location.href), importWxJS()])
      .then(([data]: [ShareConfig, {}]) => {
        let shareConfig = {
          debug: true,
          appId: data.app_id,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature
        };

        if (window.wx && window.wx.config) {
          window.wx.config({
            ...shareConfig,
            jsApiList: ['getNetworkType'],
            fail(err: string) {
              console.log('config error:' + err);
            },
            success(res: {}) {
              console.log('config success:' + res);
              window.wx.ready(() => {
                window.wx.getNetworkType({
                  success: function(res: any) {
                    return res.networkType !== 'wifi' ? false : true; // 返回网络类型2g，3g，4g，wifi
                  }
                });
              });
            }
          });
        }
      })
      .catch(e => {
        console.error('get config error:', e);
        return true;
      });
  }
  return wifi;
}

// wx.ready(function () {
//     wx.checkJsApi({
//         jsApiList: [
//             'chooseImage',
//             'previewImage',
//             'uploadImage',
//             'downloadImage'
//         ],
//         success: function (res) {
//             //alert(JSON.stringify(res));
//             //alert(JSON.stringify(res.checkResult.getLocation));
//             if (res.checkResult.getLocation == false) {
//                 alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
//                 return;
//             }else{
//                 wxChooseImage();
//             }
//         }
//     });
// });
// wx.error(function(res){
//     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//     alert("验证失败，请重试！");
//     wx.closeWindow();
// });

// export function isWifi() {
//   // var ua: string = navigator.userAgent;
//   // var ss = ua.match(/NetType\/\w+/) || '';
//   // var networkStr = ss ? ss[0] : 'NetType/other';
//   // networkStr = networkStr.toLowerCase().replace('nettype/', '');
//   // var networkType;
//   // switch (networkStr) {
//   //   case 'wifi':
//   //     networkType = 'wifi';
//   //     break;
//   //   case '4g':
//   //     networkType = '4g';
//   //     break;
//   //   case '3g':
//   //     networkType = '3g';
//   //     break;
//   //   case '3gnet':
//   //     networkType = '3g';
//   //     break;
//   //   case '2g':
//   //     networkType = '2g';
//   //     break;
//   //   default:
//   //     networkType = 'other';
//   // }
//   // return networkType;
//   var wifi: boolean = true;
//   var ua: string = window.navigator.userAgent || '';
//   // var con = window.Navigator.connection;
//   // 如果是微信
//   if (/MicroMessenger/.test(ua)) {
//     // 如果是微信6.0以上版本，用UA来判断
//     if (/NetType/.test(ua)) {
//       let curUa = ua.match(/NetType\/(\S*)$/);
//       if (curUa && curUa[1] != 'WIFI') {
//         wifi = false;
//       }
//       // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
//     }
//     else {
//       document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
//         window.WeixinJSBridge.invoke('getNetworkType',(e)=> {
//           if (e.err_msg != 'network_type:wifi') {
//             wifi = false;
//           }
//         });
//       });
//     }
//     //   // 如果支持navigator.connection
//     // } else if (con) {
//     //   var network = con.type;
//     //   if (network != 'wifi' && network != '2' && network != 'unknown') {
//     //     // unknown是为了兼容Chrome Canary
//     //     wifi = false;
//     //   }
//   }
//   return wifi;
// }
export function getClient() {
  let client = 'm';
  let ua = navigator.userAgent;
  if (ua.indexOf('MicroMessenger') > -1) {
    client = 'wx';
  }
  return client;
}
