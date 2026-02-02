const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoList = new Schema({
    // 标题
  title: {
    type: String,
    required: [true, '标题不能为空'],
    trim: true,
    maxlength: [20, '标题长度不能超过20个字符'],
  },
  // 描述
  description: {
    type: String,
    trim: true,
    maxlength: [200, '描述长度不能超过200个字符'],
  },
  // 是否完成
  completed: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true
})

module.exports = mongoose.model('TodoList', TodoList)