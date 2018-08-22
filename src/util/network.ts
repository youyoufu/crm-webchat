import { importWxJS, ShareConfig, getWXconfig, getClient } from '@/util/importwx';

export function isWifi() {
  Promise.all([getWXconfig(window.location.href), importWxJS()])
    .then(([data]: [ShareConfig, {}]) => {
      let shareConfig = {
        debug: false,
        appId: data.app_id,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature
      };

      if (window.wx && window.wx.config) {
      window.wx.config({
        ...shareConfig,
        jsApiList: ['getNetworkType']
      });
      window.wx.ready(() => {
        window.wx.getNetworkType({
          success: function(res: any) {
          return res.networkType === 'wifi' ? true : false; // 返回网络类型2g，3g，4g，wifi
          }
        });
      });
      }
    })
    .catch(e => {
      console.error('get config error:', e);
      return true;
    });
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
