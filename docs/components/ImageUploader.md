# ImageUploader 图片上传

- 类似于微信朋友圈上传图片的组件。
- 可以配合 [Form](./Form.md) 和 [FormItem](./Form.md#formitem-表单项) 使用。

## Props

| 属性          | 类型     | 默认值       | 必填 | 说明                                                                           |
| ------------- | -------- | ------------ | ---- | ------------------------------------------------------------------------------ |
| v-model       | string[] |              | 是   | 已上传的图片 URL 列表                                                          |
| accept        | string   |              | 否   | 默认 'all', 可选 'jpg' 'jpeg' 'png' 'webp'，目前移动端图片类型不多，限制比较死 |
| column-number | number   | 3            | 否   | 渲染列数，同 [Order](./Order.md) 组件                                          |
| max-count     | number   | 9            | 否   | 文件上传数量限制，上传中/上传失败也会占一个坑位                                |
| preview       | boolean  | true         | 否   | 是否在点击缩略图后展示全屏图片预览                                             |
| disabled      | boolean  | false        | 否   | 是否禁用文件上传                                                               |
| multiple      | boolean  | false        | 否   | 是否开启图片多选，部分安卓机型不支持                                           |
| deletable     | boolean  | true         | 否   | 是否允许删除图片                                                               |
| image-mode    | string   | 'aspectFill' | 否   | 图片的填充模式，通 [Image](./Image.md) 组件的 mode 属性                        |
| before-upload | Function |              | 否   | 文件读取前的回调函数，返回 false 或 Promise<false\> 可终止文件上传              |
| upload-ready  | Function |              | 否   | 转入上传文件操作的回调函数                                                     |

### beforeUpload(file: File, handlers: Object) => boolean | file | Promise<boolean | file\>

通过传入 beforeUpload 函数可以在上传前进行校验和处理，返回 false 或 Promise<false\> 表示校验失败。

也可以返回修改过的 file 对象，如果压缩图片等。

#### beforeUpload 的 handlers 提供的方法

| handlers 方法       | 参数返回                 | 说明                                            |
| ------------------- | ------------------------ | ----------------------------------------------- |
| handlers.formatSize | (size: number) => string | 把图片的文件大小数值转为可读的，如 10MB, 10.5KB |

```
<fx-image-uploader :beforeUpload="onBeforeUpload" />
```

```
export default {
  methods: {
    onBeforeUpload(file, { formatSize }) {
      if (file.size > 1024 * 1024) {
        Toast.showToast(`上传图片不能大于 ${formatSize(1024 * 1024)}`)
        return false
      }
      Toast.showToast(`上传图片大小为 ${formatSize(file.size)}`)
    }
  }
}
```

### uploadReady(file: File, handlers: Object) => void

在该节点中将文件上传至服务器。

| handlers 方法         | 参数返回                      | 说明                                            |
| --------------------- | ----------------------------- | ----------------------------------------------- |
| handlers.getUploadId  | () => number                  | 获取图片上传分配的唯一值                        |
| handlers.formatSize   | (size: number) => string      | 把图片的文件大小数值转为可读的，如 10MB, 10.5KB |
| handlers.setUploading | (message: string) => void     | 设置图片上传状态为上传中                        |
| handlers.success      | (url: string) => void         | 设置图片上传状态为上传成功，传入接口返回的 URL  |
| handlers.fail         | (e: Error \| string ) => void | 设置图片上传状态为上传失败，传入错误信息        |

PS：整个上传流程分为 3 个阶段：reading -> uploading -> uploaded | failed，handlers 提供的改变状态方法是不可逆的。

```
<fx-image-uploader :uploadReady="onUpload" />
```

```
export default {
  methods: {
    onUpload(file, handlers) {
      handlers.setUploading('上传中...')

      setTimeout(() => {
        customGetFileUrl(file).then(url => {
          if (Math.random() > 0.5) {
            handlers.fail('模拟失败')
          } else {
            handlers.success(url)
          }
        })
      }, 2000)
    }
  }
}
```

## Events

| 事件   | 描述                        | 回调函数参数                                                         |
| ------ | --------------------------- | -------------------------------------------------------------------- |
| delete | 图片被删除时触发            | { index: number, item: { id: number, status: string, url: string } } |
| change | 已上传的图片 URL 列表改变时 | { value: string[] }                                                  |

### delete 的回调参数 item

| 值     | 类型   | 说明                                                 |
| ------ | ------ | ---------------------------------------------------- |
| id     | number | 图片上传项分配的唯一值                               |
| status | string | reading(uploadReady 后)，uploading，uploaded，failed |
| url    | string | 图片 URL 地址                                        |
