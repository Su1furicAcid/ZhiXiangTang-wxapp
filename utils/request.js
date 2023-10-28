const app = getApp();
/**
  * @description: （重新）获取可用的access_token, 如果本地登录信息过期（refresh_token无效）则reject
  * @return {string} access_token
*/
const getToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let token = app.globalData.token || wx.getStorageSync("token", true);
      // 检查accesstoken是否为空
      if (token == "") {
        throw "InvalidToken";
      }
      // 检查是否过期
      let exp = weappJwt(token).exp;
      if (Date.now() / 1000 - exp >= 0) {
        // access_token过期
        wx.removeStorage({
          key: "token"
        });
        throw "TokenExpired";
      }
      // access_token有效
      app.globalData.token = token;
      resolve(token);
    } catch (error) {
      try {
        let refresh_token = wx.getStorageSync("refresh_token", true);
        if (refresh_token == "") {
          throw "UserNotLogin";
        }
        // 有refresh_token，刷新access_token
        wx.request({
          url: app.globalData.serverURL + "/refresh_expired_token/",
          method: "GET",
          data: {
            refresh_token: refresh_token,
            sid: app.globalData.sid
          },
          success: res => {
            if (res.statusCode == 200) {
              // 刷新成功
              if (res.data.token) {
                console.log("已使用refresh_token刷新access_token");
                app.globalData.token = res.data.token;
                wx.setStorageSync("token", res.data.token, true);
                resolve(res.data.token);
              } else if (res.data.msg == "token过期,请重新登录") {
                // refresh_token过期
                wx.removeStorageSync("refresh_token");

                // TODO: 重新登录
                
              } else {
                console.error(res.data.message);
                reject(res.data.message);
              }
            } else {
              console.error(res.data.message);
              reject(res.data.message);
            }
          },
          fail: err => {
            console.error(err.errMsg);
            reject(err.errMsg);
          }
        });
      } catch (error) {
        reject("用户未登录");
      }
    }
  });
}

/**
  * 发送网络请求
  * @param {Object} options { api, method, data = null, cache = false, noAuth = false, contentType = (options.method == "GET" ? "application/x-www-form-urlencoded" : "application/json") }
  * @returns {Promise} 服务器返回的data/错误信息
  *
*/
const request = async (options) => {
  let {
    api = "", method = "GET", data = null, cache = false, noAuth = false
  } = options;
  let header = {
    "Content-Type": options.contentType || (options.method == "GET" ? "application/x-www-form-urlencoded" : "application/json")
  };
  Object.assign(header, options.header);
  try {
    if (app.globalData.registered && !noAuth) {
      let token = await getToken();
      if (token != "") {
        Object.assign(header, {
          Authorization: token
        });
      }
    }
  } finally {
    if (method == "PATCH") {
      method = "POST";
      Object.assign(header, {
        "X-HTTP-Method-Override": "PATCH"
      });
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.serverURL + api,
        method: method,
        data: data,
        header: header,
        enableCache: cache,
        success: res => {
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {
            console.error(res);
            reject(res);
          }
        },
        fail: err => {
          console.error(err);
          reject(err.errMsg);
        }
      });
    });
  }
}