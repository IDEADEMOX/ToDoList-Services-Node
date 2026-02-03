# 待办事项 API 接口简介

## 项目简介

这是一个基于 Express + MongoDB 的待办事项管理系统，提供了完整的 CRUD 操作接口。

## 数据模型

### TodoList

| 字段名 | 类型 | 必填 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- | :--- |
| title | String | 是 | - | 待办标题（最大20字符） |
| description | String | 否 | - | 待办描述（最大200字符） |
| completed | Boolean | 否 | false | 是否完成 |
| createdAt | Date | 否 | 自动生成 | 创建时间 |
| updatedAt | Date | 否 | 自动生成 | 更新时间 |

## 接口列表

### 1. 查询所有待办列表

- **请求方法**：GET
- **请求路径**：/todos/list
- **功能描述**：获取所有待办事项，按创建时间倒序排列

**响应示例**：

```json
{
  "success": true,
  "data": [
    {
      "_id": "60d7f8e6a1b2c3d4e5f6g7h8",
      "title": "学习 Express",
      "description": "完成 Express 基础教程",
      "completed": false,
      "createdAt": "2023-06-25T10:30:00.000Z",
      "updatedAt": "2023-06-25T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. 获取单个待办事项

- **请求方法**：GET
- **请求路径**：/todos/detail/:id
- **功能描述**：根据 ID 获取单个待办事项详情

**路径参数**：
- `id`：待办事项 ID

**响应示例**：

```json
{
  "success": true,
  "data": {
    "_id": "60d7f8e6a1b2c3d4e5f6g7h8",
    "title": "学习 Express",
    "description": "完成 Express 基础教程",
    "completed": false,
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T10:30:00.000Z"
  }
}
```

### 3. 创建待办

- **请求方法**：POST
- **请求路径**：/todos/create
- **功能描述**：创建新的待办事项

**请求体**：

```json
{
  "title": "学习 MongoDB",
  "description": "完成 MongoDB 基础教程",
  "completed": false
}
```

**响应示例**：

```json
{
  "success": true,
  "data": {
    "_id": "60d7f8e6a1b2c3d4e5f6g7h8",
    "title": "学习 MongoDB",
    "description": "完成 MongoDB 基础教程",
    "completed": false,
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T10:30:00.000Z"
  }
}
```

### 4. 更新待办

- **请求方法**：POST
- **请求路径**：/todos/update
- **功能描述**：更新指定待办事项的信息

**请求体**：

```json
{
  "id": "60d7f8e6a1b2c3d4e5f6g7h8",
  "title": "学习 MongoDB 高级特性",
  "description": "完成 MongoDB 高级教程",
  "completed": true
}
```

**响应示例**：

```json
{
  "success": true,
  "data": {
    "_id": "60d7f8e6a1b2c3d4e5f6g7h8",
    "title": "学习 MongoDB 高级特性",
    "description": "完成 MongoDB 高级教程",
    "completed": true,
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T11:00:00.000Z"
  }
}
```

### 5. 删除待办

- **请求方法**：POST
- **请求路径**：/todos/delete
- **功能描述**：删除指定的待办事项

**请求体**：

```json
{
  "id": "60d7f8e6a1b2c3d4e5f6g7h8"
}
```

**响应示例**：

```json
{
  "success": true,
  "message": "删除成功"
}
```

### 6. 更新状态

- **请求方法**：POST
- **请求路径**：/todos/updateStatus
- **功能描述**：更新指定待办事项的完成状态

**请求体**：

```json
{
  "id": "60d7f8e6a1b2c3d4e5f6g7h8",
  "completed": true
}
```

**响应示例**：

```json
{
  "success": true,
  "data": {
    "_id": "60d7f8e6a1b2c3d4e5f6g7h8",
    "title": "学习 Express",
    "description": "完成 Express 基础教程",
    "completed": true,
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T11:00:00.000Z"
  }
}
```

## 错误响应格式

所有接口在失败时都会返回统一的错误响应格式：

```json
{
  "success": false,
  "message": "错误信息",
  "error": "详细错误信息（可选）"
}
```

## 状态码说明

| 状态码 | 描述 |
| :--- | :--- |
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |