---
title: Workspaces是什么
author: Shiyong Yin
---

感觉vue-cli写得相当不错，想瞅瞅源码，于是就进入package.json中找找main字段吧，因为main
字段就是工程的入口文件嘛。

上下看了三遍，卧槽，没有！

好吧，main字段没有，bin总该有吧。

上下又看了三遍，卧槽，还是没有，唯一可疑的发现了个workspaces字段。

## 寻找

你牛B，那就去npm官网瞅瞅workspaces字段是什么意思吧。

卧槽，无此字段的介绍。瞬间一脸的懵逼。

后来各种搜索why package.json no main keyword，未找到答案


## 结果

最后尝试了下package.json workspaces关键词的搜索，找到了yarn的一篇文章([原文传送门](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/))，柳暗花明又一村了。

大概意思是，随着时间的推移我们的项目会变得越来越大，模块越来越多。这时候有两种解决方案。

1. 将子模块放到其他repo中来进行管理，但是你会发现负担很重，需要多个地方写代码，多个地方处理issue等
2. 将所有模块进行拆分都放到同一个repo钟来管理

## Monorepos

放在同一个repo中来管理的时候通常使用Monorepos的方式来管理此repo，使用这种方式的有很多我们经常使用
的js包，比如Babel, React, Vue, Angular, Jest等

然而，仅仅进行拆分并使用Monorepos管理远远是不够的，比如测试，管理依赖，发布多个包等变得复杂起来。
这是一些工具比如Lerna就派上了用场

## Lerna

Lerna是一个对多个子模块工程管理进行优化的工具。简而言之，Lerna会安装在工程中的每个package，并在
相互依赖的package之间创建软链接。

然而，作为一个包管理的装饰器，Lerna不能有效的控制node_module中的内容。
比如多个子模块都依赖同一个包。Lerna会安装多次而不是一次。


## Workspaces

Workspaces能够让用户根据根package.json中的workspace字段从多个子文件中的package.json中安装以依赖。

例如Jest的例子

工程目录结构如下
```js
| jest/
| ---- package.json //根package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ package.json //子package.json
| -------- jest-diff/
| ------------ package.json
...
```

根package.json内容如下

```json
{
  "private": true,
  "name": "jest",
  "devDependencies": {
    "chalk": "^2.0.1"
  },
  "workspaces": [
    "packages/*"
  ]
}
```

两个字模块中的package.json如下

1. jest-matcher-utils
    ```json
    {
      "name": "jest-matcher-utils",
      "description": "...",
      "version": "20.0.3",
      "license": "...",
      "main": "...",
      "browser": "...",
      "dependencies": {
        "chalk": "^1.1.3",
        "pretty-format": "^20.0.3"
      }
    }
    ```
2. jest-diff (依赖了jest-matcher-utils)
    ``` json
    {
      "name": "jest-diff",
      "version": "20.0.3",
      "license": "...",
      "main": "...",
      "browser": "...",
      "dependencies": {
        "chalk": "^1.1.3",
        "diff": "^3.2.0",
        "jest-matcher-utils": "^20.0.3",
        "pretty-format": "^20.0.3"
      }
    }
    ```

使用Lerno进行安装结果
```js
| jest/
| ---- node_modules/
| -------- chalk/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ---------------- pretty-format/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ---------------- diff/
| ---------------- jest-matcher-utils/  (symlink) -> ../jest-matcher-utils
| ---------------- pretty-format/
| ------------ package.json
...
```
我们可以看到jest-matcher-utils的冗余

使用workpaces进行安装
```
| jest/
| ---- node_modules/
| -------- chalk/
| -------- diff/
| -------- pretty-format/
| -------- jest-matcher-utils/  (symlink) -> ../packages/jest-matcher-utils
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
...
```
我们看到只有一个jest-matcher-utils

## 管理workspaces中的依赖

仅仅使用`yarn add`等命令在workspaces文件家中进行管理即可。

```bash
$ cd packages/jest-matcher-utils/
$ yarn add left-pad
✨ Done in 1.77s.
$ git status
modified: package.json
modified: ../../yarn.lock
```

但是注意，workspaces中无yarn.lock，只在root中含有一个yarn.lock

## 整合workspaces和Lerna

workspaces并没有使Lerna过时

Lerna有他的长处和优点，可以和workspaces共存

Jest使用yarn来启动工程，使用Lerna来发布。



