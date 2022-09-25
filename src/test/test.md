---
password: 123456
postbg: 1.jpg
h1: { color: red, }
---

## 段落测试
这是一段文本
这是另一段文本

## 标题测试

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
####### 七级标题（暂时不支持）

## 字体样式测试

*斜体*
_斜体_
**粗体**
__粗体__
***粗斜体***
___粗斜体___
~~删除线~~
下滑线（暂无）

## 分隔线

***
* * *
******
- - -
------

## 有序列表

1. 第一项
2. 第二项
3. 第三项


## 无序列表

- 第一项
- 第二项
- 第三项

+ 第一项
+ 第二项
+ 第三项

* 第一项
* 第二项
* 第三项

## 引用

> 这是一段引用
>> 这是一段引用（嵌套）
>>> 这是一段引用（嵌套再嵌套）

## 代码块

```
console.log('hello')
console.log('world')
```

## 链接

这是一个![图片](https://xxx.png)
这是一个[链接](https://xxx.com)
这是一个[音频](https://xxx.mp3)
这是一个[视频](https://xxx.mp4)

## 表格

|表头1|表头2|
|----|----|
|单元格11|单元格12|
|单元格21|单元格22|

## 折叠

使用#region spoiler、#endregion来标记折叠区域

#region
这里是这个区域内的文本

## 二级标题

> 引用内容



#endregion

## 免费信息

使用#region free、#endregion来标记免费信息区域

#region free
这里是免费信息

## 二级标题
#endregion

## 隐藏信息

使用#region hide、#endregion来标记隐藏信息区域

#region hide
不写属性默认回帖查看
#endregion

#region hide=666
积分大于666查看
#endregion

#region hide=d999,666
有效天数999，积分大于666
#endregion