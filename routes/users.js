var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var { getUserInfo } = require('../model/user/index')

// 登录
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body
  let userInfo = await getUserInfo({  username, password })
  if (userInfo) {
    var token = jwt.sign({ username }, 'sharedkey', { algorithm: 'HS256' })
    let userData = {
      nickname: userInfo.nickname,
      portrait: userInfo.avatar
    }
    res.send({
      code: 200,
      data: {
        token,
       ...userData
      },
      success: true
    });
  } else {
    res.send({
      code: 501,
      message: '用户不存在',
      success: false
    })
  }
});

// 获取用户信息
router.get('/get', async function (req, res, next) {
  // 从token中拿到用户名信息
  let { username } = req.auth
  let userInfo = await getUserInfo({  username })
  let data = {
    nickname: userInfo.nickname,
    portrait: userInfo.avatar
  }
  res.send({
    code: 200,
    data,
    success: true
  })
})

module.exports = router;
