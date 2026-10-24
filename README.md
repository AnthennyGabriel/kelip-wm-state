# 世界模型综述 · 原图交互学习版

保留144页原始展示，附24项代表工作、85个专题、可点击模块和分步讲解。支持滚轮翻页，目录自动将当前页高亮并居中。网页是静态文件，部署后不需要Node.js服务器或数据库。

## 在这个仓库部署到 GitHub Pages

1. 将本项目提交到 `AnthennyGabriel/kelip-wm-state` 的 `main` 分支。
2. 打开仓库 **Settings → Pages → Build and deployment**，将 **Source** 选为 **GitHub Actions**。
3. 打开 **Actions → Check and deploy website → Run workflow**，选择 `main` 后运行。
4. 等待 `build` 和 `deploy` 都成功；访问 Actions 部署结果中的网址。

默认仓库名和账号不变时，预期网址为：

**https://anthennygabriel.github.io/kelip-wm-state/**

该地址是预期部署地址，不表示已发布成功。每次推送或提交PR会自动做构建检查；正式发布通过 Run workflow 手动触发。更新内容后，再运行一次即可发布新版本。无需自行创建密钥或添加token。

## 本地查看

需要 Node.js 22或更新版本；项目没有第三方运行依赖，也不需要执行 `npm install`。

```sh
npm run build
npm start
```

打开 http://127.0.0.1:8766/ 。

模拟 GitHub Pages 的仓库子目录：

```sh
npm run preview:pages
```

打开 http://127.0.0.1:8766/kelip-wm-state/ 。一次运行一种预览服务。

## 其他静态托管

- **Netlify / Vercel**：导入仓库，构建命令 `npm run build`，输出目录 `dist`。项目已附对应配置文件。
- **Cloudflare Pages**：构建命令 `npm run build`，输出目录 `dist`，Node.js版本设为24。
- **任意静态服务器**：构建后上传 `dist` 里面的全部文件和文件夹，保留目录关系。也可将构建产物直接交给支持静态目录上传的平台。

网页使用相对路径，同时支持域名根目录和 `/kelip-wm-state/` 子目录。翻页状态保存在URL哈希，专题页是独立HTML文件，不需要SPA重写规则。

## 修改与检查

```text
site/                 网页源码与媒体
  index.html          发展综述
  library.html        模块学习库
  module.html         深入专题
  chapters/           四章原始展示、图片、视频、笔记
scripts/check.mjs     检查页面入口、脚本、媒体路径、模块树和文件大小
scripts/build.mjs     将可发布文件构建到dist
.github/workflows/    构建检查和手动发布
dist/                 生成的静态网站，不提交到Git
```

修改 `site` 下的文件，然后运行 `npm run check` 或 `npm run build`。源站的备份、临时截图、研究资料、本地地址专用服务器、下载工具不在发布目录中。

媒体目前随仓库保存，不依赖本机 `127.0.0.1` 地址。请保留完整的 `chapters`；全部站点约170MiB。大文件为演示视频，均小于GitHub单文件100MiB限制。

## 内容来源

原始展示及配套笔记来自[可lip公开资料库](https://github.com/skJack/-lip-)，来源提交 `fc02c1e70c15f677fc752373363eedda43d247dd`。保留各章节的署名、使用说明和事实核查笔记。第三方论文图和视频的权利属于各自作者；本仓库不重新授权这些材料。

还原依据作者公开HTML；没有完整转录视频的两小时口述。新增机制讲解和交互实验为教学整理。详细操作见 `site/使用说明.md`。
