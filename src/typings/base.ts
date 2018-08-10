export = Huiguo;
export as namespace Huiguo;

interface Good {
  level_type?: string;
  main_pic?: string;
  pic?: string;
  brand_name?: string;
  title?: string;
  title_long?: string;
  sale_price?: string;
  original_price?: string;
  profit?: string;
  profit_text?: string;
  sort?: string;
  goods_id: string;
  activity_id?: string;
  jump_url?: string;
  status_txt?: string;
  stime?: string;
  country?: {
    logo?: string;
  };
  icon?: {
    border_color?: string;
    text_color?: string;
    text?: string;
    bg_color?: string;
  };
  corner?: string;
  level_pic?: string;
  sale_txt?: string;
  flag?: Array<Flag>;
  flag_extend?: Array<Flag>;
  flag_action?: Array<Flag>;
  is_new?: string;
  share_info?: AppShareInfo;
  jump_from?: string;
}

interface Flag {
  border_color?: string;
  text_color?: string;
  text?: string;
  bg_color?: string;
  img_url?: string;
}

interface Level {
  user: {
    user_level: number;
  };
}

interface UserInfo {
  avatar?: string;
  email?: string;
  h_uid?: string;
  is_reg?: string;
  mobile?: string;
  sign?: string;
  uid?: string;
  user_level?: string;
  username?: string;
  weixin_pic?: string;
}

interface AppShareInfo {
  share_title?: string; //分享标题
  share_content?: string; //分享内容
  appid?: 'gh_c8bef5511cde'; //分享到小程序的appid
  share_url?: string; //分享链接
  share_image?: string; //分享图片地址
  share_webpager_url?: string;
  share_platform?: string; //[1,2,3] 需要展示的分享平台1: 微信好友、2: 二维码、3:微信朋友圈（一定要带上［］）
  wxshare_type?: string; //微信分享类型 0小程序、1图片、2网页、3文字，默认0 。0小程序分享在朋友圈显示是小程序图片， 1分享图片取值share_image
  share_direct?: string; //直接调起某一个分享，1:微信好友
  share_image_data?: string;
  share_sub_content?: string;
  share_sub_title?: string;
}

declare namespace Huiguo {
  export type ClientType = 'm' | 'wx' | 'ios' | 'android';
  export type GoodType = Good;
  export type LevelType = Level;
  export type UserInfoType = UserInfo;
  /* 微信 */
  export interface WxConfig {
    debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: string; // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见附录1
    jsApiList?: Array<string>; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  }

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

  export type AppShareData = AppShareInfo;

  export interface PayData {
    timestamp?: string;
    nonceStr?: string;
    package?: string;
    signType?: string;
    paySign?: string;
    success?: (res) => {};
    cancel?: (res) => {};
    fail?: (err) => {};
  }
}
