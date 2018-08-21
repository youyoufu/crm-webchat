import { importWxJS, ShareConfig, getWXconfig, getClient } from '@/util/importwx';

export function sharePage(config: any) {
  console.log(333);
  let { shareUrl, shareTitle, shareContent, shareImg, successCallback } = config;
  Promise.all([getWXconfig(window.location.href), importWxJS()])
    .then(([data]: [ShareConfig, {}]) => {
      let shareConfig = {
        debug: false,
        appId: data.app_id,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature
      };
      alert(window.wx);
      alert(window.wx.config);
      // if (window.wx && window.wx.config) {
      window.wx.config({
        ...shareConfig,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'hideOptionMenu',
          'showOptionMenu',
          'hideMenuItems',
          'showMenuItems'
        ]
      });
      window.wx.ready(function() {
        // 分享给好友
        window.wx.onMenuShareAppMessage({
          title: shareTitle, // 分享标题
          desc: shareContent, // 分享描述
          link: shareUrl, // 分享链接
          imgUrl: shareImg, // 分享图标
          // type: 'link',
          // dataUrl: '',
          success: function() {
            // 用户确认分享后执行的回调函数
            if (typeof successCallback === 'function') {
              successCallback();
            }
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        // 分享朋友圈
        window.wx.onMenuShareTimeline({
          title: shareContent, // 分享到朋友圈时取描述
          link: shareUrl, // 分享链接
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
            if (typeof successCallback === 'function') {
              successCallback();
            }
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
      // window.wx.config({
      //   ...shareConfig,
      //   jsApiList: [
      //     'onMenuShareTimeline',
      //     'onMenuShareAppMessage',
      //     'hideOptionMenu',
      //     'showOptionMenu',
      //     'hideMenuItems',
      //     'showMenuItems'
      //   ]
      // });
      // window.wx.ready(() => {
      //   window.wx.onMenuShareAppMessage(config);
      //   window.wx.onMenuShareTimeline(config);
      // });
      // }
    })
    .catch(e => {
      console.error('get config error:', e);
      return true;
    });
  // }
}

// /* 设置页面的分享配置 */
// export default function sharePage(show: boolean = true) {
//   // return function(target: React.ComponentClass) {
//     // let client = getClient();
//     // let cwm = target.prototype.componentWillMount;
//     // target.prototype.componentWillMount = function(...args) {
//       // if (client === 'wx') {
//         Promise.all([getWxConfig(), importWxJS()])
//           .then(([data]: [ShareConfig, {}]) => {
//             let shareConfig: Huiguo.WxConfig = {
//               debug: data.debug || false,
//               appId: data.app_id,
//               timestamp: data.timestamp,
//               nonceStr: data.noncestr,
//               signature: data.signature
//             };
//             if (window.wx && window.wx.config) {
//               window.wx.config({
//                 ...shareConfig,
//                 jsApiList: [
//                   'onMenuShareTimeline',
//                   'onMenuShareAppMessage',
//                   'hideOptionMenu',
//                   'showOptionMenu',
//                   'hideMenuItems',
//                   'showMenuItems'
//                 ]
//               });
//               window.wx.ready(() => {
//                 !show && window.wx.hideOptionMenu();
//                 if (typeof this.__share__ === 'function') {
//                   this.__share__();
//                 }
//               });
//             }
//           })
//           .catch(e => {
//             console.error(e);
//           });
//       }
//       if (typeof cwm === 'function') {
//         cwm.apply(this, args);
//       }
//     // };
//     target.prototype.shareInfo = function(data: Huiguo.WxShareData) {
//       if (isHGApp) {
//         let shareData = {
//           share_title: data.title,
//           share_content: data.desc,
//           appid: 'gh_c8bef5511cde',
//           share_url: data.link,
//           share_image: data.imgUrl,
//           share_webpager_url: data.link || 'www.huiguo.net',
//           share_platform: data.share_platform,
//           wxshare_type: data.wxshare_type,
//           share_sub_title: data.share_sub_title || ''
//         };
//         if (window.hgjsfunction && window.hgjsfunction.setJsContent) {
//           window.hgjsfunction.setJsContent('shareContent', JSON.stringify(shareData));
//         }
//         if (window.webkit && window.webkit.messageHandlers.setJsContent) {
//           window.webkit.messageHandlers.setJsContent.postMessage(
//             JSON.stringify({
//               eventName: 'shareContent',
//               data: JSON.stringify(shareData)
//             })
//           );
//         }
//         window.onHGAction = (eventName, result) => {
//           if (eventName === 'shareResult') {
//             if (typeof data.success === 'function' && result === '1') {
//               data.success();
//             }
//             if (typeof data.cancel === 'function' && result === '0') {
//               data.cancel();
//             }
//           }
//         };
//       } else if (client === 'wx') {
//         this.__share__ = function() {
//           window.wx.onMenuShareAppMessage(setMtaShareSuccess(data).ShareAppMessage);
//           window.wx.onMenuShareTimeline(setMtaShareSuccess(data).ShareTimeline);
//         };
//         if (window.wx) {
//           window.wx.onMenuShareAppMessage(setMtaShareSuccess(data).ShareAppMessage);
//           window.wx.onMenuShareTimeline(setMtaShareSuccess(data).ShareTimeline);
//         }
//       }
//     };
//   };
// }

// /** 处理分享成功后的回调，进行分享渠道埋点 */
// // const setMtaShareSuccess = (shareData: Huiguo.WxShareData) => {
// //   const ShareAppMessage = JSON.parse(JSON.stringify(shareData));
// //   const ShareTimeline = JSON.parse(JSON.stringify(shareData));
// //   let mtaAppMessage = () => {
// //     MtaH5.clickShare('wechat_friend');
// //     typeof shareData.success === 'function' && shareData.success();
// //   };
// //   let mtaTimeline = () => {
// //     MtaH5.clickShare('wechat_moments');
// //     typeof shareData.success === 'function' && shareData.success();
// //   };
// //   ShareAppMessage.success = mtaAppMessage;
// //   ShareTimeline.success = mtaTimeline;
// //   return {
// //     ShareAppMessage,
// //     ShareTimeline
// //   };
// // };
