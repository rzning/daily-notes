# 自实现 Promise

### 版本 1

```js
// 回调函数里面执行 resolve
// then 方法把回调加入 resolveArr 并且改变状态，返回新的 Promise

// 设计模式，算法
// 程序的扩展性和健壮性
// 原理和底层
// 项目经验
// node.js 工具库，中间层

Function.prototype.bind = function (context) {
  var self = this;
  return function () {
    self.apply(context, arguments)
  }
}

function isFunction (fn) {
  if (typeof fn === 'function') {
    return true;
  }
  return false;
}

function myPromise(handle) {
  this.status = 'Pending';
  this.val = void 0;
  this.resolveArr = [];
  this.rejectArr = [];

  this.resolve = function (value) {
    if (this.status !== 'Pending') {
      return;
    }
    this.status = 'Resolve';

    this.val = value;

    var callback;
    setTimeout(() => {
      while (callback = this.resolveArr.shift()) {
        callback(this.val);
      }
    })
  }
  this.reject = function (err) {
    if (this.status !== 'Pending') {
      return;
    }
    this.status = 'Reject'

    this.val = err;
  }

  try {
    handle(this.resolve.bind(this), this.reject.bind(this))
  }
  catch (err) {
    throw err;
  }
}

myPromise.prototype.then = function (onSuccess, onError) {
  var val = this.val;
  var status = this.status;
  return new myPromise((resolve, reject) => {
    var run = function (fn, handle) {
      try {
        if (!isFunction(onSuccess)) {
          fn(onSuccess)
        } else {
          let res = handle(val);
          resolve(res);
        }
      } catch(err) {
        reject(err)
      }
    }

    // let success = function () {
    //   try {
    //     if (!isFunction(onSuccess)) {
    //       resolve(onSuccess)
    //     } else {
    //       let res = onSuccess(value);
    //       resolve(res);
    //     }
    //   } catch(err) {
    //     reject(err)
    //   }
    // }

    // let fail = function () {
    //   try {
    //     if (!isFunction(onSuccess)) {
    //       reject(onSuccess)
    //     } else {
    //       let res = onError(value);
    //       resolve(res);
    //     }
    //   } catch(err) {
    //     reject(err)
    //   }
    // }

    switch (status) {
      case 'Pending':
        this.resolveArr.push(onSuccess);
        break;
      case 'Resolve':
        run(resolve, onSuccess);
        break;
      case 'Reject':
        run(reject, onError);
        break;
    }
  })
}

new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(4);
  }, 2000);
}).then((res) => {
  console.log(res)
})
```
