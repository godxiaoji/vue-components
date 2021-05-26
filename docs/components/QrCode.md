# QrCode 二维码

前端渲染二维码组件，本组件使用 [qrcode](https://www.npmjs.com/package/node-qrcode) 插件来进行二维码渲染。

## Props

| 属性    | 类型   | 默认值 | 必填 | 说明                                                                                     |
| ------- | ------ | ------ | ---- | ---------------------------------------------------------------------------------------- |
| text    | string |        | 是   | 二维码文本，可以是 URL                                                                   |
| options | object |        | 否   | 参数，具体可参考 [QR Code options](https://www.npmjs.com/package/qrcode#qr-code-options) |
