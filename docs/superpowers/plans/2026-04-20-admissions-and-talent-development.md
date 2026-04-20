# 招生信息 & 人才培养 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在中文站点新增「招生信息」「人才培养」两个一级菜单栏目，新建一个通用文章详情页模板，并在 16 个现有页面同步导航 / 移动菜单 / 页脚。

**Architecture:** 多页静态站（Vite 多入口 + Tailwind 4），每个 HTML 是独立入口；通过 `vite.config.ts` 的 `glob.sync('*.html')` 自动发现新页面，无需改构建配置。新页面复用 `announcement.html` 的整体骨架（导航 + 蓝色 banner + 主体 + 页脚），主体替换为各自内容。导航变更采用「先在 14 个标准页应用统一 Edit、再单独处理 2 个 `*_online.html` 页」的策略。

**Tech Stack:** HTML5 + Tailwind CSS 4（已配置）+ Lucide 图标（CDN）+ Vite 6 多入口构建。无新增 npm 依赖、无 JS 改动。

**Project rule reminder:** 项目无测试套件（CLAUDE.md 明确说明）。验证手段：`npm run dev` 启动后用 preview tools 截图 / 点击 / 控制台日志检查。

**Spec reference:** `docs/superpowers/specs/2026-04-20-admissions-and-talent-development-design.md`

---

## File Structure

```
admissions.html               (NEW)
talent-development.html       (NEW)
article-detail.html           (NEW)

# 14 个标准页面（含完整导航 + 移动菜单 + 页脚）—— 同步 nav / mobile nav / footer
about.html, academic-education.html, announcement.html,
college-news.html, events.html, golden-years.html, index.html,
leadership.html, organization.html, party-building.html,
search-no-results.html, search-results.html, senior-education.html,
transportation-guide.html

# 2 个简化版页面（无移动菜单，无场馆信息项）—— 仅同步 desktop nav 与 footer
about_online.html, party-building_online.html
```

---

## Canonical Snippets

下面 4 个代码块是「唯一权威版本」，后续多个 task 都引用它们。**实施时直接复制粘贴，不要手敲。**

### Snippet A — 桌面顶部菜单 `<ul>` 完整内容（替换原 `<ul class="hidden xl:flex...">` 内的所有 `<li>`）

把 14 个标准页 nav 中从 `<li><a class="hover:text-primary transition-colors" href="index.html">首页</a></li>` 到结束 `</ul>` 之前的所有 `<li>` 元素，**替换为**下面这一整段：

```html
        <li><a class="hover:text-primary transition-colors" href="index.html">首页</a></li>
        <li class="relative mega-menu-trigger">
          <a class="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer" href="about.html">
            学院概况
            <i data-lucide="chevron-down" class="w-3 h-3"></i>
          </a>
          <div class="mega-menu absolute top-full right-0 xl:right-auto xl:-left-[200px] w-[90vw] max-w-[1100px] mt-4 p-12 glass-mega shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm">
            <div class="grid grid-cols-12 gap-12">
              <div class="col-span-4 border-r border-primary/5 pr-12">
                <span class="text-primary text-xs tracking-[0.5em] block mb-4 uppercase">Overview</span>
                <h3 class="text-4xl font-serif font-bold text-primary mb-8">学院概况</h3>
                <p class="text-primary/60 text-sm leading-relaxed font-light mb-12">
                  秉持"唯实、求精"的校训，深圳技术大学继续教育学院致力于构建服务全民终身学习的现代教育体系。
                </p>
              </div>
              <div class="col-span-8 flex flex-col justify-center h-full">
                <div class="grid grid-cols-2 gap-x-12 gap-y-10">
                  <a class="group flex items-start gap-5" href="about.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="info" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">学院简介</h5>
                      <p class="text-primary/40 text-xs leading-relaxed">了解我们的使命与愿景</p>
                    </div>
                  </a>
                  <a class="group flex items-start gap-5" href="organization.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="network" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">组织架构</h5>
                      <p class="text-primary/40 text-xs leading-relaxed">精简高效的行政运行体系</p>
                    </div>
                  </a>
                  <a class="group flex items-start gap-5" href="transportation-guide.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="map" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">交通指南</h5>
                      <p class="text-primary/40 text-xs leading-relaxed">便捷抵达深技大校园的最佳路线</p>
                    </div>
                  </a>
                  <a class="group flex items-start gap-5" href="leadership.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="users" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">现任领导</h5>
                      <p class="text-primary/40 text-xs leading-relaxed">卓越的管理团队与教育家</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><a class="hover:text-primary transition-colors" href="party-building.html">党建工作</a></li>
        <li><a class="hover:text-primary transition-colors" href="academic-education.html">学历教育</a></li>
        <li class="relative mega-menu-trigger">
          <a class="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer" href="golden-years.html">
            非学历教育
            <i data-lucide="chevron-down" class="w-3 h-3"></i>
          </a>
          <div class="mega-menu absolute top-full right-0 xl:right-auto xl:-left-[400px] w-[80vw] max-w-[1000px] mt-4 p-12 glass-mega shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm">
            <div class="grid grid-cols-12 gap-12">
              <div class="col-span-4 border-r border-primary/5 pr-12">
                <span class="text-primary text-xs tracking-[0.5em] block mb-4 uppercase">Continuing</span>
                <h3 class="text-4xl font-serif font-bold text-primary mb-8">非学历教育</h3>
                <p class="text-primary/60 text-sm leading-relaxed font-light mb-10">
                  提供面向职场精英与长者的终身教育解决方案，赋能每一位求知者的精彩人生。
                </p>
              </div>
              <div class="col-span-8 flex flex-col justify-center h-full">
                <div class="grid grid-cols-2 gap-12">
                  <a class="group flex items-start gap-5" href="golden-years.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="award" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">金色年华</h5>
                      <p class="text-primary/50 text-xs leading-relaxed">为成熟职场精英量身定制的进阶成长路径，赋能职业下半场。</p>
                    </div>
                  </a>
                  <a class="group flex items-start gap-5" href="senior-education.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="user-plus" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">乐龄教育</h5>
                      <p class="text-primary/50 text-xs leading-relaxed">终身学习的优雅实践，为长者开启智慧生活的新篇章。</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><a class="hover:text-primary transition-colors" href="talent-development.html">人才培养</a></li>
        <li><a class="hover:text-primary transition-colors" href="events.html">赛事展演</a></li>
        <li class="relative mega-menu-trigger">
          <a class="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer" href="college-news.html">
            新闻通知
            <i data-lucide="chevron-down" class="w-3 h-3"></i>
          </a>
          <div class="mega-menu absolute top-full right-0 xl:right-auto xl:-left-[680px] w-[80vw] max-w-[960px] mt-4 p-12 glass-mega shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm">
            <div class="grid grid-cols-12 gap-12">
              <div class="col-span-4 border-r border-primary/5 pr-12">
                <span class="text-primary text-xs tracking-[0.5em] block mb-4 uppercase">News &amp; Notices</span>
                <h3 class="text-4xl font-serif font-bold text-primary mb-8">新闻通知</h3>
                <p class="text-primary/60 text-sm leading-relaxed font-light mb-10">
                  及时获取学院最新动态、重要通知与公告信息。
                </p>
              </div>
              <div class="col-span-8 flex flex-col justify-center h-full">
                <div class="grid grid-cols-2 gap-12">
                  <a class="group flex items-start gap-5" href="college-news.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="newspaper" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">学院新闻</h5>
                      <p class="text-primary/50 text-xs leading-relaxed">最新动态与学术前沿资讯</p>
                    </div>
                  </a>
                  <a class="group flex items-start gap-5" href="announcement.html">
                    <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                      <i data-lucide="bell" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <h5 class="text-primary text-base font-bold mb-1 tracking-wide">通知公告</h5>
                      <p class="text-primary/50 text-xs leading-relaxed">学院重要通知与公告发布</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><a class="hover:text-primary transition-colors" href="admissions.html">招生信息</a></li>
        <li><a class="hover:text-primary transition-colors" href="https://www.sztu.edu.cn" target="_blank" rel="noreferrer">场馆信息</a></li>
```

