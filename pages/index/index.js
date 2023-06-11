// index.js
// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var app = getApp()
Page({
    data: {
        onaddlotbtn: false,
        secretInput: false,
        secret: [],
        avatarUrl: defaultAvatarUrl,
        nickname: '',
        hasUserInfo: false,
    },
    onLoad(options) {
        if(wx.getStorageSync('avatarUrl')&&wx.getStorageSync('nickname'))
        {
            
            this.setData({
                hasUserInfo:true,
                avatarUrl:wx.getStorageSync('avatarUrl'),
                nickname:wx.getStorageSync('nickname')
            })
        }
        const myData = {
            username: wx.getStorageSync('nickname')
        }
        wx.request({
            url: 'https://lottery.ptianya.top/wx/username',
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
        wx.hideHomeButton();
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
        const _this = this;
        if (this.data.secret.length < 4) {
            wx.showToast({
                title: '请填写完整哦',
                icon: 'error',
                duration: 2000,
            })
            return;
        }
        wx.sendSocketMessage({
            data: '',
            success() {
                wx.request({
                    url: 'https://lottery.ptianya.top/lottery/' + _this.data.secret.join(''),
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
                            wx.request({
                                url: 'https://lottery.ptianya.top/lottery/' + res.data.data + '/info',
                                method: 'GET',
                                success(res) {
                                    app.globalData.desc=res.data.data.desc;
                                    // wx.setStorageSync('desc', res.data.data.desc);
                                }
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
            fail() {
                wx.connectSocket({
                    url: 'wss://ws.l.ptianya.top/ws',
                    protocols: [wx.getStorageSync('access_token')],
                })
                wx.request({
                    url: 'https://lottery.ptianya.top/lottery/' + _this.data.secret.join(''),
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
                            wx.request({
                                url: 'https://lottery.ptianya.top/lottery/' + res.data.data + '/info',
                                method: 'GET',
                                success(res) {
                                    app.globalData.desc=res.data.data.desc;
                                    // wx.setStorageSync('desc', res.data.data.desc);
                                }
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
            }
        })
    },
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl: avatarUrl,
        })
        wx.setStorageSync('avatarUrl', this.data.avatarUrl);
    },
    onInputNickName(e) {
        this.setData({
            nickname: e.detail.value,
        })
        wx.setStorageSync('nickname', this.data.nickname);
    },
    onFinishClick() {
        if (this.data.nickname!='' && this.data.avatarUrl != '') {
            wx.showToast({
                title: '填写成功',
                icon: 'success',
                duration: 1000,
            })
            this.setData({
                hasUserInfo:true,
            })
        } else {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'error',
                duration: 1000,
            })
        }
        
    },
})