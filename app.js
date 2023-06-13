// app.js

App({
    onShow() {
        wx.connectSocket({
            url: 'wss://ws.l.ptianya.top/ws',
            protocols: [wx.getStorageSync('access_token')],
        })
        wx.onSocketMessage((msg) => {
            var result = msg.data.replace(/\"/g, '').trim();
            console.log(result)
            wx.setStorageSync('result', result)
            switch (result) {
                case '已达上限':
                    wx.navigateTo({
                        url: '/pages/myResult/myResult?result=' + result + '&isLimited=true',
                    })
                    break;
                default:
                    wx.navigateTo({
                        url: '/pages/myResult/myResult?result=' + result + '&isLimited=false',
                    })
                    break;
            }

        })
    },
    onHide() {
        wx.closeSocket();
    },
    onLaunch() {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://lottery.ptianya.top/wx/code',
                        data: {
                            "wx_code": res.code
                        },
                        method: 'POST',
                        success: (res) => {
                            // console.log(res);
                            const access_token = res.data.data.access_token;
                            wx.removeStorageSync('access_token');
                            wx.setStorageSync('access_token', access_token);
                            this.globalData.access_token = access_token;
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
        wx.connectSocket({
            url: 'wss://ws.l.ptianya.top/ws',
            protocols: [wx.getStorageSync('access_token')],
        })

        setInterval(() => {
            wx.sendSocketMessage({
                data: "",
            })
        }, 30 * 1000);
    },
    globalData: {
        access_token: '',
        desc: '',
        preSecret: []
    },
})