// pages/myResult/myResult.js
Page({
    data: {
        result:'',
        desc:''
    },
    onLoad(options) {
        this.setData({
            result:options.result,
            desc:wx.getStorageSync('desc')
        })      
    },
})