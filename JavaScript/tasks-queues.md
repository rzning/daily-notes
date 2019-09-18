# JavaScript 宏任务、微任务、事件循环、任务队列

名词解释：

- Tasks 宏任务
- Microtasks 微任务
- Event Loop 事件循环
- Task Queue 任务队列

---

JavaScript 执行代码的顺序是，先执行主线程代码，然后是微任务队列代码，最后是宏任务队列代码，如此循环。

浏览器的方法是宏任务，JavaScript 的是微任务。

宏任务包括：script(全局任务), setTimeout, setInterval, setImmediate, I/O, UI rendering

微任务包括: new Promise().then(回调), process.nextTick, Object.observe(已废弃), MutationObserver(html5新特性)


### 示例

promise 是微任务

setTimeout 是宏任务

```js
setTimeout(() => {
  console.log('1')
})

var p1 = new Promise((resolve, reject) => {
  console.log('2')
  resolve('3')
})

setTimeout(() => {
  console.log('4')
})

p1.then((val) => {
  console.log(val)
})

console.log('5')
```

执行结果： `2,5,3,undefined,1,4`

### 示例 2

```js
setTimeout(() => {
  console.log('1')
  new Promise(resolve => {
    console.log('2')
    setTimeout(() => {
      resolve('3')
    })
  }).then(val => {
    console.log(val)
  })
})

new Promise((resolve, reject) => {
  console.log('4')
  resolve('5')
}).then((val) => {
  console.log(val)
  new Promise(resolve => {
    console.log('6')
    resolve('7')
  }).then(val => {
    console.log('8')
    setTimeout(() => {
      console.log(val)
    })
  })
})

setTimeout(() => {
  console.log('9')
})

console.log('a')
```

执行结果： `4,a,5,6,8,undefined,1,2,9,7,3`

### 参考

- [Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
