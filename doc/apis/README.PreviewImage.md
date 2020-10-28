# PreviewImage

## <a name="previewImage">Vue.prototype.\$previewImage(object)</a>

预览图片。

### 参数

Object object

| 属性    | 类型     | 默认值 | 必填 | 说明                 |
| ------- | -------- | ------ | ---- | -------------------- |
| urls    | string[] |        | 是   | 图片地址数组         |
| current | string   |        | 是   | 默认显示那张图片地址 |

### 用法

```
this.$previewImage({
  urls: [
    'https://cdn.fox2.cn/vfox/empty/default@2x.png',
    'https://cdn.fox2.cn/vfox/empty/network@2x.png'
  ],
  current: 'https://cdn.fox2.cn/vfox/empty/network@2x.png'
})
```
