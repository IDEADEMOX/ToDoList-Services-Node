import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();
const Todo = require('../models/TodoList')

// 查询所有待办列表
router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find().sort({createdAt: -1})
    res.status(200).json({
      success: true,
      data: todos,
      count: todos.length
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({
      success: false,
      message: '服务错误，查询失败',
      error: errorMessage
    })
  }
});

// 获取单个待办事项
router.get('/detail/:id', async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404).json({
        success: false,
        message: '待办不存在'
      })
    }
    res.status(200).json({
      success: true,
      data: todo
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: '待办ID格式错误'
      })
      return
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({
      success: false,
      message: '服务错误，查询失败',
      error: errorMessage
    })
  }
})

// 创建待办
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.create(req.body)
    res.status(200).json({
      success: true,
      data: todo
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: '待办内容不能为空'
      })
      return
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({
      success: false,
      message: '服务错误，创建失败',
      error: errorMessage
    })
  }
});

router.post("/update", async (req: Request, res: Response, next: NextFunction) => {
    const {id, ...rest} = req.body
  try {
    let todo = await Todo.findById(id)
    if (!todo) {
      res.status(404).json({
        success: false,
        message: '待办不存在'
      })
      return
    }
    // 更新
    todo = await Todo.findByIdAndUpdate(id, rest, { new: true, runValidators: true })
    res.status(200).json({
      success: true,
      data: todo
    })
  } catch (error: any) { 
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: '待办ID格式错误'
      })
      return
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors as Error).map(val => val.message);
      res.status(400).json({
        success: false,
        message: messages.join('; ')
      })
      return
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({
      success: false,
      message: '服务错误，更新失败',
      error: errorMessage
    })
  }
});

// 删除待办
router.post("/delete", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findById(req.body.id)
    if (!todo) {
      res.status(404).json({
        success: false,
        message: '待办不存在'
      })
      return
    }
    // 删除
    await todo.deleteOne()
    res.status(200).json({
      success: true,
      message: '删除成功'
    })
  } catch (error) { 
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: '待办ID格式错误'
      })
      return
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({
      success: false,
      message: '服务错误，删除失败',
      error: errorMessage
    })
  }
});

// 更新状态
router.post("/updateStatus", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findById(req.body.id)
    if (!todo) {
      res.status(404).json({
        success: false,
        message: '待办不存在'
      })
      return
    }
    // 更新
    todo.completed = req.body.completed
    await todo.save()
    res.status(200).json({
      success: true,
      data: todo
    })
  } catch (error) { 
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: '待办ID格式错误'
      })
      return
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({
      success: false,
      message: '服务错误，删除失败',
      error: errorMessage
    })
  }
})

module.exports = router;
