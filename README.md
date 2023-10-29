# EnShii-Daemon

## 部署

1. clone 本仓库

2. 安装 `Node.JS 18` 以及 `bun(推荐)` 并在仓库目录（存在`package.json`的）下运行：
  ```
  bun i
  ```

3. 编辑 `config.js` 配置文件

4. 运行
- 正常开启服务器（具体使用pm2进行实例管理，开启了一个类似nodemon的监控文件修改和其他一些调整）
  ```
  bun enshii
  ```

## 问题

更换数据库类型时除了更改./config.js还需要更改./schema.prisma中的db.provider

## Open Source LICENSE

[GPL-3.0](LICENSE)
