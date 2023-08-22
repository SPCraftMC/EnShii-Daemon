# EnShii-Daemon

## 部署

1. clone 本仓库

2. 安装 `Node.JS 18` 以及 `pnpm(推荐)` 并在仓库目录（存在`package.json`的）下运行：
  ```
  pnpm install
  ```

3. 编辑 `config.js` 配置文件

4. 
- 正常开启服务器
  ```
  pnpm enshii
  ```

- 临时开启服务器（不初始化数据源，通常用于在已经初始化过后的测试）
  ```
  pnpm tmp
  ```

## Open Source LICENSE

[GPL-3.0](LICENSE)