> **关键变化点**：把原本在 `events.html` 之后的 `<li>学历教育</li>` 移到 `<li>党建工作</li>` 之后；在 `非学历教育` `</li>` 后插入 `<li>人才培养</li>`；在 `新闻通知` `</li>` 后插入 `<li>招生信息</li>`。

---

### Snippet B — 移动端 `#mobileNav` 菜单完整内容（仅 14 个标准页有此结构）

把 `<div class="space-y-2 text-base text-primary">` 内部的所有内容，**替换为**：

```html
            <a class="block py-3 border-b border-primary/8" href="index.html">首页</a>
            <div class="border-b border-primary/8">
              <button type="button" class="w-full flex items-center justify-between py-3 text-left" data-mobile-submenu-toggle aria-expanded="false">
                <span>学院概况</span>
                <i data-lucide="chevron-down" data-mobile-submenu-icon class="w-4 h-4 text-primary/50 transition-transform"></i>
              </button>
              <div class="hidden pb-3 pl-4 space-y-3 text-sm text-primary/70">
                <a class="block" href="about.html">学院简介</a>
                <a class="block" href="organization.html">组织架构</a>
                <a class="block" href="transportation-guide.html">交通指南</a>
                <a class="block" href="leadership.html">现任领导</a>
              </div>
            </div>
            <a class="block py-3 border-b border-primary/8" href="party-building.html">党建工作</a>
            <a class="block py-3 border-b border-primary/8" href="academic-education.html">学历教育</a>
            <div class="border-b border-primary/8">
              <button type="button" class="w-full flex items-center justify-between py-3 text-left" data-mobile-submenu-toggle aria-expanded="false">
                <span>非学历教育</span>
                <i data-lucide="chevron-down" data-mobile-submenu-icon class="w-4 h-4 text-primary/50 transition-transform"></i>
              </button>
              <div class="hidden pb-3 pl-4 space-y-3 text-sm text-primary/70">
                <a class="block" href="golden-years.html">金色年华</a>
                <a class="block" href="senior-education.html">乐龄教育</a>
              </div>
            </div>
            <a class="block py-3 border-b border-primary/8" href="talent-development.html">人才培养</a>
            <a class="block py-3 border-b border-primary/8" href="events.html">赛事展演</a>
            <div class="border-b border-primary/8">
              <button type="button" class="w-full flex items-center justify-between py-3 text-left" data-mobile-submenu-toggle aria-expanded="false">
                <span>新闻通知</span>
                <i data-lucide="chevron-down" data-mobile-submenu-icon class="w-4 h-4 text-primary/50 transition-transform"></i>
              </button>
              <div class="hidden pb-3 pl-4 space-y-3 text-sm text-primary/70">
                <a class="block" href="college-news.html">学院新闻</a>
                <a class="block" href="announcement.html">通知公告</a>
              </div>
            </div>
            <a class="block py-3 border-b border-primary/8" href="admissions.html">招生信息</a>
            <a class="block py-3" href="https://www.sztu.edu.cn" target="_blank" rel="noreferrer">场馆信息</a>
```

---

### Snippet C — 页脚「快速链接」`<ul>` 完整内容（替换原 `<h4>快速链接</h4>` 之后的 `<ul>`）

