# 招生信息 & 人才培养 — 设计文档

**日期**：2026-04-20
**作者**：Claude（与用户协作 brainstorming）
**目标**：在中文站点新增两个栏目页面 — "招生信息"（联系方式静态页）与 "人才培养"（视频图列表 + 翻页 + 文章详情页），并补齐通用文章详情页模板。

---

## 1. 背景

当前站点（深圳技术大学继续教育学院）是 Vite + Tailwind CSS 4 多页静态站点，每个 HTML 在根目录，通过 `vite.config.ts` 中的 `glob.sync('*.html')` 自动发现。

现有顶部主菜单 8 项：

> 首页 / 学院概况 ▼ / 党建工作 / 非学历教育 ▼ / 赛事展演 / 学历教育 / 新闻通知 ▼ / 场馆信息

需要新增两项一级菜单。同时项目里**目前没有"文章详情页"模板** — 借此机会补一个通用模板，未来其他栏目（学院新闻、公告等）的文章页都可以复用。

---

## 2. 设计总览

### 文件清单

| 操作 | 文件 | 说明 |
|---|---|---|
| 新建 | `admissions.html` | 招生信息（一段联系方式） |
| 新建 | `talent-development.html` | 人才培养（视频列表 + 分页） |
| 新建 | `article-detail.html` | 通用文章详情页模板（含一份"人才培养"示例内容） |
| 修改 | 现有 16 个 `*.html` | 顶部导航 + 移动菜单 + 页脚快速链接，加入新栏目 |
| 不动 | `src/main.js` `src/index.css` `vite.config.ts` `package.json` | Vite glob 自动发现新页面 |

### 不引入新依赖

只用现有 Tailwind utilities + 现有的 Lucide 图标库。无 JS 改动。

---

## 3. 导航变更

### 桌面顶部主菜单（最终 9 项 + 首页）

> 首页 / 学院概况 ▼ / 党建工作 / 学历教育 / 非学历教育 ▼ / **人才培养** / 赛事展演 / 新闻通知 ▼ / **招生信息** / 场馆信息

放置理由：
- **人才培养** 紧跟教育栏目（承接教育成果）
- **招生信息** 放在新闻通知后、场馆信息前（"入口/咨询"类信息靠后归集）

### Lucide 图标

- 招生信息：`clipboard-list`
- 人才培养：`play-circle`

### 移动端菜单 `#mobileNav`

在现有列表里同位置插入两项（与桌面导航同步）：
- 在 "非学历教育" 折叠区域之后插入：`<a class="block py-3 border-b border-primary/8" href="talent-development.html">人才培养</a>`
- 在 "新闻通知" 折叠区域之后、"场馆信息" 之前插入：`<a class="block py-3 border-b border-primary/8" href="admissions.html">招生信息</a>`

### 页脚 "快速链接"

当前是 5 项：学院概况 / 学历教育 / 非学历教育 / 师资队伍 / 新闻动态

调整为：
> 学院概况 / 学历教育 / **人才培养** / **招生信息** / 新闻动态

（去掉无对应页面的"师资队伍"和已有大菜单的"非学历教育"，腾出位置给两个新栏目。）

### 一致性

所有 16 个现有 HTML（about / about_online / academic-education / announcement / college-news / events / golden-years / index / leadership / organization / party-building / party-building_online / search-no-results / search-results / senior-education / transportation-guide）以及 3 个新页面，**导航 / 移动菜单 / 页脚 三处必须严格一致**。

---

## 4. 招生信息页面（admissions.html）

### 整体结构

复用全站标准结构（顶部导航 + 蓝色 banner + 主体 + 页脚），主体只展示一段联系方式，**不放列表也不放侧栏**。

### Banner 区域

- 复用 announcement.html 同样的 banner 模板（蓝色渐变 + 圆点纹理 + 中央标题）
- 标题："招生信息"
- 副标题（英文）：`ADMISSIONS`

### 主体卡片

- 居中布局，最大宽度 720px
- 白底卡片，左侧 4px 蓝色装饰条（`bg-sztu-blue`，与 announcement 卡片风格一致）
- 内边距 `p-12`
- 卡片标题 "招生咨询"（`font-serif font-bold text-4xl text-primary`）
- 标题下一句鼓励语："欢迎咨询深圳技术大学继续教育学院招生事宜，我们将竭诚为您服务。"
- 横分隔线（`border-t border-primary/10`）
- 5 项联系方式上下排列，每项左侧带 lucide 图标 + 标签 + 内容：

