Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 转盘奖品背景
      bg: "http://r.photo.store.qq.com/psc?/V14ZaBeY40XWC8/45NBuzDIW489QBoVep5mcT0Lq.gBxwEb6.hf44ibdoBF*Yne9.pzFu6WW1t*k2C7iFgwK3jc0jMvFefvW0IfraslW4FNcfHPYyIdFLecyJ0!/r",
      // 转盘箭头抽奖按钮
      arrows: "http://r.photo.store.qq.com/psc?/V14ZaBeY40XWC8/45NBuzDIW489QBoVep5mcT0Lq.gBxwEb6.hf44ibdoA2KiCwrHNJS*10VP4yg3bnkt2TA7zugdvTHvyHaWr2uplgBObbdubFayYw6e*PbW0!/r",
      // 抽奖状态，是否转完了
      isTurnOver: true,
      // 转的总圈数，最后一圈可能不满
      num_total: 20
    },
  
    // 点击抽奖按钮
    lottery() {
      // 如果不在抽奖状态中，则执行抽奖旋转动画
      if (this.data.isTurnOver) {
        // 把抽奖状态改为未完成
        this.setData({
          isTurnOver: false
        })
        // 这里开始假设已经调取后端接口拿到抽奖后返回的ID
        let prize_id = 3;
        // 随机奖品效果
        // const rand = (m, n) => {
        //   return Math.ceil(Math.random() * (n - m + 1) + m - 1)
        // }
        // let prize_id = rand(1, 6)
        // 调用旋转动画方法
        this.rotate(prize_id)
      } else {
        wx.showToast({
          title: '请勿重复点击',
          icon: 'none'
        })
      }
    },
  
    // 旋转动画方法
    rotate(prize_id) {
      // 执行完动画所需要的时间
      let _duration = 10000;
      let animationRotate = wx.createAnimation({
        duration: _duration,
        timingFunction: 'ease', //动画以低速开始，然后加快，在结束前变慢
      })
      /*
       * 旋转的角度
       * 这转盘有6个奖项，所以一个奖项的度数为：360除以6等于60、
       * 要转完一圈 → 60 * 6
       * 为了让动画看起来舒服我设置了20圈 → 60 * 6 * 20
       * 又因为需要连贯抽取非第一次，所以二次抽奖时会在原来的圈数上自加，
       * 也就成了60 * 6 * num_total，num_total每转完一次都会叠加上自身
       * 又因为转盘是顺时针旋转的，默认指定奖品1
       * 所以需要减去 → 60 * (prize_id - 1) 方可在最后一圈转到对应的位置
       * 可以根据自己的设计稿奖品的个数进行调整
       * */
      let num_total = this.data.num_total;
      let angle = (60 * 6 * num_total) - 60 * (prize_id - 1);
      animationRotate.rotate(angle).step()
      this.setData({
        animationRotate: animationRotate.export()
      })
      // 设置倒计时，保证最后一圈执行完了，才更改状态
      setTimeout(() => {
        this.setData({
          isTurnOver: true,
          num_total: num_total + num_total
        })
      }, _duration)
    }
  
  })
  