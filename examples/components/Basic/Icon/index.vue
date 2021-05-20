<template>
  <div>
    <fx-group title="基础用法">
      <div class="icon-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-icon class="icon-icon" icon="UpOutlined"></fx-icon>
            <span class="icon-text">UpOutlined</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon" icon="DownOutlined"></fx-icon>
            <span class="icon-text">DownOutlined</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon" icon="LeftOutlined"></fx-icon>
            <span class="icon-text">LeftOutlined</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon" icon="RightOutlined"></fx-icon>
            <span class="icon-text">RightOutlined</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="大小">
      <div class="icon-flex">
        <fx-row :gutter="[16, 16]" align="bottom">
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-16"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">16px</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-24"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">24px</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-32"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">32px</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon size-40"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">40px</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="颜色">
      <div class="icon-flex">
        <fx-row :gutter="[16, 16]" align="bottom">
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-primary"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">蓝色</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-success"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">绿色</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-warning"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">橙色</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-danger"
              icon="CheckCircleOutlined"
            ></fx-icon>
            <span class="icon-text">红色</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="颜色">
      <div class="icon-flex">
        <fx-row :gutter="[16, 16]" align="bottom">
          <fx-col :span="6">
            <fx-icon class="icon-icon color-primary" :icon="QqSvg"></fx-icon>
            <span class="icon-text">QQ</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-success"
              :icon="WechatSvg"
            ></fx-icon>
            <span class="icon-text">微信</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon
              class="icon-icon color-warning"
              :icon="TaobaoSvg"
            ></fx-icon>
            <span class="icon-text">淘宝</span>
          </fx-col>
          <fx-col :span="6">
            <fx-icon class="icon-icon color-danger" :icon="WeiboSvg"></fx-icon>
            <span class="icon-text">微博</span>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import TaobaoSvg from './svgs/taobao.svg'
import QqSvg from './svgs/qq.svg'
import WechatSvg from './svgs/wechat.svg'
import WeiboSvg from './svgs/weibo.svg'

export default {
  name: 'Icon',
  setup() {
    return {
      TaobaoSvg: markRaw(TaobaoSvg),
      QqSvg: markRaw(QqSvg),
      WechatSvg: markRaw(WechatSvg),
      WeiboSvg: markRaw(WeiboSvg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.icon {
  &-flex {
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
