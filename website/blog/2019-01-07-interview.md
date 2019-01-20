---
title: 面试
---

## 智保科技

- functionComponent、component、pureComponent、高阶component
  - [pureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
  - [functionComponent](https://www.cnblogs.com/Unknw/p/6431375.html)
- [React Fiber](https://www.jianshu.com/p/bf824722b496)
- [http协商缓存VS强缓存](https://www.jianshu.com/p/95735874c159)
- [面试总结](https://www.jianshu.com/p/42468e63c2b4)


## 京东面试

- [redux的几个概念](https://www.redux.org.cn/)
- [redux思想](https://www.redux.org.cn/docs/introduction/CoreConcepts.html)
- connect的原理，源码 - TODO
- redux thunk的原理，源码 - TODO
- 原型和原型链 - TODO
- [grid布局指南](https://www.css88.com/archives/8510)
- [flex布局指南](https://www.css88.com/archives/8629)
- [一行 CSS 代码实现响应式布局](https://www.css88.com/archives/8706)
- [理解CSS布局和BFC](https://www.w3cplus.com/css/understanding-css-layout-block-formatting-context.html)
> 常见的FC有BFC、IFC（行级格式化上下文），还有GFC（网格布局格式化上下文）和FFC（自适应格式化上下文），这里就不再展开了。

- [前端面试](https://www.css88.com/archives/10069)
- 前端范式化
  - [前端范式化](https://fishedee.com/2017/09/29/%E5%89%8D%E7%AB%AF%E6%95%B0%E6%8D%AE%E8%8C%83%E5%BC%8F%E5%8C%96/)
  - [范式化工具normalizr](https://github.com/paularmstrong/normalizr)
  - [twitter前端架构](https://zhuanlan.zhihu.com/p/29732224)
- [展示组件和容器组件](https://www.jianshu.com/p/6fa2b21f5df3)

## 泡米文化面试
- [从输入url到浏览器显示页面发生了什么](https://www.cnblogs.com/kongxy/p/4615226.html)
- [浏览器兼容性](https://blog.csdn.net/xustart7720/article/details/73604651/)
- [box-sizing](http://www.w3school.com.cn/cssref/pr_box-sizing.asp)
- [组件的生命周期](https://zhuanlan.zhihu.com/p/38030418)
- [8 大前端安全问题（上）](http://web.jobbole.com/92875/)
- [8 大前端安全问题（下）](https://www.jianshu.com/p/9edcda47a04a)

## 安恒信息
- [用户认证](https://www.cnblogs.com/accumulater/p/7723371.html)
- [理解Cookie和Session机制](https://www.cnblogs.com/andy-zhou/p/5360107.html#_caption_12)
- [为什么用Object.prototype.toString.call(obj)检测对象类型?](http://www.cnblogs.com/youhong/p/6209054.html)
- [javascript中判断数据类型的四种方法及typeof、instanceof、constructor、toString](https://blog.csdn.net/liwenfei123/article/details/77978027)
- [图片懒加载](https://www.cnblogs.com/liliangel/p/6122836.html)

## tap4fun
- [HTML5 history API，创造更好的浏览体验](http://acgtofe.com/posts/2014/12/play-with-browser-history)
- [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [location.hash](http://www.cnblogs.com/nifengs/p/5104763.html)
- [react diff算法](https://reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
- [网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713/answer/80089685?utm_campaign=webshare&utm_source=weibo&utm_medium=zhihu)


## 中建电子
- [js小数计算精度问题](https://blog.csdn.net/u013347241/article/details/79210840?from=singlemessage&isappinstalled=0)
- [十进制转化为二进制](https://www.cnblogs.com/xkfz007/articles/2590472.html#undefined)
- [揭秘context](https://zhuanlan.zhihu.com/p/42654080)
- [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

## G7
- [Promise细节](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  - Promise.prototype.then(onFulfilled, onRejected)
    - 添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, __将以回调的返回值来resolve.__
- 无限调用函数
  - 
    ```js
      var sum = 0;
      function add(a){
        sum += a;
        console.log(sum)
        return add;
      }
    ```
- [codeSplit](https://www.jianshu.com/p/9fa38e536033)
- [按需加载](https://segmentfault.com/a/1190000015883378)

## 快牛金科
- [webpack代码分离 ensure 看了还不懂，你打我](https://cnodejs.org/topic/586823335eac96bb04d3e305)
- [Webpack的Code Splitting实现按需加载](https://www.jianshu.com/p/b3b8fb8a2336)

