# http-browserify

- <https://github.com/browserify/http-browserify>

用于浏览器的 http 模块。

## example

```js
var http = require('http')

http.get({ path: '/beep' }, function (res) {
  var elem = document.getElementById('result')
  elem.innerHTML += 'GET /beep<br/>'

  res.on('data', function (buf) {
    elem.innerHTML += buf
  })

  res.on('end', function () {
    elem.innerHTML += '<br>__END__'
  })
})
```
