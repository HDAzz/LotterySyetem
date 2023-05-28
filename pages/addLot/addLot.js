let app = getApp();
Page({
    data: {
        isSubmit: false,
        lists: [{
            price: '一等奖',
            probability: '10'
        }, {
            price: '',
            probability: ''
        }, {
            price: '',
            probability: ''
        }], // 三个空行
        curRow: 0,
        hasLimitLists: [{
            price: '',
            num: ''
        }, {}, {}],
        secret: [],
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
    add: function (e) {
        if (e.target.id == 'normal') {
            var lists = this.data.lists;
            var newData = {
                price: '',
                probability: ''
            };
            lists.push(newData); // 实质是添加 lists[] 数组内容，使 for 循环多一次
            this.setData({
                lists: lists,
            })
        }
        if (e.target.id == 'limited') {
            var lists = this.data.hasLimitLists;
            var newData = {
                price: '',
                num: ''
            };
            lists.push(newData); // 实质是添加 lists[] 数组内容，使 for 循环多一次
            this.setData({
                hasLimitLists: lists,
            })
        }
    },

    del: function (e) {
        if (e.target.id == 'normal') {
            var lists = this.data.lists;
            lists.pop(); // 实质是删除 lists[] 数组内容，使 for 循环少一次
            this.setData({
                lists: lists,
            })
        }
        if (e.target.id == 'limited') {
            var lists = this.data.hasLimitLists;
            lists.pop(); // 实质是删除 lists[] 数组内容，使 for 循环少一次
            this.setData({
                hasLimitLists: lists,
            })
        }
    },
    getPrice(e) {
        this.data.lists[e.target.id].price = e.detail.value;
        // console.log(this.data.lists)
    },
    getProbability(e) {
        this.data.lists[e.target.id].probability = e.detail.value;
        // console.log(this.data.lists)
    },
    getLimitPrice(e) {
        this.data.hasLimitLists[e.target.id].price = e.detail.value;
    },
    getLimitNum(e) {
        this.data.hasLimitLists[e.target.id].num = e.detail.value;
        // console.log(this.data.hasLimitLists)
    },
    inputValue(e) {
        let value = e.detail.value;
        let arr = [...value];
        this.setData({
            secret: arr
        })
    },
})