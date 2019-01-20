---
title: 再看高程3
---

## 什么是执行环境

> 执行环境定义了变量或者函数有权访问的其他数据，决定了各自的行为。

__全局执行环境是最外围的一个执行环境__

__每个函数都有一个执行环境__

__当代码在一个环境中执行时，会创建一个作用域链。保证执行环境有权访问的所有变量和函数__

## 作用域链示意

### 代码

```js
var color = 'blue';
function changeColor() {
  var anotherColor = 'red';

  function swapColor() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
  }

  swapColor();
}

changeColor();
```

### 图示

```
window
 |
 +--- color
 |
 +--- changeColor()
        |
        +--- anotherColor
        |
        +--- swapColor()
                |
                +--- tempColor
```     


## this指向问题

```js
window.color = 'red';
var o = {color: 'blue'};
function sayColor(){
  console.log(this.color);
}
sayColor(); //'red'
o.sayColor = sayColor;
o.sayColor(); // 'blue'
```

__由于在函数调用之前,this的值并不确定,因此this可能在执行代码的过程中引用不同的对象__

- 在全局调用，this指向window
- 把函数赋值给o，并调用o.sayColor()，this指向o

## 函数属性和方法

- 每个函数都包含两个属性lenght和prototype
- 每个函数都包含两个非继承来的方法apply和call

```js
function sum(a, b) {
  return a + b;
}
function sum1(a, b) {
  return sum.call(this, a, b);
}

sum1(10, 20) //30
```


> 事实上，传递参数并非call和apply的用武之地；他们真正强大的地方在于能够扩充函数赖以运行的作用域。

```js
var a = [1,2,3];
var b = [5,6,7];
a.push.apply(a, b); // a= [1,2,3,4,5,6]; a.push(b)是达不到这种效果的，用concat也不行
```
## 原型模式

__当调用一个构造函数创建一个实例后，该实例的内部将包含一个指针，指向构造函数的原型对象__

```js
function Person(){
}

Person.prototype.name = 'a';
Person.prototype.say = function() {
  console.log(this.name);
}

person1 = new Person();
```

```
    +-----<---------------------------------------+ 
    |         + --+----> Person Prototype         |
Person        |   |      constructor----------->--+
prototype-->--+   |      name
                  |      say()
                  |
person1           |
[[prototype]]--->-+
```

## 闭包

```javascript
function create(propertyName) {
  return function(obj1, obj2) {
    var value1 = obj1[propertyName];
    var value2 = obj2[propertyName];
  }
}
```
__函数第一次被调用，会创建执行环境和一个作用域链，并使用this,arguments等初始化活动对象__

在匿名函数从create返回后，他的作用于链被初始化为包含create的活动对象和全局变量。在create执行完毕后其活动对象也不会被销毁，__因为匿名函数的作用域链仍在引用这个活动对象__。但是create的执行环境会被销毁。直到匿名函数被销毁后，create的活动对象才会被销毁。

### 闭包的作用

- 模范块级作用域
- 创建私有变量

## 跨浏览器

- css
- dom
- ajax

## Ajax

### 跨域请求的方法
- 图像ping
- jsonp
- cors

### ajax的进一步扩展
- comet
- sse
- websocket