```html
            <ul class="space-y-4 text-sm text-white/80">
              <li><a class="hover:text-white transition-colors" href="about.html">学院概况</a></li>
              <li><a class="hover:text-white transition-colors" href="academic-education.html">学历教育</a></li>
              <li><a class="hover:text-white transition-colors" href="talent-development.html">人才培养</a></li>
              <li><a class="hover:text-white transition-colors" href="admissions.html">招生信息</a></li>
              <li><a class="hover:text-white transition-colors" href="college-news.html">新闻动态</a></li>
            </ul>
```

---

### Snippet D — `*_online.html` 简化版桌面菜单（仅 2 个页面用）

`about_online.html` 和 `party-building_online.html` 的 `<ul class="hidden xl:flex...">` 内**没有**「场馆信息」项，且 `新闻通知` 的 mega-menu trigger href 是 `#` 而非 `college-news.html`。除此之外 nav 结构与 Snippet A 几乎一致。

应用 Snippet A 时的两处微调：
1. 删除 Snippet A 末尾 `<li>招生信息</li>` 之后的「场馆信息」`<li>`（这两个简化页本来就没有）
2. 保留 Snippet A 中 `<a href="college-news.html">新闻通知</a>` —— 这是修正而不是退化

> 说明：保留场馆信息缺失（不强行补回）以最小改动；保留新闻通知 trigger 改成正确链接是顺手的良性修复。

---

## Task 1 — 启动开发服务器并截基线图

**Files:** 无（仅启动服务）

- [ ] **Step 1.1：启动 dev server（preview）**

调用：
```
mcp__Claude_Preview__preview_start
url: http://localhost:3000
command: npm run dev
cwd: /Users/alec/project/workspace/continue-college/.claude/worktrees/charming-almeida-ac3668
```

预期：服务在 3000 端口启动成功。

- [ ] **Step 1.2：截基线截图（首页和公告页）**

```
preview_screenshot   url: http://localhost:3000/index.html
preview_screenshot   url: http://localhost:3000/announcement.html
```

预期：图能正常返回，首页 hero 区显示「智造卓越」、announcement 显示「通知公告」。这是改动前的状态。

---

## Task 2 — 创建 `admissions.html`

**Files:**
- Create: `admissions.html`

**做法**：从 `announcement.html` 复制为蓝本，然后做 4 处替换：
1. `<title>` 改为「招生信息 - 深圳技术大学继续教育学院」
2. nav `<ul>` 内全部 `<li>` 替换为 **Snippet A**
3. mobile nav 的 `<div class="space-y-2 ...">` 内全部内容替换为 **Snippet B**
4. footer 的「快速链接」`<ul>` 替换为 **Snippet C**
5. `<main>` 标签内的整个 banner + 主体内容，**替换为**下方专属内容

- [ ] **Step 2.1：复制 announcement.html → admissions.html**

```bash
cp announcement.html admissions.html
```

- [ ] **Step 2.2：修改 `<title>`**

`<title>通知公告 - 深圳技术大学继续教育学院</title>` → `<title>招生信息 - 深圳技术大学继续教育学院</title>`

- [ ] **Step 2.3：替换桌面 nav 中所有 `<li>`**

用 Edit 工具：把 `<ul class="hidden xl:flex items-center gap-10 text-sm font-bold tracking-widest text-primary/60 uppercase">` 与之对应的 `</ul>` 之间的全部 `<li>...</li>` 替换为 **Snippet A**。

- [ ] **Step 2.4：替换移动端菜单**

用 Edit 工具：把 `<div class="space-y-2 text-base text-primary">` 内部全部内容替换为 **Snippet B**。

- [ ] **Step 2.5：替换 `<main>` 区域**

把 `<main class="bg-[#f8f9fb]">` 与 `</main>` 之间的所有内容（即 banner + 列表 + 分页）**替换为**：

