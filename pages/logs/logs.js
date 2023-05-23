// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    log:''
  },
  onLoad() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return {
    //       date: util.formatTime(new Date(log)),
    //       timeStamp: log
    //     }
    //   })
    // })
  },
  houduanButton:function(){
      var that = this
      wx.request({
        url: 'http://47.98.33.231:10096/name?name=Tony',
        method:'GET',
        success:function(res){
            console.log(res.data);
            that.setData({
                log:res.data.data.message,
            })
        }
      })
  }
})  
