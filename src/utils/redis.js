/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-10 15:46:11
 * @LastEditTime: 2019-06-10 23:28:42
 * @LastEditors: xg-a06
 */
const redis = require('redis')
const { REDIS_CONF } = require('../config')
const { debugLog, debugError } = require('../utils/log')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  debugError('redis error', err)
})
redisClient.auth(REDIS_CONF.password, function() {
  debugLog('通过认证')
})

module.exports = {
  set(key, val) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
  },
  get(key) {
    const promise = new Promise((resolve, reject) => {
      redisClient.get(key, (err, val) => {
        if (err) {
          reject(err)
          return
        }
        if (val == null) {
          resolve(null)
          return
        }
        try {
          resolve(JSON.parse(val))
        } catch (ex) {
          resolve(val)
        }
      })
    })
    return promise
  }
}
