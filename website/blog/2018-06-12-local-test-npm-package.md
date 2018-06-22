---
title: NPM包测试之低高级策略
author: Shiyong Yin
---

> 以下操作是基于yarn的，npm同样有效

<div class="update">

## 2018.06.17更

### 原文问题

在之前介绍的三个方法中，虽然第三个方法看上去很完美。但是依然有一个问题。会出现multi package的问题，这是一个什么问题呢？比如我们的实际工程merchant_fe中引入了react，我们引入的q-antd(q-antd是被测试的包)中也引入了react。那么这时就需要在merchant_fe和q-antd都引入react，他们并没有引用同一个react包。

### 高级策略——jest

那么有没更好的方法来解决测试的问题？我们是不是可以换一种思路来解决问题，之前都是通过装包的方式来进行测试。
我们可否不装包就行测试，而是直接对包进行测试呢？

左思右想了下，之前了解过jest，不就是可以用在这种情况下。

于是，引入jest进行尝试。果不其然，完全可以。这才是真正的正解吧，只要我的包通过了各种姿势的测试，就不怕安装的包有问题。

</div>

## 每次发包真的烦

开发一个npm包，偶尔或许经常需要优化下，每次都发包，然后安包，最后再测试，肯定太繁琐了。还有可能遇到愚蠢的错误，比如变量
未定义变量等。

所以，在发包前进行简单或者完整的测试是有必要的，这样也不至于导致我们的包的版本非常多。

## 方法一、使用路径引用包

- 在修改测试包之后是否能够更新的到：能

比如要测试q-antd

```js
import { Form } from 'absoulte_path|relative_path/to/q-antd'
```

这个方法最简单，适用于有个专门的测试工程来做测试这件事情.在实际工程中我们往往是这样引用的

```js
import { Form } from 'q-antd'
```
每次测试完还需要改回来，太愚蠢了。

所以，不建议此方法。


## 方法二、使用pack

- 在修改测试包之后是否能够更新的到：不能，需要再次pack

具体步骤如下
```bash
#!/usr/local/env bash
cd path/to/q-antd
yarn pack
cd path/to/测试工程
yarn add absolute_path|realtive_path/to/q-antd/q-antd-version.tgz
```

`yarn pack`会将q-antd包生成一个tgz压缩包，然后就可以通过yarn来安装了

此方法其实和发布npm类似，没死修改之后都需要执行上面的至少两个步骤。而且每次pack的版本不能相同，否则，新增的内容不会
被引用到

总之，此方法也不行，太麻烦

## 方法三、完美大招——使用link

- 在修改测试包之后是否能够更新的到：能

具体步骤如下

```bash
#!/usr/local/env bash
cd path/to/q-antd
yarn link
cd path/to/测试工程
yarn link q-antd
```

`yarn link`会将q-antd放到node的全局变量里面，所以在目标工程里直接`yarn link q-antd`就可以了。

link一次，使用永久

此乃最佳方法
