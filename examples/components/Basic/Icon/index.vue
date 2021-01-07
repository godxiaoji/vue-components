<template>
  <div>
    <fx-group title="基础用法">
      <div class="icon-grid">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-icon class="icon-icon" class-name="UpOutlined"></fx-icon>
            <span class="icon-text">UpOutlined</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon" class-name="DownOutlined"></fx-icon>
            <span class="icon-text">DownOutlined</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon" class-name="LeftOutlined"></fx-icon>
            <span class="icon-text">LeftOutlined</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon" class-name="RightOutlined"></fx-icon>
            <span class="icon-text">RightOutlined</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="大小">
      <div class="icon-grid">
        <fx-row :gutter="[16, 16]" align="bottom">
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-16"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">16px</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-24"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">24px</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-32"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">32px</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-40"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">40px</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="颜色">
      <div class="icon-grid">
        <fx-row :gutter="[16, 16]" align="bottom">
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-primary"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">蓝色</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-success"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">绿色</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-warning"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">橙色</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-danger"
              class-name="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">红色</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/style/var.scss';

.icon {
  &-grid {
    padding: 16px 16px 0;
  }

  &-icon {
    display: block !important;
    margin: 0 auto;

    &.size-16 {
      --size: 16px;
    }

    &.size-24 {
      --size: 24px;
    }

    &.size-32 {
      --size: 32px;
    }

    &.size-40 {
      --size: 40px;
    }

    &.color-primary {
      --color: #{$primary-color};
    }

    &.color-success {
      --color: #{$success-color};
    }

    &.color-warning {
      --color: #{$warning-color};
    }

    &.color-danger {
      --color: #{$danger-color};
    }
  }

  &-text {
    display: block;
    font-size: 12px;
    line-height: 18px;
    color: $title-color;
    width: 100%;
    text-align: center;
    margin-top: 8px;
  }
}
</style>
