const { timestampToTime } = require("../../utils/util");

Page({

    data: {
        results: []
    },
    onLoad(options) {
        console.log(options.id);
        var _this = this;
        wx.request({
            url: 'http://47.98.33.231:10096/lottery/' + options.id + '/create/results',
            method: 'GET',
            header: {
                Authorization: wx.getStorageSync('access_token')
            },
            success(res) {
                console.log(res);
                if(!res.data.data){
                    wx.showToast({
                        title: '没有任何抽奖！',
                        icon: 'error',
                        duration: 2000,
                    })
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 1000);
                    return;
                }
                var tmpResults = [];
                res.data.data.forEach(e => {
                    var {
                        username,
                        label,
                        time
                    } = e;
                    var obj = {
                        username: username,
                        label: label,
                        time:timestampToTime(time),
                    }
                    tmpResults.push(obj);
                });
                _this.setData({
                    results: tmpResults,
                })
            }
        })
    },
})