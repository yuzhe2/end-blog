var express = require('express');
var router = express.Router();

var { getArticleComment, addArticleComment } = require('../model/comment/index')

// 登录
router.get('/getComment', async function(req, res, next) {
  let articleId = req._parsedOriginalUrl.query.split('=')[1]
  let commentList = await getArticleComment(articleId)
  res.send({
    code: 200,
    data: commentList,
    success: true
  })
});

router.post('/addComment', async function (req, res, next) {
  let { username } = req.auth
  let comment = req.body
  let data = await addArticleComment(comment, username)
  if (!data.success) {
    res.send({
      code: 500,
      data: null,
      success: false
    })
  } else {
    res.send({
      code: 200,
      data: data.data,
      success: true
    })
  }
})

module.exports = router;
