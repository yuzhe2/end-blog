var express = require('express');
var router = express.Router();
var { findHomeArticle, findArticleDetail, addArticle, addViewCount } = require('../model/article/index')

router.get('/getList', async function(req, res, next) {
  let articleList = await findHomeArticle()
  articleList = await Promise.all(articleList)
  res.send({
    code: 200,
    success: true,
    data: articleList
  })
});

router.get('/getDetail', async function(req, res, next) {
  let articleId = req._parsedOriginalUrl.query.split('=')[1]
  let articleDetail = await findArticleDetail(articleId)
  res.send({
    code: 200,
    success: true,
    data: articleDetail
  }) 
})

router.post('/addArticle', async function (req, res, next) {
  let articleData = req.body
  let { username } = req.auth
  await addArticle(articleData, username)
  res.send({
    code: 200,
    success: true
  }) 
})

router.post('/addView', async function (req, res, next) {
  let { articleId } = req.body
  await addViewCount(articleId)
  res.send({
    code: 200,
    success: true
  }) 
})

module.exports = router;
