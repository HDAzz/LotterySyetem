let app = getApp();
Page({
    data: {
        isSubmit: false,
        lists: [{
            price: '一等奖',
            probability: '10',
            id: ''
        }], // 三个空行
        hasLimitLists: [],
        secret: [],
        islimited: false,
        tableText: '概率%'
    },
    formSubmit: function (e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value);
        //console.log(this.data.lists);
        //解构赋值表单
        let {
            probabilityType,
            title,
            description,
        } = e.detail.value;
        var num_type;
        switch (probabilityType) {
            case "概率模型":
                num_type = this.data.islimited ? 2 : 0;
                break;
            case "定量模型":
                num_type = 1;
                break;
            default:
                break;
        }
        var labels = [];
        this.data.lists.forEach(e => {
            var label = {
                name: e.price,
                count: Number(e.probability),
                id: Number(e.id)
            }
            labels.push(label);
        });
        var tops = [];
        this.data.hasLimitLists.forEach(e => {
            var top = {
                count: Number(e.num),
                id: Number(e.id)
            }
            tops.push(top);
        });
        const myData = {
            title: title,
            desc: description,
            num_type: num_type,
            labels: labels,
            tops: tops,
            secret: (this.data.secret).join('')
        }
        if (myData.title == '' || myData.labels == [] || myData.secret == []) {
            wx.showToast({
                title: '请完整填写表格',
                icon: 'error',
                duration: 2000,
            })
            return;
        }
        wx.showToast({
            title: '创建成功！',
            icon: 'success',
            duration: 2000,
        })
        console.log(myData)
        wx.request({
            url: 'http://47.98.33.231:10096/lottery',
            method: 'POST',
            header: {
                'Authorization': wx.getStorageSync('access_token'),
            },
            data: myData,
            success(res) {
                console.log(res);
            }
        })
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
        this.data.lists[e.target.id].id = e.target.id;
        // console.log(this.data.lists)
    },
    getProbability(e) {
        this.data.lists[e.target.id].probability = e.detail.value;
        // console.log(this.data.lists)
    },
    getLimitPrice(e) {
        this.data.hasLimitLists[e.target.id].price = e.detail.value;
        this.data.hasLimitLists[e.target.id].id = e.target.id;
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
    limitChange(e) {
        console.log(e.detail.value);
        this.setData({
            islimited: e.detail.value,
        })
    },
    onModelChange(e) {
        if (e.detail.value == "定量模型")
            this.setData({
                tableText: '数量（个）'
            })
        else {
            this.setData({
                tableText: '概率%'
            })
        }
    }
})