```html
    <main class="bg-[#f8f9fb]">
      <!-- Banner -->
      <section class="relative overflow-hidden z-10 pt-40 pb-28">
        <div class="absolute inset-0 z-0">
          <img src="/img/banner1.jpg" alt="Banner Background" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&amp;fit=crop&amp;q=80&amp;w=2000'; this.onerror=null;" />
          <div class="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-sztu-blue/90"></div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none mix-blend-overlay">
          <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div class="container mx-auto px-8 lg:px-16 flex flex-col items-center text-center relative z-10">
          <h2 class="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-widest text-glow-light drop-shadow-md">招生信息</h2>
          <div class="flex items-center justify-center gap-6">
            <div class="w-16 h-[2px] bg-gradient-to-r from-transparent to-white/50"></div>
            <span class="text-white/90 font-bold text-sm tracking-[0.6em] uppercase block">Admissions</span>
            <div class="w-16 h-[2px] bg-gradient-to-l from-transparent to-white/50"></div>
          </div>
        </div>
      </section>

      <!-- 招生联系卡片 -->
      <section class="container mx-auto px-8 lg:px-16 py-20 relative z-10">
        <div class="max-w-[720px] mx-auto bg-white shadow-sm relative">
          <div class="absolute top-0 left-0 w-[4px] h-full bg-sztu-blue"></div>
          <div class="p-12">
            <h2 class="text-4xl font-serif font-bold text-primary mb-3">招生咨询</h2>
            <p class="text-deep-black/60 text-sm leading-relaxed mb-8">
              欢迎咨询深圳技术大学继续教育学院招生事宜，我们将竭诚为您服务。
            </p>
            <div class="border-t border-primary/10 pt-8 space-y-6">
              <div class="flex items-start gap-5">
                <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/5 text-sztu-blue rounded-sm">
                  <i data-lucide="phone" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="text-primary/40 text-xs tracking-widest uppercase mb-1">招生电话</p>
                  <p class="text-primary text-base font-bold">0755-2325 6666</p>
                </div>
              </div>
              <div class="flex items-start gap-5">
                <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/5 text-sztu-blue rounded-sm">
                  <i data-lucide="mail" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="text-primary/40 text-xs tracking-widest uppercase mb-1">招生邮箱</p>
                  <p class="text-primary text-base font-bold">zhaosheng@sztu.edu.cn</p>
                </div>
              </div>
              <div class="flex items-start gap-5">
                <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/5 text-sztu-blue rounded-sm">
                  <i data-lucide="map-pin" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="text-primary/40 text-xs tracking-widest uppercase mb-1">招生办公室</p>
                  <p class="text-primary text-base font-bold">学院办公楼 1 楼 102 室</p>
                </div>
              </div>
              <div class="flex items-start gap-5">
                <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/5 text-sztu-blue rounded-sm">
                  <i data-lucide="clock" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="text-primary/40 text-xs tracking-widest uppercase mb-1">咨询时间</p>
                  <p class="text-primary text-base font-bold">周一至周五 9:00-17:30（节假日除外）</p>
                </div>
              </div>
              <div class="flex items-start gap-5">
                <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/5 text-sztu-blue rounded-sm">
                  <i data-lucide="landmark" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="text-primary/40 text-xs tracking-widest uppercase mb-1">学院地址</p>
                  <p class="text-primary text-base font-bold leading-relaxed">广东省深圳市坪山区<br/>兰田路 3002 号</p>
                </div>
              </div>
            </div>
            <div class="border-t border-primary/10 mt-10 pt-10 flex flex-col items-center">
              <img src="/images/footer-qr-official.svg" alt="招生咨询二维码" class="w-32 aspect-square bg-white p-2 border border-primary/10" />
              <p class="mt-4 text-primary/50 text-xs tracking-[0.3em] uppercase">扫码咨询招生老师</p>
            </div>
          </div>
        </div>
      </section>
    </main>
```

- [ ] **Step 2.6：替换 footer 「快速链接」`<ul>` 并修复笔误**

用 Edit 工具做两步：
1. 把 `<h4 class="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-8">快速链</h4>` 改为 `<h4 class="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-8">快速链接</h4>`（原 announcement.html 的笔误）
2. 把紧随其后的 `<ul class="space-y-4 text-sm text-white/80">...</ul>` 替换为 **Snippet C**

- [ ] **Step 2.7：浏览器验证**

```
preview_eval   script: window.location.href = 'http://localhost:3000/admissions.html'
preview_screenshot
preview_console_logs   limit: 50
```

预期：页面渲染出「招生信息」banner、白色卡片含 5 项联系方式 + 二维码；控制台无 error。

- [ ] **Step 2.8：commit**

```bash
git add admissions.html
git commit -m "feat: 新增招生信息页面"
```

---

## Task 3 — 创建 `talent-development.html`

**Files:**
- Create: `talent-development.html`

**做法**：跟 Task 2 类似，从 `announcement.html` 复制蓝本，做相同的 4 处头部替换（title / nav / mobile nav / footer），然后 `<main>` 区域替换为下方专属内容。

- [ ] **Step 3.1：复制 announcement.html → talent-development.html**

```bash
cp announcement.html talent-development.html
```

- [ ] **Step 3.2：修改 title**

`<title>通知公告 - 深圳技术大学继续教育学院</title>` → `<title>人才培养 - 深圳技术大学继续教育学院</title>`

- [ ] **Step 3.3：替换桌面 nav `<li>`、移动 nav、footer 「快速链接」**

同 Task 2 的 Step 2.3 / 2.4 / 2.6（应用 Snippet A / B / C）。

- [ ] **Step 3.4：替换 `<main>` 区域**

把 `<main class="bg-[#f8f9fb]">` 与 `</main>` 之间所有内容**替换为**：

