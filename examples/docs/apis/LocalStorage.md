# LocalStorage

- 原本定义的 `localStorage` 是只有 string 类型的 value 。

- 封装的接口支持序列化数据，序列化和反序列化操作由接口内部实现。

## getStorageSync(key)

### Params

| 参数 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key |

### Return

any data

key 对应的内容

### Usage

```
try {
  const value = this.$getStorageSync('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
```

## getStorage(object)

### Params

Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| key      | string   |        | 是   | 本地缓存中指定的 key                             |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### object.success 回调参数

| 属性 | 类型 | 说明           |
| ---- | ---- | -------------- |
| data | any  | key 对应的内容 |

### Usage

```
this.$getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```

## setStorageSync(key, value)

### Params

| 参数 | 类型   | 默认值 | 必填 | 说明                                                                         |
| ---- | ------ | ------ | ---- | ---------------------------------------------------------------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key                                                         |
| data | any    |        | 是   | 需要存储的内容。只支持原生类型、Date、及能够通过 JSON.stringify 序列化的对象 |

### Usage

```
try {
  this.$setStorageSync('key', 'value')
} catch (e) { }
```

## setStorage(object)

### Params

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                                                         |
| -------- | -------- | ------ | ---- | ---------------------------------------------------------------------------- |
| key      | string   |        | 是   | 本地缓存中指定的 key                                                         |
| data     | any      |        | 是   | 需要存储的内容。只支持原生类型、Date、及能够通过 JSON.stringify 序列化的对象 |
| success  | function |        | 否   | 接口调用成功的回调函数                                                       |
| fail     | function |        | 否   | 接口调用失败的回调函数                                                       |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                             |

### Usage

```
this.$setStorage({
  key: 'key',
  data: 'value'
})
```

## removeStorageSync(key)

### Params

| 参数 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key |

### Usage

```
try {
  this.$removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
```

## removeStorage(object)

### Params

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| key      | string   |        | 是   | 本地缓存中指定的 key                             |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
this.$removeStorage({
  key: 'key',
  success (res) {
    console.log(res)
  }
})
```

## clearStorageSync()

### Usage

```
try {
  this.$clearStorageSync()
} catch(e) {
  // Do something when catch error
}
```

## clearStorage([object])

### Params

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### Usage

```
wx.clearStorage()
```

## getStorageInfoSync()

### Return

Object object

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| keys        | string | 当前 storage 中所有的 key   |
| currentSize | number | 当前占用的空间大小, 单位 KB |
| limitSize   | number | 限制的空间大小，单位 KB     |

### Usage

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

## getStorageInfo([object])

### Params

Object object

| 参数     | 类型     | 默认值 | 必填 | 说明                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### object.success 回调参数

Object object

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| keys        | string | 当前 storage 中所有的 key   |
| currentSize | number | 当前占用的空间大小, 单位 KB |
| limitSize   | number | 限制的空间大小，单位 KB     |

### Usage

```
this.$getStorageInfo({
  success (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})
```
