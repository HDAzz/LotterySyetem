// pages/participation.js
Page({
    data: {

    },
    onLoad() {
        wx.request({
            url: 'http://47.98.33.231:10096/lottery/join',
            method:'GET',
            header:{
              Authorization:wx.getStorageSync('access_token')
            },
            success(res){
                console.log(res.data);
            }
          })
    },
})