# 党建工作页内容删减与交互优化计划

## 总结 (Summary)
根据您的需求，我们将删除党建工作页 (`party-building.html`) 中多余的小标题和装饰文本（如“学习专题”、“通知公告”等），移除 Banner 中的“Red Engine for Excellence”文本，并优化文章卡片和底部翻页按钮的交互体验，使它们在鼠标划入时整体显示为可点击的手型光标（白手套状态）。

## 现状分析 (Current State Analysis)
通过分析 `party-building.html` 文件：
1. 页面中分布着多个小标题文本标签（“学习专题”、“通知公告”、“纪律教育”、“支部风采”）以及操作按钮文本（“Explore More”、“Full Documentation”）。
2. Banner 区域包含带有“Red Engine for Excellence”的装饰性子标题结构。
3. 当前的文章卡片（`<article>`）以及底部的翻页按钮没有整体设置 `cursor-pointer` 类，导致鼠标悬停在卡片空白处时不会显示为手型，必须精确移到标题上才能显示可点击状态。

## 拟定修改 (Proposed Changes)
我们将对 `party-building.html` 执行以下修改：

**1. 删除指定的文字和标签：**
- 移除 `<div class="text-[#A6192E] ... mb-4">学习专题</div>`
- 移除 `<div class="text-[#A6192E] ... mb-4">通知公告</div>`
- 移除 `<a class="... inline-block" href="#">Explore More</a>`
- 移除 `<div class="text-[#C5A059] ... mb-6">纪律教育</div>`
- 移除 `<div class="text-[10px] ... mb-3">支部风采</div>`
- 移除包含 `Full Documentation` 的 `<button>` 标签。
- 移除 Banner 中包含 `Red Engine for Excellence` 的整块 `<div class="flex items-center gap-4 mb-8">...</div>` 代码。

**2. 增加全局手型光标（cursor-pointer）：**
- 针对页面中 5 个 `<article>` 标签，在其 class 列表中统一追加 `cursor-pointer`，让整张卡片在鼠标悬停时均呈现为可点击状态。
- 针对底部翻页区域的 5 个 `<button>`（包括上一页、数字1/2/3、下一页），同样在其 class 列表中追加 `cursor-pointer`。

## 假设与决策 (Assumptions & Decisions)
- **决策**: 对于 Banner 里的 "Red Engine for Excellence"，我们连同其旁边的金色横线修饰元素一起删除，保持排版整洁。
- **假设**: 截图中虽然也圈出了日期的部分（如 "OCT 12, 2024"），但因为您的文字描述中未提及删除日期，因此我们暂不删除日期，严格按照文字列表的内容进行删除。如果后续需要删除，可以再进行调整。

## 验证步骤 (Verification Steps)
1. 执行修改后，在浏览器中刷新页面 `http://localhost:3000/party-building.html`。
2. 确认被指定的 7 处文字（含 Banner 处）已从页面上消失，且排版没有发生错乱。
3. 鼠标划过任意一篇文章卡片的空白处以及底部翻页数字，确认鼠标均能变为手型（手套状态）。