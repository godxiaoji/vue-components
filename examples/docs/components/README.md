# Components 组件

所有组件以 `fx-` 开头，书写方式如下。为保证简洁介绍，后面组件的说明文档都不带前缀。

```
<fx-scroll-view :scroll-y="true"></fx-scroll-view>
```

如果需要修改组件前缀，需要同时修改以下两个文件的值：

- `src/config.js` 的 `SDKKey`
- `src/style/var.sass` 的 `$prefix`
