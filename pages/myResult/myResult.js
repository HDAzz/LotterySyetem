// pages/myResult/myResult.js
const app=getApp();
Page({
    data: {
        result:'',
        desc:'',
        isLimited:false,
        showAgainBtn:false,
    },
    onLoad(options) {
        wx.showLoading({
            title: '加载中',
          })
          
          setTimeout(function () {
            wx.hideLoading()
          }, 300)
        var _this=this
        console.log(options.isLimited)
        _this.setData({
            result:options.result,
            desc:app.globalData.desc,
            isLimited:options.isLimited=='false'?false:true,
            showAgainBtn:options.isLimited=='false'?true:false
        })      
        console.log(app.globalData.desc)
        console.log(_this.data.showAgainBtn)
        wx.onSocketMessage((msg) => {
            var result=msg.data.replace(/\"/g,'').trim();
            console.log(result)
            wx.showLoading({
                title: '加载中',
              })
              
              setTimeout(function () {
                wx.hideLoading()
              }, 200)
            switch (result) {
                case '已达上限':
                    _this.setData({
                        isLimited:true,
                        showAgainBtn:false,
                        result:result,
                        desc:app.globalData.desc,
                    })
                    break;
            
                default:
                    _this.setData({
                        isLimited:false,
                        showAgainBtn:true,
                        result:result,
                        desc:app.globalData.desc,
                    })
                    break;
            }
        })
    },
    onClose(){
        wx.closeSocket()
    },
    onAgainBtn(){
         wx.sendSocketMessage({
            data: '',
            success() {
                wx.request({
                    url: 'https://lottery.ptianya.top/lottery/' + app.globalData.preSecret.join(''),
                    header: {
                        Authorization: wx.getStorageSync('access_token')
                    },
                    method: 'POST',
                    success(res) {
                            wx.request({
                                url: 'https://lottery.ptianya.top/lottery/' + res.data.data + '/info',
                                method: 'GET',
                                success(res) {
                                    app.globalData.desc=res.data.data.desc;
                                }
                            })
                        } 
                    }
                )
            },
            fail() {
                wx.connectSocket({
                    url: 'wss://ws.l.ptianya.top/ws',
                    protocols: [wx.getStorageSync('access_token')],
                })
                wx.request({
                    url: 'https://lottery.ptianya.top/lottery/' + app.globalData.preSecret.join(''),
                    header: {
                        Authorization: wx.getStorageSync('access_token')
                    },
                    method: 'POST',
                    success(res) {
                            wx.request({
                                url: 'https://lottery.ptianya.top/lottery/' + res.data.data + '/info',
                                method: 'GET',
                                success(res) {
                                    app.globalData.desc=res.data.data.desc;
                                }
                            })
                        } 
                    }
                )
            }
        })
    },
})