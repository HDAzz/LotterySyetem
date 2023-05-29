// index.js
// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button. open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
        avatarUrl: wx.getStorageSync('avatarUrl')?wx.getStorageSync('avatarUrl'):defaultAvatarUrl,
        nickname:wx.getStorageSync('nickname'),
        theme: wx.getSystemInfoSync().theme,
    },
    onLoad() {
        // console.log(wx.getStorageSync('nickname'));
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
        const myData={
            username:wx.getStorageSync('nickname')
        }
        wx.request({
          url: 'http://47.98.33.231:10096/wx/username',
          header:{
            Authorization:wx.getStorageSync('access_token')
          },
          method:'POST',
          data:myData,
          success(res){
              console.log(res);
          }
        })
    },
    addLogBtnTap() {
        wx.navigateTo({
            url: '../addLot/addLot',
        })
    },
    participationBtnTap() {
        wx.navigateTo({
            url: '../participation/participation',
        })
    },
    myLogsBtnTap() {
        wx.navigateTo({
            url: '../myLots/myLots',
        })
    },
    addTemplateBtnTap() {
        wx.navigateTo({
            url: '../addTemplate/addTemplate',
        })
    },
    // onLoad() {
    //     if (wx.getUserProfile) {
    //         this.setData({
    //             canIUseGetUserProfile: true
    //         })
    //     }
    // },
    // getUserProfile(e) {
    //     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //     wx.getUserProfile({
    //         desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //         success: (res) => {
    //             console.log(res)
    //             this.setData({
    //                 userInfo: res.userInfo,
    //                 hasUserInfo: true
    //             })
    //         }
    //     })
    // },
})