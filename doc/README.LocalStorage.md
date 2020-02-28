# LocalStorage

## Vue.prototype.\$getStorage(key)

### 参数

| 参数 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key |

### 返回

key 对应的内容

### 用法

```
try {
  var value = this.$getStorage('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
```

## Vue.prototype.\$setStorage(key, value)

### 参数

| 参数 | 类型   | 默认值 | 必填 | 说明                                                                         |
| ---- | ------ | ------ | ---- | ---------------------------------------------------------------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key                                                         |
| key  | any    |        | 是   | 需要存储的内容。只支持原生类型、Date、及能够通过 JSON.stringify 序列化的对象 |

### 用法

```
try {
  this.$setStorage('key', 'value')
} catch (e) { }
```

## Vue.prototype.\$removeStorage(key)

### 参数

| 参数 | 类型   | 默认值 | 必填 | 说明                 |
| ---- | ------ | ------ | ---- | -------------------- |
| key  | string |        | 是   | 本地缓存中指定的 key |

### 用法

```
try {
  this.$removeStorage('key')
} catch (e) {
  // Do something when catch error
}
```

## Vue.prototype.\$clearStorage()

### 用法

```
try {
  this.$clearStorage()
} catch(e) {
  // Do something when catch error
}
```

## Vue.prototype.\$getStorageInfo()

### 返回

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| keys        | string | 当前 storage 中所有的 key   |
| currentSize | number | 当前占用的空间大小, 单位 KB |
| limitSize   | number | 限制的空间大小，单位 KB     |

### 用法

```
try {
  const res = this.$getStorageInfo()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // Do something when catch error
}
```
