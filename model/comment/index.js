var { commentModel }  = require('../../mongo')
var { getUserInfoById, getUserInfo } = require('../user/index')

async function getArticleComment (articleId) {
  let articleComments = await commentModel.find({ article: articleId })
  let commentList = []
  // 组装一级评论
  for (let i = 0; i < articleComments.length; i++) {
    let parentId = articleComments[i].parentId
    if (parentId === null) {
      let userId = articleComments[i].userId
      let userInfo = await getUserInfoById(userId)
      let comment = {
        commentId: articleComments[i].commentId,
        parentId: null,
        userId: articleComments[i].userId,
        nickname: userInfo.nickname,
        content: articleComments[i].content,
        accordContent: null,
        portrait: userInfo.avatar,
        children: []
      }
      commentList.push(comment)
    }
  }
  // 组装二级评论
  for (let j = 0; j < articleComments.length; j++) {
    let parentId = articleComments[j].parentId
    if (parentId) {
      let userId = articleComments[j].userId
      let accordId = articleComments[j].accordId
      let userInfo = await getUserInfoById(userId)
      let childComment = {
        commentId: articleComments[j].commentId,
        userId: articleComments[j].userId,
        parentId: parentId,
        nickname: userInfo.nickname,
        content: articleComments[j].content,
        portrait: userInfo.avatar,
        children: null
      }
      if (accordId) {
        let { content: accordContent } = await commentModel.findOne({ commentId: accordId })
        childComment.accordContent = accordContent
      } else {
        childComment.accordContent = null
      }
      let parentComment = commentList.find(val => val.commentId === parentId)
      if (parentComment) parentComment.children.push(childComment)
    }
  }
  return commentList
}

async function addArticleComment (comment, username) {
  let userInfo = await getUserInfo({ username })
  if (comment.accordId === null && comment.accordId === null) {
  } else {
    if (!comment.accordId) {
      let parentComment = await commentModel.findOne({ parentId: comment.parentId })
      if (parentComment.userId === userInfo.userId) {
        return {
          code: 10034,
          msg: '自己不能回复自己的评论',
          success: false
        }
      }
    } else {
      let accordComment = await commentModel.findOne({ commentId: comment.accordId })
      if (accordComment.userId === userInfo.userId) {
        return {
          code: 10034,
          msg: '自己不能回复自己的评论',
          success: false
        }
      }
    }
  }
  let data = {}
  data.userId = userInfo.userId
  data.article = comment.article
  let commentList = await commentModel.find({})
  data.commentId = `${commentList.length + 1}`
  data.content = comment.content
  data.parentId = comment.parentId
  data.accordId = comment.accordId
  let commentData = await commentModel.create(data)
  return {
    success: true,
    data: commentData
  }
}

module.exports = {
  getArticleComment,
  addArticleComment
}