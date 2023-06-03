// pages/myLots/myLots.js
Page({
    data: {
        lotList: [],
    },
    onLoad() {
        const _this = this;
        wx.request({
            url: 'http://47.98.33.231:10096/lottery/create',
            method: 'GET',
            header: {
                Authorization: wx.getStorageSync('access_token')
            },
            success(res) {
                console.log(res.data);
                var list=[];
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
                    lotList:list,
                })
                console.log(_this.data.lotList);
            }
        })
    },
    detailedBtnClick(e){
        console.log(e.currentTarget.dataset.id);
        var logId=e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/pages/detailedLot/detailedLot?id='+logId,
        })
    },
})