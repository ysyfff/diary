---
title: 本地测试npm包
author: Shiyong Yin
---

> 以下操作是基于yarn的，npm同样有效

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