```html
    <main class="bg-[#f8f9fb]">
      <!-- Banner -->
      <section class="relative overflow-hidden z-10 pt-40 pb-28">
        <div class="absolute inset-0 z-0">
          <img src="/img/banner1.jpg" alt="Banner Background" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&amp;fit=crop&amp;q=80&amp;w=2000'; this.onerror=null;" />
          <div class="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-sztu-blue/90"></div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none mix-blend-overlay">
          <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div class="container mx-auto px-8 lg:px-16 flex flex-col items-center text-center relative z-10">
          <h2 class="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-widest text-glow-light drop-shadow-md">人才培养</h2>
          <div class="flex items-center justify-center gap-6">
            <div class="w-16 h-[2px] bg-gradient-to-r from-transparent to-white/50"></div>
            <span class="text-white/90 font-bold text-sm tracking-[0.6em] uppercase block">Talent Development</span>
            <div class="w-16 h-[2px] bg-gradient-to-l from-transparent to-white/50"></div>
          </div>
        </div>
      </section>

      <!-- 主体 -->
      <section class="container mx-auto px-8 lg:px-16 py-16 relative z-10">
        <div class="flex flex-col lg:flex-row gap-12">

          <!-- 左侧栏 -->
          <aside class="w-full lg:w-64 flex-shrink-0 relative z-20">
            <div class="bg-white sticky top-32 shadow-sm relative">
              <div class="absolute top-0 left-0 w-[3px] h-full bg-sztu-blue"></div>
              <div class="p-8">
                <div class="border-b-[2px] border-primary/10 pb-6 mb-6">
                  <h3 class="text-2xl font-bold text-sztu-blue mb-2">人才培养</h3>
                  <span class="text-sztu-blue font-bold text-xs tracking-widest uppercase block">TALENT DEVELOPMENT</span>
                </div>
                <ul class="space-y-1">
                  <li>
                    <a href="talent-development.html" class="flex items-center gap-4 px-4 py-4 text-sm font-bold text-sztu-blue bg-[#f8f9fb] border-l-2 border-sztu-blue relative -ml-[2px]">
                      <i data-lucide="play-circle" class="w-4 h-4"></i>
                      <span>人才培养</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <!-- 右侧主区 -->
          <div class="flex-1 relative z-10">
            <div class="absolute top-[0px] -right-10 text-[220px] font-black text-gray-200/50 select-none pointer-events-none tracking-tighter -z-10 leading-none" style="font-family: 'Arial Black', Impact, sans-serif;">
              TALENT
            </div>

            <div class="mb-10 relative z-20">
              <h2 class="text-4xl font-serif text-primary mb-2">人才培养</h2>
              <span class="text-primary/40 text-xs font-bold tracking-[0.3em] uppercase block">TALENT DEVELOPMENT</span>
            </div>

            <!-- 视频卡片网格 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">

              <!-- Card 1 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/news-1.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>12:35</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">工匠精神：深技大优秀毕业生纪实</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.11.20</span>
                  </div>
                </div>
              </a>

              <!-- Card 2 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/news-2.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>08:20</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">产教融合：人才培养实践分享</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.11.18</span>
                  </div>
                </div>
              </a>

              <!-- Card 3 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/news-3.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>05:48</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">终身学习：金色年华学员故事</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.11.15</span>
                  </div>
                </div>
              </a>

              <!-- Card 4 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/news-4.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>14:22</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">国际视野：海外交流学员访谈</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.11.10</span>
                  </div>
                </div>
              </a>

              <!-- Card 5 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/news-5.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>09:50</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">技能成才：高级技师认证项目</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.11.05</span>
                  </div>
                </div>
              </a>

              <!-- Card 6 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/event-1.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>11:18</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">双师培养：校企联合导师计划</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.10.28</span>
                  </div>
                </div>
              </a>

              <!-- Card 7 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/event-2.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>16:45</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">创新创业：学院孵化器成果展</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.10.20</span>
                  </div>
                </div>
              </a>

              <!-- Card 8 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/party-feature.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>07:30</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">党建引领：青年党员先锋故事</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.10.15</span>
                  </div>
                </div>
              </a>

              <!-- Card 9 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/event-3.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>10:08</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">乐龄风采：长者学员才艺展示</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.10.08</span>
                  </div>
                </div>
              </a>

              <!-- Card 10 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/event-4.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>13:55</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">学历提升：在职学员成长之路</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.09.28</span>
                  </div>
                </div>
              </a>

              <!-- Card 11 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/campus-overview.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>18:12</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">实训纪实：智能制造实训基地</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.09.20</span>
                  </div>
                </div>
              </a>

              <!-- Card 12 -->
              <a href="article-detail.html" class="group block bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="relative aspect-video overflow-hidden bg-primary/5">
                  <img src="/img/news-academic.jpg" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <i data-lucide="play-circle" class="w-16 h-16 text-white"></i>
                  </div>
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <i data-lucide="play" class="w-3 h-3"></i>
                    <span>22:30</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-serif font-bold text-primary line-clamp-2 group-hover:text-sztu-blue transition-colors min-h-[3rem]">校友回访：杰出校友讲堂实录</h3>
                  <div class="flex justify-end items-center gap-1 mt-3 text-primary/40 text-xs">
                    <i data-lucide="calendar" class="w-3 h-3"></i>
                    <span>2024.09.15</span>
                  </div>
                </div>
              </a>

            </div>

            <!-- 分页 -->
            <div class="flex justify-center items-center gap-2 mt-12">
              <a href="#" class="w-10 h-10 flex items-center justify-center border border-primary/10 text-primary/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </a>
              <a href="#" class="w-10 h-10 flex items-center justify-center bg-primary text-white border border-primary">1</a>
              <a href="#" class="w-10 h-10 flex items-center justify-center border border-primary/10 text-primary/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">2</a>
              <a href="#" class="w-10 h-10 flex items-center justify-center border border-primary/10 text-primary/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">3</a>
              <span class="w-10 h-10 flex items-center justify-center text-primary/30">...</span>
              <a href="#" class="w-10 h-10 flex items-center justify-center border border-primary/10 text-primary/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">5</a>
              <a href="#" class="w-10 h-10 flex items-center justify-center border border-primary/10 text-primary/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
```

- [ ] **Step 3.5：浏览器验证**

```
preview_eval   script: window.location.href = 'http://localhost:3000/talent-development.html'
preview_screenshot
preview_console_logs   limit: 50
```

预期：
- 12 张视频卡片以 3 列网格排列（桌面），单列（移动）
- 每卡片右下角显示时长徽章
- 标题下方右侧显示日期
- hover 卡片：轻微抬起 + 阴影 + 封面放大 + 中央播放按钮淡入
- 控制台无 error

- [ ] **Step 3.6：commit**

```bash
git add talent-development.html
git commit -m "feat: 新增人才培养视频列表页"
```

---

## Task 4 — 创建 `article-detail.html`（通用文章详情页）

**Files:**
- Create: `article-detail.html`

- [ ] **Step 4.1：复制 announcement.html → article-detail.html**

```bash
cp announcement.html article-detail.html
```

- [ ] **Step 4.2：修改 title**

`<title>通知公告 - 深圳技术大学继续教育学院</title>` → `<title>工匠精神：深技大优秀毕业生纪实 - 深圳技术大学继续教育学院</title>`

- [ ] **Step 4.3：替换桌面 nav `<li>`、移动 nav、footer 「快速链接」**

同 Task 2（应用 Snippet A / B / C）。

- [ ] **Step 4.4：替换 `<main>` 区域**

