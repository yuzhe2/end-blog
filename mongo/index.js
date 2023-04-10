// 导入 mongoose 模块
const mongoose = require('mongoose');

// 设置默认 mongoose 连接
const mongoDB = 'mongodb://localhost/blog';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });

// 监听数据库的连接成功回调
mongoose.connection.once('open',() => {
  console.log('数据库连接成功');
})

const Schema = mongoose.Schema

const user = new Schema({
  nickname: String, // 用户昵称
  avatar: String, // 用户头像
  userId: Number, // 用户id
  username: String, // 用户名
  password: String  // 密码
})
const userModel = mongoose.model('users', user)

const comment = new Schema({
  article: String, // 文章id
  commentId: String, // 评论id
  content: String, // 评论内容
  parentId: Schema.Types.Mixed, // 评论的父级id
  userId: Number, // 用户id
  accordId: Schema.Types.Mixed // 评论的是那条id
})
const commentModel = mongoose.model('comments', comment)

const article = new Schema({
  title: String, // 文章标题
  articleId: String, // 文章id
  content: String, // 文章内容
  description: String, // 文章简介
  userId: Number, // 文章的作者
  sort: Array, // 文章的类型
  type: String, // 文章的分类
  viewCount: Number, // 文章的游览量
  commentCount: Number, // 文章的评论数
  likeCount: Number, // 文章的点赞量
  createTime: String // 文章的创建时间
})
const articleModel = mongoose.model('articles', article)

const dict = new Schema({
  value: String, // 对应的值
  text: String, // 对应的字符
  type: String // 属于那个分类下面的
})
const dictModel = mongoose.model('dicts', dict)

module.exports = {
  userModel,
  commentModel,
  articleModel,
  dictModel
}