import mongoose from "mongoose";

// 连接数据库
const connectDB = async () => {
  try {
     const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI 环境变量未定义');
    }

    const conn = await mongoose.connect(mongoUri, {});
    console.log(`MongoDB 连接成功: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB 连接失败: ${error.message}`);
    process.exit(1); // 连接失败退出进程
  }
};

module.exports = connectDB;
