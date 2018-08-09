export function isWifi() {
  var wifi: boolean = true;
  var ua: string = window.navigator.userAgent || '';
  // var con = window.Navigator.connection;
  // 如果是微信
  if (/MicroMessenger/.test(ua)) {
    // 如果是微信6.0以上版本，用UA来判断
    if (/NetType/.test(ua)) {
      let curUa = ua.match(/NetType\/(\S*)$/);
      if (curUa && curUa[1] != 'WIFI') {
        wifi = false;
      }
      // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
    }
    // else {
    //   document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //     window.WeixinJSBridge.invoke('getNetworkType',(e)=> {
    //       if (e.err_msg != 'network_type:wifi') {
    //         wifi = false;
    //       }
    //     });
    //   });
    // }
    //   // 如果支持navigator.connection
    // } else if (con) {
    //   var network = con.type;
    //   if (network != 'wifi' && network != '2' && network != 'unknown') {
    //     // unknown是为了兼容Chrome Canary
    //     wifi = false;
    //   }
  }
  return wifi;
}
export function getClient() {
  let client = 'm';
  let ua = navigator.userAgent;
  if (ua.indexOf('MicroMessenger') > -1) {
    client = 'wx';
  }
  return client;
}