var { userModel } = require('../../mongo/index')

// 查找用户信息
function getUserInfo (user) {
  return userModel.findOne({ username: user.username })
}

// 根据用户id查询对应的数据
function getUserInfoById (userId) {
  return userModel.findOne({ userId })
}

module.exports = {
  getUserInfo,
  getUserInfoById
}