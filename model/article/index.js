var { userModel, articleModel, dictModel, commentModel } = require('../../mongo/index')

// 查询出首页的信息
async function findHomeArticle () {
  let sortArr = await dictModel.find({})
  let articleList = await articleModel.find({})
  articleList = JSON.parse(JSON.stringify(articleList))
  let articleData = articleList.map(async (val) => {
    let userInfo = await userModel.findOne({ userId: val.userId })
    let sortList = []
    for (let i = 0; i < val.sort.length; i++) {
      let sortText = sortArr.find(sort => sort.value === val.sort[i]).text
      sortList.push({ id: val.sort[i], text: sortText })
    }
    val.sortList = sortList
    val.author = userInfo.nickname
    delete val.__v
    delete val._id
    delete val.sort
    return val
  })
  return articleData
}

// 查询文章的详情
async function findArticleDetail (articleId) {
  let articleData = await articleModel.findOne({ articleId })
  let userInfo = await userModel.findOne({ userId: articleData.userId })
  let commentNum = (await commentModel.find({ article: articleId })).length
  return Object.assign({}, articleData._doc, { nickname: userInfo.nickname, commentNum, portrait: userInfo.avatar })
}

// 添加文章
async function addArticle (article, username) {
  let len = (await articleModel.find({})).length
  let userInfo = await userModel.findOne({ username })
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

// 增加文章的阅读量
function addViewCount (articleId) {
  return articleModel.findOneAndUpdate({ articleId }, {  $inc: {
    viewCount: 1
  }})
}

module.exports = {
  findHomeArticle,
  findArticleDetail,
  addArticle,
  addViewCount
}