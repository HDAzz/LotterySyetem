// app.js


App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'http://47.98.33.231:10096/wx/code',
                        data: {
                            "wx_code": res.code
                        },
                        method:'POST',
                        success:(res)=>{
                            console.log(res);
                            const access_token=res.data.data.access_token;
                            wx.removeStorageSync('access_token');
                            wx.setStorageSync('access_token', access_token);
                            this.globalData.access_token=access_token;
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
        wx.connectSocket({
          url: 'wss://ws.l.ptianya.top/ws',
          protocols:[wx.getStorageSync('access_token')],
        })
    },
    globalData: {
        userInfo: null,
        access_token: '',
    },
})