# 党建工作页 Banner 背景修改计划

## 总结 (Summary)
将党建工作页 (`party-building.html`) 的 Banner 区域背景从带有黑色渐变蒙版的图片，修改为纯色的深红色（党建红）背景。

## 现状分析 (Current State Analysis)
目前 `party-building.html` 文件中的 Banner 区域代码如下：
```html
<div class="absolute inset-0">
  <img src="/img/banner1.jpg" alt="党建工作 Banner" class="w-full h-full object-cover grayscale" />
  <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/20"></div>
</div>
```
采用的是灰度图片叠加黑色渐变蒙版，视觉上确实偏暗偏黑，不太符合党建页面的庄重红色氛围。

## 拟定修改 (Proposed Changes)
- **目标文件**: `party-building.html`
- **修改内容**:
  1. 定位到 Banner 背景区域的代码（第 153-156 行左右）。
  2. 移除原有的 `<img src="/img/banner1.jpg" ...>` 标签和黑色的渐变蒙版 `<div>`。
  3. 将背景替换为纯深红色，例如使用 Tailwind 的任意值类 `bg-[#8f111b]` 或页面中已广泛使用的党建红主题色 `bg-[#A6192E]`。为了体现“深红色”，计划使用 `bg-[#8f111b]`。
  4. 修改后的代码结构预计为：
     ```html
     <div class="absolute inset-0 bg-[#8f111b]"></div>
     ```
  5. 保持 Banner 区域的其他元素（如“党建”巨大水印字、白色标题文本等）不变，确保文字在深红背景下依然清晰可见。

## 假设与决策 (Assumptions & Decisions)
- **决策**: 采用 `#8f111b` 作为深红背景色，这比正红色更显稳重，符合党建工作页的调性。
- **假设**: 之前存在的右侧巨大“党建”水印文字（透明度 0.06）和主标题文字（白色）在此纯色背景下仍然保持原样，无需调整颜色。

## 验证步骤 (Verification Steps)
1. 执行修改后，在浏览器中刷新 `http://localhost:3000/party-building.html` 页面。
2. 检查 Banner 区域是否已成功变为纯深红色。
3. 确保 Banner 中的白色文字和排版没有受到影响。