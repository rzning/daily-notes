
# Promise

`Promise` 对象用于一个异步操作的完成或失败及其结果的表示。

### 语法

```js
new Promise(
    // executor
    function(resolve, reject) { ... }
);
```

参数：

- `executor` : `function(resolve, reject)`
  - executor 是一个带有 `resolve` 和 `reject` 两个参数的函数。
  - executor 函数在 `Promise` 构造函数执行时同步执行。
  - `resolve` 函数被调用时，将 `Promise` 状态改为 `fulfilled` 完成状态。
  - `reject` 函数被调用时，将 `Promise` 的状态改为 `rejected` 失败状态。

### 描述

`Promise` 对象可以代理一个异步操作，有以下三种状态：

- `pending` : 初始未定状态。
- `fulfilled` : 操作成功完成状态。
- `rejected` : 操作失败状态。

一个 `Promise` 对象的状态只能从 `pending` 变为 `fulfilled` 或从 `pending` 变为 `rejected` 状态。

一个 `Promise` 对象的状态一旦改变，就已定型（`resolved`）不可改变。


### 示例

```js
var myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    }, 1000);
});
myPromise.then((message) => {
    console.log(message);
})
// 1s后输出：hello
```

### :one: `chen()`

添加肯定和否定回调到当前 Promise, 返回一个新的 Promise 对象，可链式调用。

#### `Promise.prototype.then(onFulfilled, onRejected)`

- `onFulfilled` : 成功回调。
- `onRejected` : 否定回调。

```js
function myPromise(state, time) {
    var p = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state) resolve('success.'); 
            else reject('failed.');
        }, 1000 * time);
    });
    p.then(
        message => console.log('fulfilled.', message),
        message => console.log('rejected.', message)
    );
}

myPromise(true, 1); // 1s后输出：fulfilled. success.
myPromise(false, 2); // 2s后输出：rejected. failed.
```

### :two: `catch()`

添加一个否定 `rejection` 回调到当前 promise, 返回一个新的 Promise 对象，可链式调用。

`catch()` 方法用于你的 Promise 组合中的错误处理。

#### `Promise.prototype.catch(onRejected)`

- `onRejected` : 否定回调。

```js
function myPromise(state, time) {
    var p = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state) resolve('success.'); 
            else reject('failed.');
        }, 1000 * time);
    });
    p.then(
        message => console.log('fulfilled.', message)
    ).catch(
        message => console.log('rejected.', message)     
    );
}

myPromise(true, 1); // 1s后输出：fulfilled. success.
myPromise(false, 2); // 2s后输出：rejected. failed.
```

### 参考

- [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise 对象 - ECMAScript 6入门 | 阮一峰](http://es6.ruanyifeng.com/#docs/promise)
