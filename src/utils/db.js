/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-10 15:46:06
 * @LastEditTime: 2019-06-10 16:31:17
 * @LastEditors: xg-a06
 */
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config')

const pool = mysql.createPool(MYSQL_CONF)

exports.exec = sql => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) {
        reject(err)
      }
      con.query(sql, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
        con.release()
      })
    })
  })
}

exports.escape = mysql.escape
