<template>
  <div>
    <fx-group title="基础用法">
      <div class="image-grid">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              :aspect-ratio="1"
            ></fx-image>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="填充模式">
      <div class="image-grid">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="scaleToFill"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">scaleToFill</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="aspectFit"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">aspectFit</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="aspectFill"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">aspectFill</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="widthFix"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">widthFix</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="top"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">top</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="bottom"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">bottom</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="left"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">left</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="right"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">right</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="top left"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">top left</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="top right"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">top right</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="bottom left"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">bottom left</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              mode="bottom right"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">bottom right</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="设置宽高比（设置后高度按比例缩放）">
      <div class="image-grid">
        <fx-row :gutter="[16, 16]" align="bottom">
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              :aspect-ratio="1"
            ></fx-image>
            <span class="image-text">aspect-ratio=1</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              :aspect-ratio="1.5"
            ></fx-image>
            <span class="image-text">aspect-ratio=1.5</span>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              :aspect-ratio="0.5"
            ></fx-image>
            <span class="image-text">aspect-ratio=0.5</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="加载/加载错误">
      <div class="image-grid">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="8">
            <fx-image class="image-image" :aspect-ratio="1"></fx-image>
          </fx-col>
          <fx-col :span="8">
            <fx-image
              class="image-image"
              src="error"
              :aspect-ratio="1"
            ></fx-image>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="懒加载">
      <div class="image-grid">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="8">
            <fx-image
              class="image-image"
              :src="imageUrl"
              :aspect-ratio="1"
              lazy-load
            ></fx-image>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'DemoImage',
  props: {},
  data() {
    return { imageUrl: 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg' }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/style/var.scss';

.image {
  &-grid {
    margin-bottom: -16px;
  }

  &-image {
    display: block !important;
    width: 100%;
  }

  &-text {
    display: block;
    font-size: 14px;
    line-height: 24px;
    color: $title-color;
    width: 100%;
    text-align: center;
  }
}
</style>
