// index.js
// 获取应用实例
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button. open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
        avatarUrl: defaultAvatarUrl,
        theme: wx.getSystemInfoSync().theme,
    },
    onLoad() {
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
    },
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl,
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
    onLoad() {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
})