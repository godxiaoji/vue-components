<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认">
        <fx-price price="1234.56"></fx-price>
      </fx-cell>
      <fx-cell label="设置符号">
        <fx-price price="1234.56" symbol="￥"></fx-price>
      </fx-cell>
      <fx-cell label="千分位">
        <fx-price price="1234.56" thousands></fx-price>
      </fx-cell>
      <fx-cell label="保留3位小数">
        <fx-price price="1234.56" :decimalDigits="3"></fx-price>
      </fx-cell>
    </fx-group>
    <fx-group title="设置样式">
      <fx-cell label="自定义颜色">
        <fx-price
          class="price-custom-color"
          price="1234.56"
          symbol="￥"
          thousands
        ></fx-price>
      </fx-cell>
      <fx-cell label="自定义大小">
        <fx-price
          class="price-custom-size"
          price="1234.56"
          symbol="￥"
          thousands
        ></fx-price>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Price'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.price {
  &-custom {
    &-color {
      color: $danger-color !important;
    }

    &-size {
      font-size: 32px !important;
    }
  }
}
</style>
