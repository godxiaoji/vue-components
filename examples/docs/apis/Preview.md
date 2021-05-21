# Preview 预览类型弹窗

## ImagePreview.previewImage(object)

预览图片。

### Params

Object object

| 属性               | 类型     | 默认值 | 必填 | 说明                                   |
| ------------------ | -------- | ------ | ---- | -------------------------------------- |
| urls               | string[] |        | 是   | 图片地址数组                           |
| current            | string   |        | 否   | 默认显示的图片地址                   |
| showClose          | boolean  | false  | 否   | 是否显示关闭按钮，显示按钮后展示头部栏 |
| navigationButtons  | boolean  | false  | 否   | 是否展示上一页/下一页按钮              |
| imageHighRendering | boolean  | true   | 否   | 高清渲染，开启后图片按物理分辨率展示   |

### Usage

```
import { ImagePreview } from 'vfox'

ImagePreview.previewImage({
  urls: [
    'https://cdn.fox2.cn/vfox/empty/default@2x.png',
    'https://cdn.fox2.cn/vfox/empty/network@2x.png'
  ],
  current: 'https://cdn.fox2.cn/vfox/empty/network@2x.png'
})
```