把 `<main class="bg-[#f8f9fb]">` 与 `</main>` 之间所有内容**替换为**：

```html
    <main class="bg-[#f8f9fb]">
      <!-- 简化版 Banner -->
      <section class="relative overflow-hidden z-10 pt-32 pb-16">
        <div class="absolute inset-0 z-0">
          <img src="/img/banner1.jpg" alt="Banner Background" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&amp;fit=crop&amp;q=80&amp;w=2000'; this.onerror=null;" />
          <div class="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-sztu-blue/90"></div>
        </div>
        <div class="container mx-auto px-8 lg:px-16 flex flex-col items-center text-center relative z-10">
          <h2 class="text-3xl lg:text-4xl font-serif font-bold text-white mb-3 tracking-wider drop-shadow-md">人才培养</h2>
          <span class="text-white/80 font-bold text-xs tracking-[0.5em] uppercase block">Talent Development</span>
        </div>
      </section>

      <!-- 面包屑 + 文章卡片 -->
      <section class="container mx-auto px-8 lg:px-16 py-12 relative z-10">
        <div class="max-w-[880px] mx-auto">
          <!-- 面包屑 -->
          <nav class="text-primary/50 text-sm flex items-center gap-2 mb-6">
            <a href="index.html" class="hover:text-primary transition-colors">首页</a>
            <span>›</span>
            <a href="talent-development.html" class="hover:text-primary transition-colors">人才培养</a>
            <span>›</span>
            <span class="text-primary/70">工匠精神：深技大优秀毕业生纪实</span>
          </nav>

          <!-- 文章卡片 -->
          <article class="bg-white shadow-sm p-8 lg:p-12">
            <h1 class="text-3xl lg:text-4xl font-serif font-bold text-primary leading-tight mb-6">
              工匠精神：深技大优秀毕业生纪实
            </h1>

            <!-- 元信息行 -->
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-primary/50 text-sm">
              <span class="flex items-center gap-1.5">
                <i data-lucide="newspaper" class="w-4 h-4"></i>
                <span>来源：学院办公室</span>
              </span>
              <span class="text-primary/20">|</span>
              <span class="flex items-center gap-1.5">
                <i data-lucide="pen-tool" class="w-4 h-4"></i>
                <span>作者：宣传科</span>
              </span>
              <span class="text-primary/20">|</span>
              <span class="flex items-center gap-1.5">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span>点击数：1,234</span>
              </span>
              <span class="text-primary/20">|</span>
              <span class="flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-4 h-4"></i>
                <span>发布时间：2024.11.20</span>
              </span>
            </div>

            <div class="border-t border-primary/10 my-8"></div>

            <!-- 视频占位区 -->
            <div class="relative aspect-video bg-primary/5 flex items-center justify-center">
              <i data-lucide="play-circle" class="w-20 h-20 text-primary/30"></i>
            </div>
            <p class="text-primary/30 text-xs text-center mt-3">演示版本，视频暂未接入</p>

            <div class="border-t border-primary/10 mt-8 mb-6"></div>

            <!-- 返回栏目 -->
            <a href="talent-development.html" class="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-sm">
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
              <span>返回栏目</span>
            </a>
          </article>
        </div>
      </section>
    </main>
```

- [ ] **Step 4.5：浏览器验证**

```
preview_eval   script: window.location.href = 'http://localhost:3000/article-detail.html'
preview_screenshot
preview_console_logs   limit: 50
```

预期：
- 简化 banner 显示「人才培养 / Talent Development」
- 面包屑：首页 › 人才培养 › 工匠精神…
- 标题 + 4 项元信息一行（来源 / 作者 / 点击数 / 发布时间）
- 灰色占位 + 大播放图标 + 「演示版本」文字
- 「返回栏目」按钮

- [ ] **Step 4.6：从详情页点击「返回栏目」**

```
preview_click   selector: a[href="talent-development.html"]
preview_screenshot
```

预期：跳回 talent-development.html。

- [ ] **Step 4.7：commit**

```bash
git add article-detail.html
git commit -m "feat: 新增通用文章详情页模板"
```

---

## Task 5 — 同步 14 个标准页面的桌面 nav

**Files (Modify):** about.html, academic-education.html, announcement.html, college-news.html, events.html, golden-years.html, index.html, leadership.html, organization.html, party-building.html, search-no-results.html, search-results.html, senior-education.html, transportation-guide.html

**做法**：对每个文件用 Edit 工具，把 `<ul class="hidden xl:flex items-center gap-10 text-sm font-bold tracking-widest text-primary/60 uppercase">` 与匹配的 `</ul>` 之间的所有 `<li>...</li>` **替换为 Snippet A**（保持外层 `<ul>` 标签不变）。

> **注意**：某些页面里第一个 `<li>` 的「首页」`<a>` 带额外的 `text-primary` 类（表示当前页高亮），其他页面则没有。Snippet A 中我已去掉这个高亮（保持基础样式）。如果想保留 active 态高亮，**可在替换后再单独把当前页对应 `<a>` 加 `text-primary` 类**，但本次实施跳过此优化（YAGNI）。

- [ ] **Step 5.1：about.html**

Read 文件，定位 `<ul class="hidden xl:flex...">` 起止行；用 Edit 把内部所有 `<li>` 替换为 Snippet A。

- [ ] **Step 5.2：academic-education.html**

同上。

- [ ] **Step 5.3：announcement.html**

同上。

- [ ] **Step 5.4：college-news.html**

同上。

- [ ] **Step 5.5：events.html**

同上。

- [ ] **Step 5.6：golden-years.html**

同上。

- [ ] **Step 5.7：index.html**

同上。

- [ ] **Step 5.8：leadership.html**

同上。

- [ ] **Step 5.9：organization.html**

