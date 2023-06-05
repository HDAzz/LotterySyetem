const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
    data: {
        avatarUrl: defaultAvatarUrl,
        theme: wx.getSystemInfoSync().theme,
        nickname: '',
    },
    onLoad() {
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
        if(wx.getStorageSync('avatarUrl')&&wx.getStorageSync('nickname')){
            wx.navigateTo({
              url: '/pages/index/index',
            })
        }
        if(wx.getStorageSync('avatarUrl')==defaultAvatarUrl){
            this.onChooseAvatar();
        }
    },
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl:avatarUrl,
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
        if (this.data.nickname && this.data.avatarUrl != defaultAvatarUrl) {
            wx.showToast({
                title: '填写成功',
                icon: 'success',
                duration: 2000,
            })
            setTimeout(() => {
                wx.redirectTo({
                    url: '../index/index',
                })
            }, 500);

        } else {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'error',
                duration: 2000,
            })
        }
    },
})