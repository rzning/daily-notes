# Chokidar

- <https://github.com/paulmillr/chokidar>

> Minimal and efficient cross-platform file watching library

最小且高效的跨平台文件监视库

## Getting Started

```bash
npm install chokidar
```

```js
const chokidar = require('chokidar')

// 针对当前目录的一行程序
chokidar.watch('.').on('all', (event, path) => {
  console.log(event, path)
})
```

## API
