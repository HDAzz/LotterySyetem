// pages/myLots/myLots.js
import Dialog from '@vant/weapp/dialog/dialog';

Dialog.confirm({
        title: '标题',
        message: '弹窗内容',
    })
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });

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
    onDeleteIcon(e) {
        Dialog.confirm({
                title: '你是故意的还是不小心的',
                message: '是否需要删除',
            })
            .then(() => {
                // on confirm
                const _this = this;
                wx.request({
                    url: 'https://lottery.ptianya.top/lottery/' + e.currentTarget.dataset.id,
                    method: 'DELETE',
                    header: {
                        Authorization: wx.getStorageSync('access_token'),
                    },
                    success(res) {
                        console.log("删除成功")
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
                                        title: "抽签记录已全无",
                                        icon: 'error',
                                        duration: 2000,
                                    })
                                    setTimeout(() => {
                                        wx.navigateBack();
                                    }, 1000);
                                } else {
                                    wx.showToast({
                                        title: "真的删掉了诶",
                                        icon: 'error',
                                        duration: 2000,
                                    })
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
                    }
                })
            })
            .catch(() => {
                // on cancel
                wx.showToast({
                    title: "下次不要点错！",
                    icon: 'error',
                    duration: 2000,
                })
            });

    }
})