| 图标 | 标签 | 内容 |
|---|---|---|
| `phone` | 招生电话 | `0755-2325 6666` |
| `mail` | 招生邮箱 | `zhaosheng@sztu.edu.cn` |
| `map-pin` | 招生办公室 | `学院办公楼 1 楼 102 室` |
| `clock` | 咨询时间 | `周一至周五 9:00-17:30（节假日除外）` |
| `landmark` | 学院地址 | `广东省深圳市坪山区兰田路 3002 号` |

### 卡片底部

- 微信二维码（复用 `/images/footer-qr-official.svg`），标 "扫码咨询招生老师"，居中显示
- 二维码大小约 120px

### 响应式

- 移动端：banner 字号适配缩小，卡片宽度变为 `w-full px-6`
- 联系方式列表保持纵向单列即可

---

## 5. 人才培养列表页（talent-development.html）

### 整体结构

参考 announcement.html（顶部导航 + banner + 左侧栏 + 主区 + 分页 + 页脚），但主区改为 3 列 × 4 行 视频卡片网格。

### Banner 区域

- 复用 announcement.html banner 模板
- 标题："人才培养"
- 副标题（英文）：`TALENT DEVELOPMENT`

### 左侧栏

- 与 announcement.html 同样的 sidebar 结构（白底 + 左侧蓝色装饰条 + sticky 定位）
- 标题区："人才培养 / TALENT DEVELOPMENT"
- 列表只有 1 项："人才培养"（自身高亮，左侧 2px 边框）
- 即便只有 1 项，也保留侧栏视觉结构 — 与全站其他栏目保持一致，方便未来扩展子分类

### 主区网格

- 标题区：`人才培养 / TALENT DEVELOPMENT` + 大号水印背景文字 `TALENT`
- 网格：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- 共 12 个卡片占位（一页满），每行 3 个，4 行
- 每张卡片宽度自适应（约 360px）

### 单卡片详细设计

```
┌────────────────────────┐
│   ┌──────────────┐    │
│   │  封面 16:9    │    │  ← img + aspect-video + object-cover
│   │              │    │      hover: 图片放大 1.05x
│   │       ▶12:35│    │  ← 右下角时长徽章（黑底半透明 + play 图标）
│   └──────────────┘    │
│                        │
│   工匠精神：深技大优秀    │  ← 标题 font-serif font-bold text-base
│   毕业生纪实             │      最多两行 line-clamp-2
│                        │      hover 变蓝色 text-sztu-blue
│              📅2024.11│  ← 单独一行，右对齐
└────────────────────────┘     text-primary/40 text-xs + calendar 图标
```

- **整张卡片**：`<a href="article-detail.html">` 包裹，`block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`
- **封面**：`<div class="relative aspect-video overflow-hidden">`，内含 `<img>` + 右下角时长徽章
- **时长徽章**：`absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1`，左侧 `play` 图标
- **Hover 大播放按钮**：封面中央 `play-circle` 图标，初始 opacity-0，hover 时 opacity-100 放大显示（z-index 高于封面）
- **标题区**：`p-5`，标题 + 日期分两行
- **日期**：单独一行 `flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs`，左 `calendar` 图标，右 "2024.11.20"

### 示例数据（12 项）

封面图复用 `/img/` 下已有的图片（campus / news / events / party / faculty 等），标题和日期按"教育/培养"主题填写：

1. 工匠精神：深技大优秀毕业生纪实 / 12:35 / 2024.11.20
2. 产教融合：人才培养实践分享 / 08:20 / 2024.11.18
3. 终身学习：金色年华学员故事 / 05:48 / 2024.11.15
4. 国际视野：海外交流学员访谈 / 14:22 / 2024.11.10
5. 技能成才：高级技师认证项目 / 09:50 / 2024.11.05
6. 双师培养：校企联合导师计划 / 11:18 / 2024.10.28
7. 创新创业：学院孵化器成果展 / 16:45 / 2024.10.20
8. 党建引领：青年党员先锋故事 / 07:30 / 2024.10.15
9. 乐龄风采：长者学员才艺展示 / 10:08 / 2024.10.08
10. 学历提升：在职学员成长之路 / 13:55 / 2024.09.28
11. 实训纪实：智能制造实训基地 / 18:12 / 2024.09.20
12. 校友回访：杰出校友讲堂实录 / 22:30 / 2024.09.15

