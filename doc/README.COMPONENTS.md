# Components 组件

组件列表，持续更新。

所有组件以 `fx-` 开头，书写方式如下。为保证简洁介绍，后面组件的说明文档都不带前缀。

```
<fx-scroll-view :scroll-y="true"></fx-scroll-view>
```

如果需要修改组件前缀，需要同时修改以下两个文件的值：

- `src/config.js` 的 `SDKKey`
- `src/components/component.module.sass` 的 `$prefix`

## <a name="基础组件">基础组件</a>

[ScrollView](./components/README.ScrollView.md)

[Swiper](./components/README.Swiper.md)

[SwiperItem](./components/README.SwiperItem.md)

[Icon](./components/README.Icon.md)

## <a name="表单组件">表单组件</a>

[Form](./components/README.Form.md)

[Button](./components/README.Button.md)

[Input](./components/README.Input.md)

[Radio](./components/README.Radio.md)

[RadioGroup](./components/README.RadioGroup.md)

[Checkbox](./components/README.Checkbox.md)

[CheckboxGroup](./components/README.CheckboxGroup.md)

[Select](./components/README.Select.md)

[SelectOption](./components/README.SelectOption.md)

[Cascader](./components/README.Cascader.md)

[Slider](./components/README.Slider.md)

[Switch](./components/README.Switch.md)

## <a name="导航组件">导航组件</a>

[BackToTop](./components/README.BackToTop.md)

## <a name="媒体组件">媒体组件</a>

[Image](./components/README.Image.md)

## <a name="提示组件">提示组件</a>

[Toast](./components/README.Toast.md)

[Modal](./components/README.Modal.md)
