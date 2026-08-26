# 🧭 个人引导页

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://dash.cloudflare.com/pages)
[![Node](https://img.shields.io/badge/Node-%E2%89%A5%2018-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)

*点击上方部署按钮可跳转 Cloudflare Pages 控制台，登录后按「部署方式一」的步骤配置。*

> ⚠️ **示例项目说明**
>
> - 本项目由 DeepSeek AI 协助生成，仅作示例用途
> - 示例数据（姓名、头像、社交链接、项目等）均为占位内容，请按需修改
> - **fork 使用方式**：fork 后在 GitHub 网页上自建 `links.personal.yml`（复制 `links.example.yml` 内容后修改），构建时优先读取；该文件不在上游仓库中，同步上游更新不会冲突
> - **隐私设计**：个人真实数据只存放在你自己的 fork 中，上游仓库不含任何私人信息
> - 尚未经过真实部署环境验证，部署前建议先在本地预览，并对链接、统计、分享卡片等功能做冒烟测试

一个数据驱动的单文件个人引导页（个人名片式主页）：以头像、姓名、签名、状态徽章、社交链接、项目展示为主，导航收藏为可选附属区块。页面内容全部由 `links.personal.yml`（fork 后自建；示例见 `links.example.yml`）驱动，构建时生成单文件 `index.html`。推荐部署到 Cloudflare Pages（云端自动构建，本地无需安装任何软件），也支持任意静态托管。

## 📑 目录

- [✨ 特性](#特性)
- [📁 项目结构](#项目结构)
- [🚀 快速开始](#快速开始)
- [📦 部署方式](#部署方式)
- [🎨 个性化定制](#个性化定制)
- [📝 配置说明](#配置说明)
- [❓ 常见问题](#常见问题)
- [💡 提示](#提示)

## ✨ 特性

- 📄 **单文件**：构建生成的 `index.html`（不入库）内嵌全部 CSS / JS / 数据，本地构建后双击即可打开
- 👤 **个人引导页**：大头像 + 姓名 + 签名 + 状态徽章 + 社交按钮 + 项目卡片
- ⚙️ **配置驱动**：所有内容都在 `links.personal.yml` 中维护（结构参考示例 `links.example.yml`），区块可整体删除隐藏
- 🌓 深色 / 浅色主题（跟随系统 + 手动切换，记忆选择）
- 🕐 按时段自动问候
- ⚡ 状态徽章轮播（`status` 支持数组，多条定时切换）
- 🔍 可选搜索栏（删除配置即隐藏），快捷键 `/` 聚焦
- 📊 访客统计（不蒜子，配置开关一键启用）
- 📣 社交分享卡片（Open Graph，分享时显示标题/描述/头像预览）
- 🖼️ 图标自动抓取 favicon（站点自身 → DuckDuckGo → Google，失败回退首字母 / emoji / 自定义图片）
- 🏷️ 标签页图标自动生成（emoji 头像 → SVG 图标）
- 📱 响应式布局，移动端友好

## 📁 项目结构

```
├── links.example.yml    # ⭐ 示例配置：个人信息 + 社交 + 项目 + 导航（数据源模板）
├── links.personal.yml   # 你的个人配置（fork 后自建，构建时优先使用）
├── template.html        # 页面模板（__DATA__/__TITLE__ 等为占位符，构建时替换）
├── build.mjs            # 构建脚本：yml + 模板 → index.html
├── package.json         # 构建命令
└── .gitignore
```

> `index.html` 为构建产物，**不入库**：本地 `npm run build` 生成，或由 Cloudflare Pages 云端自动生成。

## 🚀 快速开始

两种方式任选其一：本地构建预览（需 Node），或全程云端构建（无需任何本地软件）。

### 有 Node 环境（本地开发）

```bash
npm install      # 安装依赖（js-yaml）
# 1. 新建 links.personal.yml（复制 links.example.yml 内容后修改）
npm run build    # 2. 构建（优先读取 links.personal.yml）
# 3. 双击打开 index.html 本地预览（无需服务器）
```

### 没有 Node 环境

无需安装任何软件：fork 仓库 → 在 GitHub 网页上新建并编辑 `links.personal.yml` → Pages 连接你的 fork（见下方部署方式一），云端自动构建部署。

> ⚠️ 全程只需维护 `links.personal.yml` 一个文件。`index.html` 只是构建产物（本地或云端生成），**请勿手动编辑**——手动修改会在下次构建时被覆盖。

## 📦 部署方式

### 前置准备

- 注册 [Cloudflare](https://dash.cloudflare.com) 账号（免费）

### 方式一：Cloudflare Pages（推荐，本地无需 Node）

1. **Fork 本仓库**，然后在你的 fork 的 GitHub 网页上**新建 `links.personal.yml`**（复制 `links.example.yml` 的内容，改成你自己的信息）
2. [Pages](https://dash.cloudflare.com/pages) → **Create a project** → 连接你的 fork 仓库
3. 框架预设选 **None**，构建命令填 `npm run build`，输出目录填 `/`
4. 保存并部署。此后每次在 GitHub 网页上编辑 `links.personal.yml` 并提交，Pages 即自动云端构建部署（`index.html` 只在云端生成，无需入库）

### 方式二：其他静态托管

`index.html` 是完整单文件（不入库），本地 `npm run build` 后上传即可：

| 平台 | 说明 |
| --- | --- |
| **GitHub Pages** | 需配合 GitHub Actions 执行 `npm run build`（产物不入库），或直接用方式一 |
| **Vercel / Netlify** | 连接仓库并设置构建命令 `npm run build`，或本地构建后拖拽上传 `index.html` |
| **自己的服务器** | 本地 `npm run build` 后将生成的 `index.html` 放到 Nginx / 宝塔站点根目录 |

**自定义域名**：各平台后台添加（Cloudflare Pages：Custom domains，域名需托管在 Cloudflare；GitHub Pages：Settings → Custom domain）。

## 🎨 个性化定制

### 换主题色

编辑 `template.html` 顶部的 CSS 变量，然后 `npm run build`：

| 变量 | 作用 |
| --- | --- |
| `--accent` | 主强调色（渐变、按钮、分组标题） |
| `--bg` / `--text` / `--muted` | 页面背景 / 正文 / 次要文字 |
| `--card` / `--border` | 卡片背景 / 边框 |
| `--blob1` / `--blob2` | 背景光斑颜色 |

浅色模式在 `:root` 中，深色模式在 `html[data-theme=dark]` 中，两处同步修改。

### 标签页图标

无需配置，自动由 `site.avatar` 生成：emoji/文字 → SVG 图标；图片 URL → 直接引用。

### 隐藏区块

删除配置文件中对应配置段即可：`search`（搜索栏）、`nav`（导航收藏）、`socials`（社交按钮）、`projects`（项目卡片）、`status`/`about`（置空隐藏）。

## 📝 配置说明

以下以 `links.example.yml` 为例，你的 `links.personal.yml` 结构与之完全相同。

页面自上而下：Hero（头像/姓名/签名/状态）→ 社交 → 搜索 → 关于 → 项目 → 导航 → 页脚。
**每个区块都是可选的**：删除对应配置段即可隐藏。

```yaml
site:
  title: "Chihiro"              # 姓名 / 标题（同时用于浏览器标题与分享卡片）
  subtitle: "独立开发者"         # 个性签名
  avatar: "🧭"                   # emoji / 文字 / 图片 URL（GitHub 头像可填 https://github.com/用户名.png）
  status:                       # 状态徽章：字符串静态显示 / 数组轮播，留空隐藏
    - "🚀 正在学习 Rust"
  greeting: ""                  # 问候语，留空按时段自动问候
  about: |-                     # 自我介绍，留空隐藏（| 支持多行）
    你好，我是 Chihiro 👋
  analytics: true               # 访客统计（不蒜子），false 关闭
  footer: "© 2026 Chihiro"
  description: "个人引导页"      # SEO 描述（用于 meta description 与 og:description）

socials:                        # 社交按钮（圆形图标）
  - { name: GitHub, url: "https://github.com/you", icon: "🐙" }

projects:                       # 项目卡片
  - name: 项目名
    url: "https://..."
    desc: "一句话介绍"
    tags: ["Vue", "Node"]
    icon: "📦"                   # 可选

search:                         # 可选：搜索栏
  placeholder: "搜索…"
  engines:                      # {q} 为关键词占位符
    - { name: Bing, url: "https://www.bing.com/search?q={q}" }

nav:                            # 可选：导航收藏（胶囊区块）
  groups:
    - name: 常用
      links:
        - name: Bilibili
          url: "https://www.bilibili.com"
          desc: 描述           # 可选
          icon: "📺"           # 可选：emoji / 图片 URL；留空自动抓取 favicon
```

> `icon` 统一支持三种形式：emoji / 图片 URL / 留空（自动抓取站点 favicon，失败回退名称首字母）。

## ❓ 常见问题

**Q：本地双击打开，图标是字母、访客统计不显示？**
A：`file://` 协议下网络功能受限（favicon 跨域请求、统计脚本依赖 HTTP）。部署到任意 HTTP 托管后即恢复正常。

**Q：改了 `links.personal.yml` 但页面没变化？**
A：忘记重新 `npm run build`；或部署后浏览器/CDN 缓存（稍等片刻或强制刷新）。

**Q：fork 之后同步上游更新，会和我改过的内容冲突吗？**
A：不会。你的个人数据在 `links.personal.yml` 中，而该文件不在上游仓库里——同步上游只会更新示例配置、模板和构建脚本，互不干扰。

**Q：分享到社交软件没有预览卡片？**
A：Open Graph 标签已构建时注入，确认部署后的页面 head 中存在 `og:title`；`og:image` 需要 `avatar` 为图片 URL（emoji 头像无预览图）。

**Q：怎么彻底去掉搜索栏 / 导航收藏？**
A：直接删除 `links.personal.yml` 中对应配置段（`search` / `nav`），重新构建。

**Q：Pages 构建失败？**
A：确认仓库根目录包含 `package.json`，构建命令为 `npm run build`、输出目录为 `/`；查看 Pages 部署日志定位具体错误。

**Q：Cloudflare Pages 有构建次数限制吗？**
A：免费版每月 500 次构建，每次提交 `links.personal.yml` 消耗一次，个人使用绰绰有余；构建失败时旧版本保持在线，不影响已部署页面。

## 💡 提示

- 修改 `links.personal.yml` 后需重新 `npm run build`（或推送到你的 fork，由 Pages 云端构建）
- 页面样式统一在 `template.html` 中维护，构建时注入数据
- `index.html` 是构建产物（带"自动生成"标识），请勿手动修改
