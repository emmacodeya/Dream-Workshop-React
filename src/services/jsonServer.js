import jsonServer from "json-server";
import cors from "cors";

// 創建 JSON Server
// const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // 讀取 db.json
const middlewares = jsonServer.defaults();

server.use(cors()); // 允許 CORS
server.use(middlewares);
server.use(jsonServer.bodyParser); // 解析 JSON 請求

// 自定義 API 路由（可選）
server.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// 啟動伺服器
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
