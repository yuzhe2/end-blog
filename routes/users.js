var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

// 登录
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  if (username === 'yuzhe' && password === '666666yry') {
    var token = jwt.sign({ username }, 'sharedkey', { algorithm: 'HS256' })
    res.send({
      code: 200,
      data: {
        token,
        nickname: '愚者',
        portrait: 'https://p3-passport.byteimg.com/img/user-avatar/e73713ffe8002ab9958732cdd3df17af~180x180.awebp'
      }
    });
  }
});

// 获取用户信息
router.get('/get', function (req, res, next) {
  // 从token中拿到用户名信息
  let { username } = req.auth
  res.send({
    code: 200,
    data: {
      nickname: '愚者',
      portrait: 'https://p3-passport.byteimg.com/img/user-avatar/e73713ffe8002ab9958732cdd3df17af~180x180.awebp'
    }
  })
})

module.exports = router;
