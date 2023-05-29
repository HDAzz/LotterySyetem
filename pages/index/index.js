// index.js
// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
    data: {
        avatarUrl: wx.getStorageSync('avatarUrl') ? wx.getStorageSync('avatarUrl') : defaultAvatarUrl,
        nickname: wx.getStorageSync('nickname'),
        theme: wx.getSystemInfoSync().theme,
        onaddlotbtn: false,
        secretInput: false,
        secret: [],
    },
    onLoad() {
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
        const myData = {
            username: wx.getStorageSync('nickname')
        }
        wx.request({
            url: 'http://47.98.33.231:10096/wx/username',
            header: {
                Authorization: wx.getStorageSync('access_token')
            },
            method: 'POST',
            data: myData,
            success(res) {
                // console.log(res);
            }
        })
    },
    onShow() {

    },
    addLogBtnTap() {
        this.setData({
            onaddlotbtn: true
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
    createNewLot() {
        wx.navigateTo({
            url: '../addLot/addLot',
        })
        this.setData({
            secretInput: false,
            onaddlotbtn: false,
        })
    },
    participateCurLot() {
        // console.log(this.data.secretInput);
        this.setData({
            secretInput: true,
        })

    },
    inputValue(e) {
        let value = e.detail.value;
        let arr = [...value];
        this.setData({
            secret: arr
        })
    },
    onClickFuncBackground() {
        this.setData({
            secretInput: false,
            onaddlotbtn: false,
            secret: [],
        })
    },
    onParticipateBtn() {
        const _this=this;
        if (this.data.secret.length < 4) {
            wx.showToast({
                title: '请填写完整哦',
                icon: 'error',
                duration: 2000,
            })
            return;
        }
        wx.request({
            url: 'http://47.98.33.231:10096/lottery/' + this.data.secret.join(''),
            header: {
                Authorization: wx.getStorageSync('access_token')
            },
            method: 'POST',
            success(res) {
                console.log(res);
                if (res.data.error == 0) {
                    _this.setData({
                        secretInput: false,
                        onaddlotbtn: false,
                        secret: [],
                    })
                } else if (res.data.error == 400) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'error',
                        duration: 2000,
                    })
                }
            }
        })

    },
})