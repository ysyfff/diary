---
title: 流行框架学习对比
author: Shiyong Yin
---

## 有哪些流行的前端框架

我认为目前比较流行的框架或者库主要包含vue, react, angular这三个。

> 排名分先后 :)



## Angular系统结构图

![angular](/diary/img/Angular系统结构图.png)

### 使用心得

#### 缺点

- 双绑对象的初始值在定义变量时设置不生效，只能在ngOnInit里面设置
- 严重依赖ng命令，一般开发都是直接新建文件夹，里面新建个index就可以开始工作了
- 条条框框太多，模拟数据复杂，不仅用到了service，还用到了InMermoryData等
- 使用了rxjs，学习成本较高
- 父子组件之间通信步骤繁琐，子向父传递数据的参数必须是$event?!

#### 优点

- ng是一套工具，有自己的打包工具，方便