### 分页

- 复用 announcement.html 的分页样式 `‹ 1 2 3 ... 5 ›`
- 当前页（1）：`bg-primary text-white`
- 其他页 / 箭头：`border border-primary/10 text-primary/60 hover:bg-primary hover:text-white`
- 由于本期只是占位，分页按钮的 href 都指向 `#`

---

## 6. 通用文章详情页（article-detail.html）

### 整体结构

> 顶部导航 + 简化版 banner + 面包屑 + 文章卡片 + 页脚

### 简化版 Banner

- 同样的蓝色渐变背景，但**高度比列表页小一半**（`pt-32 pb-16`）
- 中央显示当前栏目名（本示例：人才培养）+ 英文副标题 `TALENT DEVELOPMENT`

### 面包屑

- 容器宽度：与正文卡片一致
- 内容：`首页 › 人才培养 › 工匠精神：深技大优秀毕业生纪实`
- 字号 `text-primary/50 text-sm`，分隔符 `›`

### 文章卡片

- 居中，最大宽度 880px
- 白底，`shadow-sm`，`p-12`
- 内部从上到下：
  1. **标题**：`font-serif font-bold text-4xl text-primary`（示例："工匠精神：深技大优秀毕业生纪实"）
  2. **元信息行**（标题下方紧贴一行，水平排列，中间用浅灰竖线 `|` 分隔）：
     - 📰 来源：学院办公室
     - ✍️ 作者：宣传科
     - 👁 点击数：1,234
     - 📅 发布时间：2024.11.20
     - 整行 `text-primary/50 text-sm flex items-center gap-4`，每项前一个 lucide 小图标（`newspaper` / `pen-tool` / `eye` / `calendar`）
  3. **横分隔线**（`border-t border-primary/10 my-8`）
  4. **视频区域**：
     - `aspect-video` 灰色占位（`bg-primary/5`），居中大号 `play-circle` 图标（`w-20 h-20 text-primary/30`）
     - 占位下方一行小字："演示版本，视频暂未接入"（`text-primary/30 text-xs text-center`）
  5. **横分隔线**（`border-t border-primary/10 mt-8 mb-6`）
  6. **返回栏目按钮**：左下角 `← 返回栏目`，链接到 `talent-development.html`，hover 颜色变深

### 通用性

为方便复用，详情页里**所有"人才培养"相关文字都集中在 banner / 面包屑 / 标题三处**。复制本页改这 3 处文字 + 修改"返回栏目"链接，即可适配其他栏目（新闻、公告、党建等）。

---

## 7. 实施约束与一致性

- **不引入新 npm 依赖**
- **不动** `src/main.js` `src/index.css` `vite.config.ts`（vite 多入口构建会自动收录新 HTML）
- 所有新页面复用现有 Tailwind 主题变量（`text-primary` `text-sztu-blue` `bg-background-light` 等）
- 所有新页面顶部包含 Lucide CDN 与 `/src/index.css`，底部 `<script type="module" src="/src/main.js">` —— 与现有页面完全一致
- 16 个现有页面 + 3 个新页面的导航 / 移动菜单 / 页脚必须保持一致（手动同步）

---

## 8. 验收标准

1. `npm run dev` 启动后，访问 `/admissions.html` `/talent-development.html` `/article-detail.html` 均能正常渲染
2. 任意页面点击顶部 "招生信息"、"人才培养" 都能跳转到对应页
3. 移动端汉堡菜单中能看到两个新菜单项
4. 人才培养页 12 张卡片 hover 有动画，点击任一卡片跳转到 `article-detail.html`
5. 详情页"返回栏目"按钮能跳回 `talent-development.html`
6. 16 个现有页面的导航、移动菜单、页脚均已同步更新
7. 桌面端和移动端布局都不破版（375px / 768px / 1280px 三个断点目测）

---

## 9. 不做的事（YAGNI）

- 不做真实视频播放（用户明确说本期是演示）
- 不做视频分类筛选（侧栏只有一项）
- 不做评论 / 点赞 / 分享按钮
- 不做后台管理 / 上传功能
- 不做搜索结果中显示新栏目内容（搜索仍跳到既有 search-results.html）
- 不动 `cankao/` 参考资料目录
