# LocalStorage

原本定义的`localStorage`是只有 string 类型的 value。封装的接口支持序列化数据，序列化和反序列化操作由接口内部实现。

## <a name="getStorageSync">Vue.prototype.\$getStorageSync(key)</a>

### 参数

| 参数 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key |

### 返回

any data

key 对应的内容

### 用法

```
try {
  var value = this.$getStorageSync('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
```

## <a name="getStorage">Vue.prototype.\$getStorage(object)</a>

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| key      | string   |        | 是   | 本地缓存中指定的 key                             |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### object.success 回调函数

| 属性 | 类型 | 说明           |
| ---- | ---- | -------------- |
| data | any  | key 对应的内容 |

### 用法

```
this.$getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```

## <a name="setStorageSync">Vue.prototype.\$setStorageSync(key, value)</a>

### 参数

| 参数 | 类型   | 默认值 | 必填 | 说明                                                                         |
| ---- | ------ | ------ | ---- | ---------------------------------------------------------------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key                                                         |
| data | any    |        | 是   | 需要存储的内容。只支持原生类型、Date、及能够通过 JSON.stringify 序列化的对象 |

### 用法

```
try {
  this.$setStorageSync('key', 'value')
} catch (e) { }
```

## <a name="setStorage">Vue.prototype.\$setStorage(object)</a>

### 参数

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                                                         |
| -------- | -------- | ------ | ---- | ---------------------------------------------------------------------------- |
| key      | string   |        | 是   | 本地缓存中指定的 key                                                         |
| data     | any      |        | 是   | 需要存储的内容。只支持原生类型、Date、及能够通过 JSON.stringify 序列化的对象 |
| success  | function |        | 否   | 接口调用成功的回调函数                                                       |
| fail     | function |        | 否   | 接口调用失败的回调函数                                                       |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                             |

### 用法

```
this.$setStorage({
  key: 'key',
  data: 'value'
})
```

## <a name="removeStorageSync">Vue.prototype.\$removeStorageSync(key)</a>

### 参数

| 参数 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key |

### 用法

```
try {
  this.$removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
```

## <a name="removeStorage">Vue.prototype.\$removeStorage(object)</a>

### 参数

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| key      | string   |        | 是   | 本地缓存中指定的 key                             |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### 用法

```
this.$removeStorage({
  key: 'key',
  success (res) {
    console.log(res)
  }
})
```

## <a name="clearStorageSync">Vue.prototype.\$clearStorageSync()</a>

### 用法

```
try {
  this.$clearStorageSync()
} catch(e) {
  // Do something when catch error
}
```

## <a name="clearStorage">Vue.prototype.\$clearStorage([object])</a>

### 参数

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### 用法

```
wx.clearStorage()
```

## <a name="getStorageInfoSync">Vue.prototype.\$getStorageInfoSync()</a>

### 返回

Object object

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| keys        | string | 当前 storage 中所有的 key   |
| currentSize | number | 当前占用的空间大小, 单位 KB |
| limitSize   | number | 限制的空间大小，单位 KB     |

### 用法

```
try {
  const res = this.$getStorageInfoSync()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // Do something when catch error
}
```

## <a name="getStorageInfo">Vue.prototype.\$getStorageInfo([object])</a>

### 参数

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### object.success 回调函数

Object object

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| keys        | string | 当前 storage 中所有的 key   |
| currentSize | number | 当前占用的空间大小, 单位 KB |
| limitSize   | number | 限制的空间大小，单位 KB     |

### 用法

```
this.$getStorageInfo({
  success (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})
```
