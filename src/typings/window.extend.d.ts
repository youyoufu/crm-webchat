/* 微信分享数据 */
export interface WxShareData {
  title: string; // 分享标题
  link: string; // 分享链接，该链接域名必须与当前企业的可信域名一致
  imgUrl: string; // 分享图标
  desc?: string; // 分享描述,分享给朋友需传递
  share_platform?: string; //兼容app分享数据
  wxshare_type?: string; //兼容app分享数据
  share_sub_title?: string; //兼容app分享数据
  success?: () => void; // 用户确认分享后执行的回调函数
  cancel?: () => void; // 用户取消分享后执行的回调函数
}
declare global {
  interface Document {
    readonly attachEvent: (e: string, cb: () => void) => void;
  }
  interface Window {
    addEventListener<K extends keyof WindowEventMap>(
      type: K,
      listener: (this: Window, ev: WindowEventMap[K]) => any,
      options?: boolean | { capture?: boolean; once?: boolean; passive?: boolean }
    ): void;
    readonly webviewClickListener: {
      setShareBtnVisible: (b: boolean) => void;
      setShareContent: (
        shareUrl: string,
        shareTitle: string,
        shareContent: string,
        shareImgUrl: string,
        platforms: string,
        wxImgUrl: string
      ) => void;
    };
    readonly hotcss: {
      px2rem: (px: number, designWidth?: number) => number;
      rem2px: (rem: number, designWidth?: number) => number;
      isAndroid: boolean;
      isIPhone: boolean;
      dpr: number;
    };
    readonly hgjsfunction: {
      setJsContent: (funName: string, funParam?: string) => void;
      jsAppPayCheck: (param: string) => void;
    };
    readonly Navigator: {
      connection: string;
    };
    readonly Image: () => void;
    onHGAction: (eventName: string, data: any) => void;
    jsAppPayCheckCallback: (res: boolean) => any;
    readonly WeixinJSBridge: {
      invoke: (
        type: string,
        config: {
          appId: string;
          timeStamp: string;
          nonceStr: string;
          package: string;
          signType: string;
          paySign: string;
        },
        success: (res: { err_msg?: string }) => void
      ) => void;
    };
    readonly wx: {
      ready: (cb: () => void) => void;
      config: (opt: {}) => void;
      uploadImage: (data: {}) => void;
      chooseImage: (data: {}) => void;
      getNetworkType: (data: {}) => void;
      downloadImage: (data: {}) => void;
      getLocalImgData: (data: {}) => void;
      hideMenuItems: (opt: { menuList: Array<string> }) => void;
      onMenuShareAppMessage: (data: WxShareData) => void;
      onMenuShareTimeline: (data: WxShareData) => void;
      hideOptionMenu: () => void;
    };
    readonly webkit: {
      messageHandlers: {
        setJsContent: {
          postMessage: (s: string) => void;
        };
        jsAppPayCheck: {
          postMessage: (param: string) => void;
        };
      };
    };
  }
}

export default Window;
