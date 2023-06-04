const {
    timestampToTime
} = require("../../utils/util");

Page({

    data: {
        results: [],
        role: '',
    },
    onLoad(options) {
        console.log(options.id);
        var _this = this;
        if (options.role == 'creator') {
            wx.request({
                url: 'https://lottery.ptianya.top/lottery/' + options.id + '/create/results',
                method: 'GET',
                header: {
                    Authorization: wx.getStorageSync('access_token')
                },
                success(res) {
                    console.log(res);
                    if (!res.data.data) {
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
                            time: timestampToTime(time),
                        }
                        tmpResults.push(obj);
                    });
                    _this.setData({
                        results: tmpResults.reverse(),
                        role: options.role
                    })
                }
            })
        }
        if (options.role == 'participant') {
            wx.request({
                url: 'https://lottery.ptianya.top/lottery/' + options.id + '/join/results',
                method: 'GET',
                header: {
                    Authorization: wx.getStorageSync('access_token')
                },
                success(res) {
                    console.log(res.data.data);
                    var list = [];
                    res.data.data.forEach(e => {
                        var {
                            LotteryID,
                            UserID,
                            Label,
                            Time
                        } = e;
                        var obj = {
                            LotteryID: LotteryID,
                            UserID: UserID,
                            Label:Label,
                            Time: timestampToTime(Time),
                        }
                        list.push(obj);
                    });
                    _this.setData({
                        results: list.reverse(),
                        role: options.role
                    })
                }
            })
        }
    },
})