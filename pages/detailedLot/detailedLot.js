const {
    timestampToTime
} = require("../../utils/util");
import * as echarts from "../../components/echarts/echarts.min";

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    });
    canvas.setChart(chart);

    var option = {
        backgroundColor: 'rgba(255,255,255,0.8)',
        tooltip: {
            trigger: 'item'
        },
        legend: { //显示图例
            show: true,
            top: '5%',
            left: 'center'
        },
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },

            type: 'pie',
            center: ['50%', '60%'], //位置
            radius: ['20%', '30%'], //圈大小

            data: [{ //每一项
                value: 3,
                name: '数字农业 3个'
            }, {
                value: 2,
                name: '体育产业 2个'
            }, {
                value: 7,
                name: '乡村新业态 7个'
            }, {
                value: 3,
                name: '其他产业 3个'
            }]
        }]
    };
    chart.setOption(option);
    return chart;
}
Page({

    data: {
        results: [],
        role: '',
        ec: {
            onInit: initChart,
        }
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
                            Time,
                            Creator
                        } = e;
                        var obj = {
                            LotteryID: LotteryID,
                            UserID: UserID,
                            Label: Label,
                            Time: timestampToTime(Time),
                            Creator: Creator
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