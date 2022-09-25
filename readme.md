# Markdown to BBSCode

该项目用于扩展mcbbs论坛富文本编辑器，主要基于markdown的语法并扩展了论坛独有的语法功能，实现了快速书写的功能。

## 功能
- markdown转bbcode
- 主题配置
- 双栏布局
- 快速模板填充
- 颜色拾色器
- 代码片段
- 代码折叠
- 目录生成
- 修复论坛若干bug

## 语法
插件是基于markdown语法扩展的，因此请先熟悉markdown语法的功能（包括GFM那部分的扩展），自行索引，这里就不提供了。插件扩展语法为本插件自行设计的，请务必认真阅读。

> 注意：这里扩展了link的语法，如果是media或audio开头的，会被转换成论坛对应的标签，例如[](audio:8945678) -> [audio]8945678[/audio]

### 1. 区域
使用region来声明一个作用域，支持嵌套和连续配置，支持的配置选项包括：
|选项|类型|说明|
|---|---|---|
|free|boolean|帖子免费信息|
|hide|boolean|隐藏信息|
|align|enum left\|center\|right|文字排布方式|
|float|enum left\|center\|right|文字浮动方式|
|bold|boolean|粗体，简写b|
|italic|boolean|斜体，简写i|
|underline|boolean|下划线，简写u|
|strikethrough|boolean|删除线，简写s|
|color|string|文字颜色，支持十六进值和web颜色名称|
|backcolor|string|背景颜色，支持十六进值和web颜色名称|
|font|string|字体|
|size|1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| string|字体大小|
|table|string|表格宽度|
|tablerow|string|表格颜色|
|tablecell|string|单元格宽度|
|inline|boolean|设置当前区域为内敛块|

### 2. 配置
使用 `---` 来声明一个配置作用域，里面语法是yaml，可以配置多个，后面的会继承上一个配置，可以使用空配置重置配置

接口如下：
FontStyle
|字段|类型|说明|
|---|---|---|
|color|string|字体颜色
|backcolor|string|字体背景色
|font|string|字体
|bold|boolean|粗体
|italic|boolean|斜体
|underline|boolean|下划线
|strikethrough|boolean|删除线
|inline|boolean|文本内敛
|align|left\|center\|right|文本排版方式
|size|1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| string|字体大小

Config
|字段|类型|说明|
|---|---|---|
|password|string|帖子密码
|postbg|string|背景图片
|h1|FontStyle|一级标题
|h2|FontStyle|二级标题
|h3|FontStyle|三级标题
|h4|FontStyle|四级标题
|h5|FontStyle|五级标题
|h6|FontStyle|六级标题
|text|FontStyle|正文
|strong|FontStyle|粗体
|em|FontStyle|斜体
|del|FontStyle|删除线
|paragraph|FontStyle|段落
|link|FontStyle|链接
|list|FontStyle|列表
|listitem|FontStyle|列表项
|table|string|表格（宽度）
|tablerow|string|表格-行（颜色）
|tablecell|string|表格-单元格（宽度）

### 3. 目录
使用 `===` 来分页，后面可以声明目录的说明（不写默认目录x），例如：
```
===

=== 这里是目录xxx
```

## 修复论坛若干bug
- 修复工具栏吸顶的问题
- 修复引用块图片加载问题
- 修复表格边框颜色和发布不一致的问题
- 修复表格默认宽度100%和发布不一致的问题
- 修复点击常用时部分按钮动画鬼畜的问题
- 修复使用浮动布局和发布不一致的问题
- 修复背景色和发布不一致的问题
- 增强图片弹窗，点击数字复制文件标示

## LICENSE
[MIT](./LICENSE)