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

router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  res.send("respond with a resource");
});

router.post("/update", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/delete", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

module.exports = router;
