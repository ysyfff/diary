---
title: HTTP缓存
author: Shiyong Yin
---

## HTTP caching

缓存的种类有很多，大致归为两类：私有与共享缓存。共享缓存能够被多个用户使用。本文主要介绍浏览器与代理缓存，除此之外还有网关
缓存，CDN，反向代理缓存，负载均衡器等部署在服务器上，为站点和web应用提供更好的稳定性、性能和扩展性。 

### 缓存控制 

#### cache-control

HTTP/1.1定义的Cache-Control投用来区分对缓存机制的支持情况，__请求头和响应头都支持这个属性。__
通过它来定义缓存策略。

- 禁止进行缓存
  ```http
  Cache-Control: no-store
  ```
- 强制确认缓存
  ```http
  Cache-Control: no-cache
  ```
- 私有和公共缓存
  ```http
  Cache-Control: private, public
  ```
- 缓存过期机制

  `max-age=<seconds>`相比Expires而言，max-age是距离请求发起的时间的秒数。针对应用中那些不会改变的文件
  通常可以手动设置一定的时长以保证缓存有效，如图片、css、js等静态资源

  ```http
  Cache-Control: max-age=387488400
  ```
- 缓存验证确认

  这就意味着在考虑使用一个陈旧的资源时，必须先验证她的状态，已过期的缓存将不被使用。

  ```http
  Cache-Control: must-revalidate
  ```

  #### Pragma头

  Pragma是HTTP/1.0标准中定义的一个header属性，只能用在头中。作用和cache-control：no-cache相同

### 新鲜度

#### 缓存驱逐

理论上来讲，当一个资源被缓存存储后，改资源可以被永久存储在缓存中。由于缓存只有有限空间，所以将定期删除
以下副本，这个过程叫做__缓存驱逐__。

由于HTTP是C/S模式的协议，服务器更新一个资源时，不可能直接通知客户端及其缓存，所以双方必须为该资源约定
一个过期时间，在此之前是，该资源是新鲜的，在此之后就是陈旧的。

> 一个陈旧的资源是不会被直接清楚或忽略的

> 更新旧资源的过程如下
> - 客户端发起请求，缓存检测到一个对应的旧资源
> - 缓存将此请求附加一个`If-None-Match`头，发送给服务器
>   - 服务器返回304(该响应头不会带有实体信息)，表示此资源副本是新鲜的
>   - 服务器判断已过期，则返回带有实体内容

<svg width="500" height="400">
<path d="M 50 20 V 50 390" stroke="green" />
<text x="25" y="20" font-size="20" fill="blue">client</text>
<path d="M 250 20 V 150 390" stroke="green" />
<path d="M 450 20 V 250 390" stroke="green" />
</svg>

对于含有特定头部信息的请求，会去计算缓存寿命。通常情况下
1. 看max-age
2. 对于不含max-age这个属性的请求则会去查看是否包含Expires属性，通过比较Expires的值和头里面Date属性的值来判断是否缓存还有效
3. 如果Expires也没有，找着头里的Last-Modifyed信息。如果有，缓存的寿命就等于头里面的Date的值减去Last-Modified的值除以10

### 加速资源

不频繁跟新的文件会使用特停的命名方式：在URL后面(通常是文件名后面)会加上版本号。加上版本号后的资源被视作一个完全新的
独立的资源，同时拥有一年伸着更长的缓存过期时长。同时更新的时候不会法伤部分缓存先更新而引起新旧文件内容不一致的问题。

### 缓存验证

用户点击刷新按钮时开始缓存验证。

#### ETags

作为缓存的一种强校验器，ETags响应头是一个队用户代理不透明的值。如果资源请求的响应头里含有ETag，客户端可以在后续的
请求的头中带上If-None-match头来验证缓存。

Last-Modified响应头可以作为一种弱校验器。因为只能精确到一秒。如果响应头里有这个信息，客户端可以在后续的请求的头部带上
If-Modified-Since来做校验

### 带Vary头的响应

```http
Vary: User-Agent
```

当缓存服务器收到一个请求，只有当前的请求和原始的请求头跟缓存的响应头里的Vary都匹配才能使用缓存。

使用Vary头有利于内容服务的动态多样性。如果需要区分移动端和桌面端的展示内容，就可以使用Vary: User-Agent，避免在不同终端展示
错误的布局。

## Expires

> GMT

响应头包含日期/时间，即在此时候之后，响应过期。

无效的日期，比如0，代表过去的日期，即该资源已过期。

如果在Cache-Control中设置了max-age或者s-max-age指令，Expires会被忽略。

## Date

> GMT

Date是一个通用首部，其中包含了消息生成的日期和时间。

## Last-Modified

> GMT

Last-Modified是一个响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。由于精度比ETag要低，
所以这是一个备用机制。包含有If-Modified-Since或If-Unmodifed-Since首部的条件求情会使用这个字段。

## ETag

ETag 响应头是资源的特定版本的标识符。这可以让缓存更高效，并节省贷款，因为如果内容没有变，web服务器
不需要发送完整的响应。如果变了，Etag能有防止资源的同时更新相互覆盖("空中碰撞")。

### 避免"空中碰撞"

ETag与If-Match配合来检测到空中碰撞的编辑冲突

编辑内容是wiki被散列，放入Etag：
```http
Etag: jdoiaj8383838392983ijaojdosdjiojsdij
```

将更改保存到wiki页面时，POST请求中包含有Etag值得If-Match头来检查是否为最新版本

### 缓存为更改的资源

原理上面已经讲到

## 应用缓存appcache

> 专门为离线应用而设计的缓存

appcache是从浏览器缓存中分出来的一块缓存，要想使用该缓存，使用manifest文件

一个applicationCache对象API
applicationCache属性
- status
applicationCache方法
- checking
- error
- noupdate
- downloading
- process
- updateready
- cached

## 离线缓存service worker

- [weather pwa](https://ysyfff.github.io/weather/index.html)

## HTTP2

相对于http1.1有以下不同
- 采用二进制格式
- 完全多路复用
- 报头压缩
- 服务器推送

## HTTPS
```
客户端在使用HTTPS方式与Web服务器通信时有以下几个步骤，如图所示。

　　（1）客户使用https的URL访问Web服务器，要求与Web服务器建立SSL连接。

　　（2）Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。

　　（3）客户端的浏览器与Web服务器开始协商SSL连接的安全等级，也就是信息加密的等级。

　　（4）客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给服务器。

　　（5）Web服务器利用自己的私钥解密出会话密钥。

　　（6）Web服务器利用会话密钥加密与客户端之间的通信。
```


## web storage

>  Web Storage API 提供机制， 使浏览器能以一种比使用Cookie更直观的方式存储键/值对。

## indexedDB

> 虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB提供了一个解决方案。

>IndexedDB 是一种在用户浏览器中持久存储数据的方法。它允许您不考虑网络可用性，创建具有丰富查询能力的可离线 Web 应用程序。