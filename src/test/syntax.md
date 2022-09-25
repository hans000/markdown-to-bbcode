---
postbg: 2.jpg
h2: { color: "#ffcc44", bold: true }
h3: { color: "#007acc", bold: true }
paragraph: { size: 4 }
strong: { color: "#43a047" }
---

## 前言

经过前期的调研，最后决定开发油猴插件来增强论坛的编辑器，主要原因如下
- 现在需求不太明了，还是先选一个比较可以快速迭代的方式，如果效果好可以考虑移植
- 本人没有谷歌开发者账号，认证要$5；仅提供.crx离线安装包还要解压安装，小白可能不会操作

## 正篇

整体的交互是使用md语法，在此基础上会扩展一些论坛独有的功能（例如：设置背景、密码等，后面会详细列出）。

## md语法
不知道的可以搜索引擎关键字**markdown语法**，这里不详细展开了

## 扩展语法
以下内容为本人暂定的语法规则，也是本次要重点讨论的，希望大家认真阅读。

> 被采纳的意见，会获得一定人气奖励

### 1.设置生成规则
使用---来包裹yml语法，用于设置生成规则，具体如下
```
// 用于设置背景样式
postbg: 1.jpg
// 用于设置帖子密码
password: 123456
// 标签名做属性，用于设置具体标签的样式，具体如下

h1?: FontStyle          // 一级标题
h2?: FontStyle          // 二级标题
h3?: FontStyle          // 三级标题
h4?: FontStyle          // 四级标题
h5?: FontStyle          // 五级标题
h6?: FontStyle          // 六级标题
text?: FontStyle        // 文本
strong?: FontStyle      // 粗体
em?: FontStyle          // 斜体
del?: FontStyle         // 删除线
paragraph?: FontStyle   // 段落
link?: FontStyle        // 链接

// FontStyle被定义为如下
interface FontStyle {
    color?: string
    backcolor?: string
    font?: string
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    size?: 2 | 3 | 4 | 5 | 6 | 7
}
```
例如本次帖子样式配置
```
---
postbg: 2.jpg
h2: { color: "#ffcc44", bold: true }
h3: { color: "#007acc", bold: true }
paragraph: { size: 4 }
---
```

### 2.区域
使用**#region #endregion**来声明一块区域，对应论坛的折叠、免费信息和隐藏信息
```
// 语法如下
#region [属性]
[内容主体]
#endregion

// 例子
#region
默认属性为空为折叠功能，生成[spoiler][/spoiler]
#endregion

#region free
free属性生成[free][/free]
#endregion

#region hide
hide属性默认回帖查看
#endregion

#region hide=666
hide属性后跟数字，积分大于666查看
#endregion

#region hide=d999,666
有效天数999，积分大于666
#endregion
```

### 3.视频、音频
这里扩展了原生md link的语法，用于区分链接、视频和音频
```
[](audio:https://foo.mp3)
[](media:https://foo.flv)
```

## 一些待定的功能
- 文字对齐方式（居左、中、右）
- 文字内联的样式（颜色，背景色，大小，字体等；感觉用的不多）
- 文字下划线
- 目录，分页（个人还没用过）
- 表格属性设置（直接魔改md的语法难度比较大，可能采用---声明的方式设置）
- ...

## 最后
贴出本子生成的帖子的源文件
