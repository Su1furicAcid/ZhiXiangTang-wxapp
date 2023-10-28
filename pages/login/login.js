// pages/login/login.js
import { wxApi } from '../../utils/util.js'
Page({
  data: {
    // 轮播图数据
    swiperList: [
      '/images/swiper1.jpg',
      '/images/swiper2.jpg'
    ],
    // 首页背景图片
    homeBg: '/images/homeBg.jpg',
    // 首页标题
    homeTitle: '/images/homeTitle.png'
  },
  /**
   * @description: 微信登录
   * @return {void}
   */
  async wxLogin() {
    let loginState = false;
    // 唤起微信登录
    await wxApi.login()
      .then(res => {
        console.log('登录成功', res);
        let code = res.code;

        // TODO: 获取用户信息

        loginState = true;
      })
      .catch(err => {
        console.log('登录失败', err);
      })
    if (!loginState) {
      wxApi.showToast({
        title: '登录失败, 请联系管理员',
        icon: 'error'
      });
      return;
    }
    // 跳转到首页
    wxApi.switchTab({
      url: '/pages/index/index'
    });
  }
})