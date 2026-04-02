# 党建工作页右下角文章卡片样式修改计划

## 总结 (Summary)
将党建工作页 (`party-building.html`) 右下角的文章卡片样式进行修改，使其标题在鼠标划入时改变颜色（党建红），并将其背景修改为与左上角文章卡片类似的带图片的背景。

## 现状分析 (Current State Analysis)
目前右下角的文章卡片代码如下：
```html
          <article class="md:col-span-8 flex flex-col md:flex-row gap-8 bg-[#1a1a1a] text-white p-12 relative overflow-hidden group cursor-pointer">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#A6192E] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="flex-1 relative z-10">
              <h3 class="text-3xl font-serif font-bold mb-6">严守政治规矩 筑牢廉洁防线：全院党员干部党风廉政建设专题党课</h3>
              <p class="text-slate-400 text-sm font-light leading-relaxed mb-8">
                会议强调，必须持之以恒正风肃纪，把纪律建设摆在更加突出的位置，构建风清气正的校园政治生态。
              </p>
            </div>
            <div class="w-full md:w-1/3 aspect-[3/4] overflow-hidden relative z-10 shadow-2xl">
              <img alt="News detail" class="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDOCw_8Juv4M9hFICixKIT-gLOKS4JZiskNfddMxiZ12PwXN0L9-8G0PZ1kkr6hCvTXK4pvpS5m449h1VIdeca5Mkx2SR_YZt1DdF5rp-RHzuK-4_MI6NFNG8TAXBzFK39xMlzkSlhtJXRM4GhpVgOaAzyEzuQGBQFV4G73qFRdLljMjkDfkykrAfFDJZEciqS_3-1NpjWtYqGHT7MUHjGv2frzp9ixJ6TNFBDz1BNVFJpSISbcVWrn6RwtVt4JfrwkD_PXQjO0QjR"/>
            </div>
          </article>
```
左上角的文章卡片使用了背景图，且图片有 hover 动效，文字部分叠加在渐变蒙版之上。
```html
          <article class="md:col-span-8 group relative bg-[#1a1a1a] overflow-hidden shadow-2xl cursor-pointer">
            <div class="aspect-video w-full overflow-hidden">
              <img alt="News feature" class="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" src="...">
            </div>
            <div class="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent">
              <div class="flex items-center gap-4 mb-6">
                <span class="bg-[#A6192E] text-white text-[10px] font-bold px-4 py-1 tracking-widest uppercase">Special Report</span>
                <span class="text-slate-400 text-xs tracking-widest">2024.10.24</span>
              </div>
              <h3 class="text-3xl md:text-4xl font-serif font-bold text-white mb-6 group-hover:text-[#C5A059] transition-colors leading-tight">...</h3>
              <p class="text-slate-400 text-sm font-light max-w-2xl leading-relaxed line-clamp-2">...</p>
            </div>
          </article>
```

## 拟定修改 (Proposed Changes)
针对 `party-building.html` 文件中的右下角 `<article>` (第 236 行左右)：

1.  **修改标题 Hover 颜色**：
    将 `<h3>` 标签的 class 从 `text-3xl font-serif font-bold mb-6` 修改为包含 `group-hover:text-[#C5A059] transition-colors` (或者使用党建红 `group-hover:text-[#A6192E]`)。为了与左上角文章保持风格统一，我们采用 `group-hover:text-[#C5A059]` (金色) 或者 `group-hover:text-[#A6192E]` (红色)。由于是党建页面，我们将使用 **党建红 `#A6192E`** 作为 hover 颜色。

2.  **重构卡片布局为带背景图片的样式**：
    *   移除原本右侧独立的 `<div class="w-full md:w-1/3 ..."><img ...></div>` 结构。
    *   移除原本右上角的圆形红色装饰背景 `<div class="absolute top-0 right-0 w-64 h-64 bg-[#A6192E] opacity-10 ..."></div>`。
    *   借鉴左上角文章卡片的结构，将该图片作为整个卡片的背景层。
    *   图片层：`<div class="absolute inset-0 overflow-hidden"><img src="..." class="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" /></div>`。为了保持原本图片的宽高比视觉效果，或者直接让它充满整个背景。这里我们让它铺满整个卡片。
    *   蒙版层：添加一层黑色渐变蒙版，确保白色文字清晰可见。`<div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>`。
    *   文字内容层：将 `<h3>` 和 `<p>` 标签放入一个绝对定位在底部的容器中。

    重构后的结构大致如下：
    ```html
    <article class="md:col-span-8 group relative bg-[#1a1a1a] overflow-hidden shadow-2xl cursor-pointer min-h-[300px]">
      <div class="absolute inset-0 overflow-hidden">
        <img alt="News detail" class="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDOCw_8Juv4M9hFICixKIT-gLOKS4JZiskNfddMxiZ12PwXN0L9-8G0PZ1kkr6hCvTXK4pvpS5m449h1VIdeca5Mkx2SR_YZt1DdF5rp-RHzuK-4_MI6NFNG8TAXBzFK39xMlzkSlhtJXRM4GhpVgOaAzyEzuQGBQFV4G73qFRdLljMjkDfkykrAfFDJZEciqS_3-1NpjWtYqGHT7MUHjGv2frzp9ixJ6TNFBDz1BNVFJpSISbcVWrn6RwtVt4JfrwkD_PXQjO0QjR"/>
      </div>
      <div class="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/90 to-transparent">
        <h3 class="text-3xl font-serif font-bold text-white mb-6 group-hover:text-[#A6192E] transition-colors leading-tight relative z-10">严守政治规矩 筑牢廉洁防线：全院党员干部党风廉政建设专题党课</h3>
        <p class="text-slate-300 text-sm font-light leading-relaxed mb-0 relative z-10 line-clamp-2">
          会议强调，必须持之以恒正风肃纪，把纪律建设摆在更加突出的位置，构建风清气正的校园政治生态。
        </p>
      </div>
    </article>
    ```

## 假设与决策 (Assumptions & Decisions)
*   **决策**: 将右下角卡片的布局完全向左上角看齐（全屏背景图 + 底部渐变蒙版 + 文字），只是不包含左上角的“Special Report”日期等小标签，因为之前要求删除了。
*   **决策**: 标题 hover 颜色选用党建红 `#A6192E`。
*   **决策**: 增加 `min-h-[300px]` 或让其自动撑开一定高度，以确保背景图片有足够的展示空间，这里为了灵活性，保留 `p-12` padding并使用绝对定位撑开。更好的做法是使用跟左上角一样的 `aspect-video` 比例，或者固定一个合理的高度。由于右侧卡片在布局中占据 8 列，给一个固定的纵横比 `aspect-[21/9]` 或者直接设定高度会比较合适。我们暂定使用 `min-h-[360px]` 配合内部 flex 布局来确保结构稳定。

## 验证步骤 (Verification Steps)
1.  保存修改后，刷新浏览器页面。
2.  检查右下角的文章卡片是否变成了全屏背景图的样式。
3.  鼠标悬停在卡片上时，确认背景图片是否有轻微放大并恢复色彩的效果。
4.  确认鼠标悬停时，标题“严守政治规矩...”的颜色变为党建红。