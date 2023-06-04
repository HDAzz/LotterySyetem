// pages/myLots/myLots.js
Page({
    data: {
        lotList: [],
    },
    onLoad() {
        const _this = this;
        wx.request({
            url: 'https://lottery.ptianya.top/lottery/create',
            method: 'GET',
            header: {
                Authorization: wx.getStorageSync('access_token')
            },
            success(res) {
                console.log(res.data);
                if (!res.data.data) {
                    wx.showToast({
                        title: "尚未创建抽签！",
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
                            desc,
                            type,
                            secret
                        } = e;
                        const lot = {
                            id: id,
                            title: title,
                            desc: desc,
                            type: type,
                            secret: secret,
                        }
                        list.push(lot);
                    });
                    _this.setData({
                        lotList: list.reverse(),
                    })
                    console.log(_this.data.lotList);
                }
            }
        })
    },
    detailedBtnClick(e) {
        console.log(e.currentTarget.dataset.id);
        var logId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/detailedLot/detailedLot?id=' + logId + '&role=creator',
        })
    },
})