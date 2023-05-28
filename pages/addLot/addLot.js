let app = getApp();
Page({
    data: {
        isSubmit:false,
        lists: [{price:'一等奖',probability:'10'}, {price:'',probability:''}, {price:'',probability:''}], // 三个空行
        hasLimitLists: [{}, {}, {}]
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(this.data.lists);
        let {
            probabilityType,
            title,
            description,
            pricesHaveLimit
        } = e.detail.value;
        this.setData({
            isSubmit: true,
        })
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },
    add: function () {
        var lists = this.data.lists;
        var newData = {price:'',probability:''};
        lists.push(newData); // 实质是添加 lists[] 数组内容，使 for 循环多一次
        this.setData({
            lists: lists,
        })
    },

    del: function () {
        var lists = this.data.lists;
        lists.pop(); // 实质是删除 lists[] 数组内容，使 for 循环少一次
        this.setData({
            lists: lists,
        })
    },
    getPrice(e){
        console.log(e.detail)
    },
    getProbability(e){
        console.log(e.detail);
    }
})