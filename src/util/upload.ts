import { importWxJS, ShareConfig, getWXconfig } from '@/util/importwx';

export function UploadImg() {
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
          jsApiList: ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData']
        });
        window.wx.ready(() => {
          window.wx.chooseImage({
            count: 1, //设置一次能选择的图片的数量
            sizeType: ['compressed'], //'original',  指定是原图还是压缩,默认二者都有
            sourceType: ['album'], //, 'camera'可以指定来源是相册还是相机,默认二者都有
            success: function(res: any) {
              console.log(res);
              //微信返回了一个资源对象
              //res.localIds 是一个数组　保存了用户一次性选择的所有图片的信息
              // images.localId = res.localIds; //把图片的路径保存在images[localId]中--图片本地的id信息，用于上传图片到微信浏览器时使用
              //  her.upNum+=res.localIds.length;
              window.wx.uploadImage({
                localId: res.localIds, //图片在本地的id
                success: function(res1: any) {
                  //上传图片到微信成功的回调函数   会返回一个媒体对象  存储了图片在微信的id
                  // images.serverId.push(res.serverId);
                  window.wx.downloadImage({
                    serverId: res1.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function(res2: any) {
                      var localId = res2.localId; // 返回图片下载后的本地ID
                      //通过下载的本地的ID获取的图片的base64数据，通过对数据的转换进行图片的保存
                      window.wx.getLocalImgData({
                        localId: localId, // 图片的localID
                        success: function(res3: any) {
                          var localData = res3.localData; // localData是图片的base64数据，可以用img标签显示
                          console.log(localData);
                        }
                      });
                    }
                  });
                },
                fail: function(res: {}) {
                  alert(JSON.stringify(res));
                }
              });
            },
            fail: function(err: string) {
              console.log('UploadIng error:', err);
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
// function ulLoadToWechat(localId: string) {}
// function UploadIng() {
//   //拍照或从手机相册中选图接口
//   window.wx.chooseImage({
//     count: 1, //设置一次能选择的图片的数量
//     sizeType: ['compressed'], //'original',  指定是原图还是压缩,默认二者都有
//     sourceType: ['album', 'camera'], //可以指定来源是相册还是相机,默认二者都有
//     success: function(res: {}) {
//       console.log(res);
//       //微信返回了一个资源对象
//       //res.localIds 是一个数组　保存了用户一次性选择的所有图片的信息
//       // images.localId = res.localIds; //把图片的路径保存在images[localId]中--图片本地的id信息，用于上传图片到微信浏览器时使用
//       //  her.upNum+=res.localIds.length;
//       // ulLoadToWechat(0); //把这些图片上传到微信服务器  一张一张的上传
//     },
//     fail: function(err: string) {
//       console.log('UploadIng error:', err);
//     }
//   });
// }
// export function upLoad() {
//   Promise.all([getWXconfig(window.location.href), importWxJS()])
//     .then(([data]) => {
//       let shareConfig = {
//         debug: true,
//         appId: data.app_id,
//         timestamp: data.timestamp,
//         nonceStr: data.noncestr,
//         signature: data.signature
//       };

//       if (window.wx && window.wx.config) {
//         window.wx.config({
//           ...shareConfig,
//           jsApiList: ['chooseImage', 'uploadImage'],
//           fail(err: string) {
//             console.log('config error:' + err);
//           },
//           success(res: {}) {
//             console.log('config success:' + res);
//             window.wx.ready(() => {
//               if (typeof UploadIng === 'function') {
//                 UploadIng();
//               }
//             });
//           }
//         });
//       }
//     })
//     .catch(e => {
//       console.error('get config error:', e);
//     });
// }

// // wx.ready(function () {
// //     wx.checkJsApi({
// //         jsApiList: [
// //             'chooseImage',
// //             'previewImage',
// //             'uploadImage',
// //             'downloadImage'
// //         ],
// //         success: function (res) {
// //             //alert(JSON.stringify(res));
// //             //alert(JSON.stringify(res.checkResult.getLocation));
// //             if (res.checkResult.getLocation == false) {
// //                 alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
// //                 return;
// //             }else{
// //                 wxChooseImage();
// //             }
// //         }
// //     });
// // });
// // wx.error(function(res){
// //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
// //     alert("验证失败，请重试！");
// //     wx.closeWindow();
// // });

// // });
// // var images = {
// // localId: [],
// // serverId: []
// // };
// // //拍照或从手机相册中选图接口
// // function wxChooseImage() {

// // wx.chooseImage({
// //     success: function(res) {
// //         images.localId = res.localIds;
// //         alert('已选择 ' + res.localIds.length + ' 张图片');

// //         if (images.localId.length == 0) {
// //             alert('请先使用 chooseImage 接口选择图片');
// //             return;
// //         }
// //         var i = 0, length = images.localId.length;
// //         images.serverId = [];
// //         function upload() {
// //             //图片上传
// //             wx.uploadImage({
// //                 localId: images.localId[i],
// //                 success: function(res) {
// //                     i++;
// //                     images.serverId.push(res.serverId);
// //                     //图片上传完成之后，进行图片的下载，图片上传完成之后会返回一个在腾讯服务器的存放的图片的ID--->serverId
// //                     wx.downloadImage({
// //                         serverId: res.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
// //                         isShowProgressTips: 1, // 默认为1，显示进度提示
// //                         success: function (res) {
// //                             var localId = res.localId; // 返回图片下载后的本地ID

// //                             //通过下载的本地的ID获取的图片的base64数据，通过对数据的转换进行图片的保存
// //                             wx.getLocalImgData({
// //                                 localId: localId, // 图片的localID
// //                                 success: function (res) {
// //                                     var localData = res.localData; // localData是图片的base64数据，可以用img标签显示

// //                                     //通过ajax来将base64数据转换成图片保存在本地
// //                                     $.ajax({
// //                                         url: "./demodeal.php",
// //                                         type: "post",
// //                                         async: "false",
// //                                         dataType: "html",
// //                                         data: {
// //                                             localData: localData,
// //                                         },
// //                                         success: function (data) {
// //                                            var  mydata = JSON.parse(data);
// //                                             if(mydata.code == '0001'){
// //                                                 alert('已上传：' + i + '/' + length);
// //                                             }else{
// //                                                 alert('第：' + i + '/' + length+'上传失败');
// //                                             }
// //                                         },
// //                                         error: function (XMLHttpRequest, textStatus, errorThrown) {
// //                                             alert(errorThrown);
// //                                         },
// //                                     });
// //                                     $("#pic").append("<img src='"+localData+"'>");
// //                                 }
// //                             });
// //                         }
// //                     });
// //                     if (i < length) {
// //                         upload();
// //                     }
// //                 },
// //                 fail: function(res) {
// //                     alert(JSON.stringify(res));
// //                 }
// //             });
// //         }
// //         upload();
// //     }
// // });

// // }
