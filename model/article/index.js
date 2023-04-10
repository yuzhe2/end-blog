var { userModel, articleModel } = require('../../mongo/index')

// 查询出首页的信息
function findHomeArticle () {
  return articleModel.find({})
}

function findArticleDetail (articleId) {
  return articleModel.find({ articleId })
}

async function addArticle (article, username) {
  let len = (await articleModel.find({})).length
  console.log(len)
  let userInfo = await userModel.find({ username })
  let data = {}
  data.articleId = `${len + 1}`
  data.content = article.content
  data.description = article.description
  data.userId = userInfo.userId
  data.sort = article.sort
  data.viewCount = 0
  data.commentCount = 0
  data.likeCount = 0
  data.createTime = new Date()
  data.title = article.title
  data.type = article.type
  console.log(data)
  return articleModel.create(data)
}

module.exports = {
  findHomeArticle,
  findArticleDetail,
  addArticle
}