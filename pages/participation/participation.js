// pages/participation.js
Page({
    data: {
        mylots: [],
    },
    onLoad() {
        const _this = this;
        wx.request({
            url: 'https://lottery.ptianya.top/lottery/join',
            method: 'GET',
            header: {
                Authorization: wx.getStorageSync('access_token')
            },
            success(res) {
                console.log(res.data.data);
                if (!res.data.data) {
                    wx.showToast({
                        title: "尚未参与抽签！",
                        icon: 'error',
                        duration: 2000,
                    })
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 1000);
                } else {
                    var list = [];
                    res.data.data.forEach(e => {
                        const {
                            id,
                            title,
                        } = e;
                        const lot = {
                            id: id,
                            title: title,
                        }
                        list.push(lot);
                    });
                    _this.setData({
                        mylots: list.reverse(),
                    })
                }
            }
        })
    },
    onLotClick(e) {
        var logId = e.currentTarget.dataset.id;
        console.log(logId)
        wx.navigateTo({
            url: '/pages/detailedLot/detailedLot?id=' + logId + '&role=participant',
        })
    },
})