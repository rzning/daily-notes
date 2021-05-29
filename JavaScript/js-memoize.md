# JavaScript 记忆函数

```js
/**
 * @param {(...args: any[]) => any} func 
 * @param {any} context 
 */
 function memoize (func, context) {
  const cache = Object.create(null)
  context = context || func
  return (...args) => {
    const key = JSON.stringify(args)
    if (key in cache) {
      return cache[key]
    }
    const result = func.apply(context, args)
    cache[key] = result
    return result
  }
}
```


## 相关帖子

- [nodejs 函数缓存库 memoizeOne 和 micro-memoize Memoizee - 阿豪boy的个人空间 - OSCHINA](https://my.oschina.net/ahaoboy/blog/3173910)