同上。

- [ ] **Step 5.10：party-building.html**

同上。

- [ ] **Step 5.11：search-no-results.html**

同上。

- [ ] **Step 5.12：search-results.html**

同上。

- [ ] **Step 5.13：senior-education.html**

同上。

- [ ] **Step 5.14：transportation-guide.html**

同上。

- [ ] **Step 5.15：浏览器验证 — 抽 3 个页面看导航**

```
preview_eval   script: window.location.href = 'http://localhost:3000/index.html'
preview_screenshot
preview_eval   script: window.location.href = 'http://localhost:3000/announcement.html'
preview_screenshot
preview_eval   script: window.location.href = 'http://localhost:3000/about.html'
preview_screenshot
```

预期：3 个页面顶部菜单都看到新的 10 项顺序：首页 / 学院概况 / 党建工作 / 学历教育 / 非学历教育 / 人才培养 / 赛事展演 / 新闻通知 / 招生信息 / 场馆信息。

- [ ] **Step 5.16：commit**

```bash
git add about.html academic-education.html announcement.html college-news.html events.html golden-years.html index.html leadership.html organization.html party-building.html search-no-results.html search-results.html senior-education.html transportation-guide.html
git commit -m "feat: 14 个标准页面同步顶部导航（新增招生信息、人才培养，调整顺序）"
```

---

## Task 6 — 同步 14 个标准页面的移动菜单

**Files:** 同 Task 5 的 14 个文件

**做法**：对每个文件，把 `<div class="space-y-2 text-base text-primary">` 内部全部内容替换为 **Snippet B**。

- [ ] **Step 6.1 ~ 6.14：14 个文件依次 Edit**

每个文件操作步骤：
1. Read，定位 `<div class="space-y-2 text-base text-primary">` 行
2. 用 Edit 把这个 div 内部全部内容替换为 Snippet B

对应文件：
6.1 about.html  6.2 academic-education.html  6.3 announcement.html  6.4 college-news.html
6.5 events.html  6.6 golden-years.html  6.7 index.html  6.8 leadership.html
6.9 organization.html  6.10 party-building.html  6.11 search-no-results.html
6.12 search-results.html  6.13 senior-education.html  6.14 transportation-guide.html

- [ ] **Step 6.15：移动端验证**

```
preview_resize   width: 390   height: 844
preview_eval   script: window.location.href = 'http://localhost:3000/index.html'
preview_click   selector: #mobileMenuBtn
preview_screenshot
```

预期：移动端汉堡菜单展开，显示新的 10 项菜单结构（包含招生信息、人才培养）。

- [ ] **Step 6.16：还原桌面尺寸 + commit**

```
preview_resize   width: 1440   height: 900
```

```bash
git add about.html academic-education.html announcement.html college-news.html events.html golden-years.html index.html leadership.html organization.html party-building.html search-no-results.html search-results.html senior-education.html transportation-guide.html
git commit -m "feat: 14 个标准页面同步移动端菜单"
```

---

## Task 7 — 同步 16 个页面的页脚「快速链接」

**Files (Modify):** 14 个标准页 + 2 个 `*_online.html` = 16 个

> **不在此 task 里**：admissions.html / talent-development.html / article-detail.html — 它们在 Task 2/3/4 创建时已就地写入正确的 Snippet C 页脚。

**做法**：
- **A 类（11 个有笔误「快速链」的页面）**：先改标题为「快速链接」，再替换 `<ul>` 为 Snippet C
  - announcement.html、academic-education.html、college-news.html、events.html、golden-years.html、leadership.html、organization.html、search-no-results.html、search-results.html、senior-education.html、transportation-guide.html
- **B 类（5 个标题已是「快速链接」的页面）**：仅替换 `<ul>` 为 Snippet C，不动 `<h4>`
  - about.html、about_online.html、index.html、party-building.html、party-building_online.html

- [ ] **Step 7.1 ~ 7.11：A 类 11 个文件依次处理**

每个文件：
1. Edit：`<h4 class="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-8">快速链</h4>` → `<h4 class="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-8">快速链接</h4>`
2. Edit：紧随的 `<ul class="space-y-4 text-sm text-white/80">...</ul>` → Snippet C

7.1 announcement.html  7.2 academic-education.html  7.3 college-news.html  7.4 events.html
7.5 golden-years.html  7.6 leadership.html  7.7 organization.html  7.8 search-no-results.html
7.9 search-results.html  7.10 senior-education.html  7.11 transportation-guide.html

- [ ] **Step 7.12 ~ 7.16：B 类 5 个文件依次处理**

每个文件：
- Edit：`<ul class="space-y-4 text-sm text-white/80">...</ul>` → Snippet C（`<h4>` 不变）

7.12 about.html  7.13 about_online.html  7.14 index.html  7.15 party-building.html  7.16 party-building_online.html

- [ ] **Step 7.17：抽样验证页脚**

```
preview_eval   script: window.location.href = 'http://localhost:3000/index.html'
preview_eval   script: window.scrollTo(0, document.body.scrollHeight)
preview_screenshot
preview_eval   script: window.location.href = 'http://localhost:3000/announcement.html'
preview_eval   script: window.scrollTo(0, document.body.scrollHeight)
preview_screenshot
```

预期：两个页面页脚都显示「快速链接」标题 + 5 项链接：学院概况 / 学历教育 / 人才培养 / 招生信息 / 新闻动态。

- [ ] **Step 7.18：commit**

```bash
git add about.html about_online.html academic-education.html announcement.html college-news.html events.html golden-years.html index.html leadership.html organization.html party-building.html party-building_online.html search-no-results.html search-results.html senior-education.html transportation-guide.html
git commit -m "feat: 16 个现有页面页脚快速链接同步（含人才培养、招生信息）"
```

