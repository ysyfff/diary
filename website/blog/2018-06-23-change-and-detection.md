---
title: (译)JS中数据的改变与发现
author: Shiyon Yin
---

[原文传送门](http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)

比较Angular,Ember,React,Backbone的角度有很多，但是也许比较他们是如何管理状态的角度是最有趣的。

## 投影数据

我们可以理解为将我们的数据投影到屏幕上的。比如JS中的对象，数组，字符串是源头，HTML中的forms，links，
buttons，images等是显示屏幕上的内容。

我们称之为渲染过程。我们可以认为是数据到可视化界面的投影。当我们根据数据渲染模板的时候，我们得到了代表了我们
数据的DOM(HTML)。

![onchange_base](/diary/img/onchange_base.svg)

平常来说这是没有什么问题的。

假如数据随着时间的改变而改变的话，这就比较有挑战性了。比如用户的操作导致了数的变化，或者什么发生了什么改变了数据。
UI需要体现出这些变化。__更重要的是，重新构建DOM是花费昂贵的。我们希望最小化的更新节点__

![onchange_change](/diary/img/onchange_change.svg)

这可比只渲染一次UI困难多了，因为牵涉到了状态的变化。我们就从这里探讨上面框架的解决方案与不同之处。

## 服务端渲染：重置全局

> 没有改变，全局不可变

在大JS的时代之前，每一个点击，没一个表单提交，都会将页面unload掉，从后端请求整个渲染的页面，回来之后，再次渲染。
这就是所谓的服务端渲染。

![onchange_reload](/diary/img/onchange_reload.svg)

这种方法前端是不管理任何state的，都由后端处理，前端只是提供下html，css，或许有点点JS。

显而易见这种方法速度很慢
1. UI需要全部渲染
2. 需要走后端请求，一去一回要不少时间

## 第一代JS：手动重新渲染

> 我不知道哪些应该重新渲染，你来搞明白

总的来说，数据改变，发出事件，重新渲染UI你来决定。

第一代框架如backbone, ext, dojo第一次在浏览器中引入了data model，同时也是第一次
我们需要改变state在浏览器端。__data model的内容改变之后需要你来获取改变然后改变UI__.
__数据改变的时候回触发一些事件__，但是重新渲染UI是你的责任。

![onchange_manual](/diary/img/onchange_manual.svg)

到底是渲染一大部分还是渲染一小部分就由你来决定了。灵活性很大，但同时不要忘了性能。

## 手动重新渲染解决方案

### Ember.js：数据绑定

> 我知道什么变化了，也知道哪里需要重新渲染，因为我控制了model和view

总的来说，通过我设计的API来控制Model

和backbone一样，Ember也会在数据改变的时候发出事件，不同的是，我们把UI绑定到data model上，
也就是说，有一个数据变化的监听器，在监听器里可以和UI做绑定。这个监听器知道在接收到数据变化的时候
如何更新UI。(我们可以通过watch来获得变化，并进行UI的绑定)

![onchange_kvo](/diary/img/onchange_kvo.svg)

__最大的不好的地方是，Ember必须永远知道数据的变化，这就要求我们使用Ember设计的一套API。__

### AngularJS：脏检查

> 我不知道什么发生了改变，所以我就检查下所有地方好了

虽然AngularJS也在着手解决手动重新渲染的问题，但是它是从另一个角度解决问题的。

当我们通过angular模板渲染`{{foo.x}}`的时候，angular不仅渲染数据，还为这个特殊的值创建了的一个watcher，
从此以后，只要有变化，它就检查watcher中的值是否变了，如果变了就在UI中重新渲染这个值。整个过程就是脏检查。

![onchange_watch](/diary/img/onchange_watch.svg)

不好的地方就是，当改变发生的时候，angular并没有深入的探测到具体是哪个数据发生了改变。所以，只要一有情况发生，
所有的watcher都要跑一遍。

听起来这是个性能的噩梦，但实际上还是挺快的，因为仅仅是纯JS的逻辑执行，没有牵涉到DOM的更新。但是当UI十分庞大的时候，
或者需要频繁渲染的时候，额外的优化技巧就是必须的了。

另外提一下，ES7中的Object.observe对Ember和Angular会十分有帮助，因为这给出了原生的watching在属性的改变上面。

### React：VirtualDOM

> 我不知道发生了哪些改变，所以我就重新渲染下，看看与之前有什么不同

React和Angular类似，不需要data modal API的支持。那么React是如何根据数据的变化来解决UI的更新的呢？

React好像将我们带到了服务端渲染的方式。React的做法是从头到尾的渲染了整个UI。

这听起来是低效的，如果这就是故事的结尾，那确实是。然而，React 用了特殊的方法进行重新渲染。

当React UI进行渲染的时候，它首先渲染到Virtual DOM里面，并不是真正的DOM，而是一个轻量级的，纯粹的对象和数组的
JavaScript数据结构，这个数据结构代表了真实的DOM对象图。然后一个单独的进程采用该DOM结构在屏幕上渲染出真实的DOM结构。

![onchange_vdom_initial](/diary/img/onchange_vdom_initial.svg)

当数据改变的时候，一个新的Virtual DOM被从头的创建。新的Virtual DOM中包含了变化的值。React从这两个Virtual DOM执行
diff算法。来获取变化的地方。而且只有那些被改变的地方才会被真实DOM重新渲染。

![onchange_vdom_change](/diary/img/onchange_vdom_change.svg)

### Immutable-js

尽管React的Virtual DOM已经很快了，但是在UI很大或者需要频繁渲染的时候还是会出现瓶颈。

问题是真的没有方法能够渲染整个DOM，(UI太大渲染不过来，渲染太快，还没渲染完就需要渲染洗一次了)。除非想Ember一想引入
一套data model API。

一个有效的解决的方法就是使用immutable，这和React的Virtual DOM很般配。

immutable是这么一个原理。正如他的名字一样，你永远不能直接改变一个对象，当时我们可以基于这个对象产生一个新的版本。

使用immutable的意义就是，我们可以重复使用上次Virtual DOM的那些没有改变的Virtual DOM部分。

![onchange_immutable](/diary/img/onchange_immutable.svg)

像Ember一样，我们不能使用原生JS对象，必须使用额外的API。但是不同点在于，这次并不是框架的需要，我们使用它因为这是一种
更好的管理state的方法。这不仅提高新性能，而且是一种文化的象征。

## 总结

对改变的发现是UI渲染的核心问题，JS库通过各种各样的途径来解决这个问题。

EmberJS能够检测到变化，当他们发生的时候，因为EmberJS通过API控制了Model和View，当你调用他们的时候你可以触发事件。

AngularJS在变化之后去检测变化，通过re-running在UI中所有的绑定来看看值是否发生了改变。

纯React通过re-render whole UI到一个Virtual DOM然后和就得版本比较来获得改变。不管发生了什么，都补丁到真实DOM上。

有immutable的React加强了纯React，通过让component快速标记那些没有改变来提升速度，这是性能的选择，同时也是文化的选择。


