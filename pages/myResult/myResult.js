// pages/myResult/myResult.js
Page({
    data: {
        result:''
    },
    onLoad(options) {
        this.setData({
            result:options.result,
        })
    },
})