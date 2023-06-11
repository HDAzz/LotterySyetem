// pages/myResult/myResult.js
const app=getApp();
Page({
    data: {
        result:'',
        desc:''
    },
    onLoad(options) {
        this.setData({
            result:options.result,
            desc:app.globalData.desc,
        })      
        console.log(app.globalData.desc)
    },
})