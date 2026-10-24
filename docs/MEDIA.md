# README 展示素材

[← 返回项目介绍](../README.md)

所有画面来自本仓库真实运行的网页。GIF 由连续操作的截图合成，使用固定阅读节奏，并添加统一标题和步骤说明。没有生成或伪造产品界面。

| 素材 | 展示内容 | 截图数 |
| --- | --- | --- |
| `media/overview.png` | 首页双入口与四条研究脉络 | 1 |
| `media/flow.gif` | DreamZero 原图的 9 步信息流 | 9 |
| `media/depth.gif` | 原图 → VAE 小窗 → 专题 → 重参数化 → 返回 | 8 |
| `media/mpc.gif` | MPC 搜索、首步执行、扰动与重规划 | 10 |
| `media/library.png` | DreamZero 的一级模块与二级知识点 | 1 |
| `media/mobile.png` | 手机端原图及模块入口 | 1 |

## 更新方式

在项目根目录先启动本地子目录预览：

```sh
npm run build
npm run preview:pages
```

另开终端，仍在项目根目录运行。捕获工具使用独立会话，避免与其他目录的浏览器会话混用：

```sh
npx --yes --package @playwright/cli playwright-cli -s=readme open http://127.0.0.1:8766/kelip-wm-state/
npx --yes --package @playwright/cli playwright-cli -s=readme run-code --filename scripts/capture-readme.playwright.js
npx --yes --package @playwright/cli playwright-cli -s=readme close
```

首次使用如提示缺少浏览器，按 CLI 提示安装 Chromium。若已存在从其他项目启动的同名会话，先关闭它，再在本项目新建。原始截图保存在 `.readme-frames/`（已忽略，不提交）。

使用 Python 3 与 Pillow 合成：

```sh
python -m pip install Pillow
python scripts/render-readme.py
```

Windows 也可使用 `py -3.12` 替代 `python`。默认中文字体为 Windows 微软雅黑；其他系统通过环境变量 `README_FONT` 指向本机可用的中文字体。Playwright 和 Pillow 仅用于维护展示素材，不属于网站运行依赖。

## 展示检查

- 更新交互后重新截图，确保文字描述和真实操作一致。
- 检查动图首帧、中间帧和最后一帧，尤其是弹窗与返回位置。
- 保留论文原图署名，不将步骤截图描述为实时性能测量。
- 这些 GIF 用于浏览项目；需要自主暂停、翻页或交互时请运行网站。
