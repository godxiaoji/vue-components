# LocalStorage

- 原本定义的 `localStorage` 是只有 string 类型的 value 。

- 封装的接口支持序列化数据，序列化和反序列化操作由接口内部实现。

## getStorage(key)

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

## setStorage(key, value)

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

## removeStorage(key)

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

## clearStorage()

### Usage

```
try {
  this.$clearStorageSync()
} catch(e) {
  // Do something when catch error
}
```

## getStorageInfo()

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

## createStorage(areaName[, options])

创建指定分区的实例，来维护自身缓存，避免缓存污染全局。

### Params

| 参数    | 类型   | 默认值 | 必填 | 说明                |
| ------- | ------ | ------ | ---- | ------------------- |
| key     | string |        | 是   | 分区名，如 `myArea` |
| options | object |        | 否   | 配置项              |

#### options 的 Params

| 参数         | 类型   | 默认值 | 必填 | 说明            |
| ------------ | ------ | ------ | ---- | --------------- |
| perLimitSize | number | 1024   | 否   | 单次缓存最大 kb |
| limitSize    | number | 2560   | 否   | 分区缓存最大 kb |

### Return

`StorageArea` 实例，可以操作指定分区的本地缓存。

### Usage

```
const myArea = this.$createStorage('myArea', { limitSize: 1000 })
myArea.setStorage('a', 1)
```
