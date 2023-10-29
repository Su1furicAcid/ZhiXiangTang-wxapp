const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * @description: 微信api接口promisify
 * @param {string} apiName
 * @return {function}
 */
const promisify = apiName => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      apiName(Object.assign({}, options, { 
        success: resolve,
        fail: reject 
      }), ...params)
    })
  }
}

/**
 * @description: 批量promisify化
 * @param {object} apis
 * @return {object}
 */ 
const promisifyAll = (...apis) => {
  return (apis || [])
    .map(name => ({
      name,
      member: wx[name]
    }))
    .filter(t => typeof t.member === 'function')
    .reduce((r, t) => {
      r[t.name] = promisify(t.member)
      return r;
    }, {});
}

// 给外部调用的接口
const wxApi = promisifyAll(
  'showToast',
  'login',
  'showModal',
  'navigateTo',
  'switchTab',
  'authorize',
  'request'
)

module.exports = {
  formatTime,
  wxApi
}