---

## Task 8 — 处理 2 个 `*_online.html` 简化页面的桌面 nav

**Files (Modify):** about_online.html, party-building_online.html

**做法**：这两个文件没有移动菜单结构，且原 nav 没有「场馆信息」项。应用 **Snippet D 的规则**：用 Snippet A 的内容替换 `<ul>` 内全部 `<li>`，但**删去最后那个 `<li>场馆信息</li>`**。

具体替换片段（基于 Snippet A，去掉最末尾 `<li>...场馆信息...</li>` 后的版本）：

```html
        <li><a class="hover:text-primary transition-colors" href="index.html">首页</a></li>
        <!-- ... 学院概况 mega menu (照搬 Snippet A) ... -->
        <li><a class="hover:text-primary transition-colors" href="party-building.html">党建工作</a></li>
        <li><a class="hover:text-primary transition-colors" href="academic-education.html">学历教育</a></li>
        <!-- ... 非学历教育 mega menu (照搬 Snippet A) ... -->
        <li><a class="hover:text-primary transition-colors" href="talent-development.html">人才培养</a></li>
        <li><a class="hover:text-primary transition-colors" href="events.html">赛事展演</a></li>
        <!-- ... 新闻通知 mega menu (照搬 Snippet A) ... -->
        <li><a class="hover:text-primary transition-colors" href="admissions.html">招生信息</a></li>
```

> 实施时：把整段 Snippet A 复制进来，删除最后一行 `<li>...场馆信息...</li>` 即可。

- [ ] **Step 8.1：about_online.html**

Read 文件，定位 `<ul class="hidden xl:flex...">`；用 Edit 把内部所有 `<li>` 替换为「Snippet A 去除场馆信息项」的完整内容。

- [ ] **Step 8.2：party-building_online.html**

同上。

- [ ] **Step 8.3：浏览器验证**

```
preview_eval   script: window.location.href = 'http://localhost:3000/about_online.html'
preview_screenshot
preview_eval   script: window.location.href = 'http://localhost:3000/party-building_online.html'
preview_screenshot
```

预期：两个简化页顶部菜单显示新的 9 项顺序（无场馆信息）：首页 / 学院概况 / 党建工作 / 学历教育 / 非学历教育 / 人才培养 / 赛事展演 / 新闻通知 / 招生信息。

- [ ] **Step 8.4：commit**

```bash
git add about_online.html party-building_online.html
git commit -m "feat: 2 个简化版页面同步导航（无场馆信息）"
```

---

## Task 9 — 全站点击校验

**Files:** 无（仅浏览器验证）

- [ ] **Step 9.1：从首页点击两个新菜单项**

```
preview_eval   script: window.location.href = 'http://localhost:3000/index.html'
preview_click   selector: a[href="admissions.html"]
preview_screenshot
preview_console_logs   limit: 30
```

预期：跳转到 admissions.html，显示招生卡片，控制台无 error。

```
preview_eval   script: window.history.back()
preview_click   selector: a[href="talent-development.html"]
preview_screenshot
```

预期：跳转到 talent-development.html，显示 12 张卡片网格。

- [ ] **Step 9.2：测试卡片 → 详情页流转**

```
preview_click   selector: .grid a[href="article-detail.html"]
preview_screenshot
```

预期：跳到 article-detail.html，展示文章模板。

- [ ] **Step 9.3：测试详情页「返回栏目」按钮**

```
preview_click   selector: a[href="talent-development.html"]
preview_screenshot
```

预期：跳回列表页。

- [ ] **Step 9.4：测试页脚链接**

```
preview_eval   script: window.scrollTo(0, document.body.scrollHeight)
preview_screenshot
preview_click   selector: footer a[href="admissions.html"]
preview_screenshot
```

预期：页脚「招生信息」可点击并跳转。

- [ ] **Step 9.5：移动端最终验证**

```
preview_resize   width: 390   height: 844
preview_eval   script: window.location.href = 'http://localhost:3000/talent-development.html'
preview_screenshot
preview_eval   script: window.scrollTo(0, 800)
preview_screenshot
preview_resize   width: 1440   height: 900
```

预期：移动端 12 张卡片单列展示，间距合理，不破版。

- [ ] **Step 9.6：build 检查**

```bash
npm run build
```

预期：构建成功，输出 `dist/` 目录，新页面 admissions.html / talent-development.html / article-detail.html 都被打包。

- [ ] **Step 9.7：检查 build 产物**

```bash
ls dist/*.html
```

预期：列表里能看到 admissions.html、talent-development.html、article-detail.html。

---

## Task 10 — 关闭 dev server 并最终总结

- [ ] **Step 10.1：关闭 preview**

```
preview_stop
```

- [ ] **Step 10.2：核对 git log**

```bash
git log --oneline -10
```

预期：可见若干新 commit（每个 task 一个），含 admissions / talent-development / article-detail / 14 标准页 nav / 14 标准页 mobile / 全站 footer / 2 简化页 nav。

- [ ] **Step 10.3：报告完成**

向用户汇报：
- 新建 3 个页面：admissions.html / talent-development.html / article-detail.html
- 同步 16 个现有页面的导航（含 2 个简化页）、移动菜单（14 个标准页）、页脚（17 个）
- npm run build 通过
- 全站点击通畅

---

## 完成标志

- 桌面 1440px 与移动 390px 两个断点下都能正常浏览
- 顶部菜单点击「招生信息」「人才培养」均可跳转
- 人才培养页 12 张卡片可点击 → 详情页 → 返回栏目
- 控制台无 JavaScript 错误
- `npm run build` 通过，`dist/` 输出 19 个 html 入口（16 现有 + 3 新增）
