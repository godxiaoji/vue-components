<template>
  <div>
    <fx-group title="基础用法">
      <div class="slider-box">
        <fx-slider />
      </div>
    </fx-group>
    <fx-group title="显示数值">
      <div class="slider-box">
        <fx-slider show-value />
      </div>
    </fx-group>
    <fx-group title="自定义颜色">
      <div class="slider-box">
        <fx-slider class="slider-custom-color" show-value />
      </div>
    </fx-group>
    <fx-group title="限制范围">
      <div class="slider-box">
        <fx-slider show-value :min="min" :max="max" v-model="value" />
      </div>
    </fx-group>
    <fx-group title="设置步进（step=5）">
      <div class="slider-box">
        <fx-slider show-value step="5" />
      </div>
    </fx-group>
    <fx-group title="禁用">
      <div class="slider-box">
        <fx-slider disabled />
      </div>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="input"><fx-slider @input="onInput"/></fx-cell>
      <fx-cell label="change"><fx-slider @change="onChange"/></fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {},
  data() {
    return {
      min: 50,
      max: 150,
      value: null
    }
  },
  methods: {
    onInput({ value }) {
      this.$showToast(`Input value: ${value}`)
    },
    onChange({ value }) {
      this.$showToast(`Change value: ${value}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.slider {
  &-box {
    padding: 0 16px;
  }

  &-custom-color {
    --slider-track-active-color: #{$danger-color} !important;
    --slider-track-color: #{$danger-background-color} !important;
  }
}
</style>
