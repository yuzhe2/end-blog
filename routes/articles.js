var express = require('express');
var router = express.Router();
var { findHomeArticle, findArticleDetail, addArticle } = require('../model/article/index')

router.get('/getList', async function(req, res, next) {
  let articleList = await findHomeArticle()
  return {
    code: 200,
    success: true,
    data: articleList
  }
});

router.get('/getDetail', async function(req, res, next) {
  let articleId = req._parsedOriginalUrl.query.split('=')[1]
  let articleDetail = await findArticleDetail(articleId)
  return {
    code: 200,
    success: true,
    data: articleDetail
  }
})

router.post('/addArticle', async function (req, res, next) {
  let articleData = req.body
  let { username } = req.auth
  await addArticle(articleData, username)
  console.log(3333333333)
  res.send({
    code: 200,
    success: true
  }) 
})

module.exports = router;
