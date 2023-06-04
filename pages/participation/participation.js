// pages/participation.js
Page({
    data: {
        mylots:[],
    },
    onLoad() {
        const _this=this;
        wx.request({
            url: 'http://47.98.33.231:10096/lottery/join',
            method:'GET',
            header:{
              Authorization:wx.getStorageSync('access_token')
            },
            success(res){
                console.log(res.data.data);
                var list=[];
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
                    mylots:list,
                })
            }
          })
    },
    onLotClick(e){
        var logId=e.currentTarget.dataset.id;
        console.log(logId)
        wx.navigateTo({
            url: '/pages/detailedLot/detailedLot?id='+logId+'&role=participant',
          })
    },
})