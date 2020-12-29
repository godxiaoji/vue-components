<template>
  <div>
    <fx-group title="基础用法">
      <fx-nav-bar title="标题"></fx-nav-bar>
    </fx-group>
    <fx-group title="显示返回按钮">
      <fx-nav-bar title="标题" :show-back="true"></fx-nav-bar>
    </fx-group>
    <fx-group title="展示首页按钮">
      <fx-nav-bar title="标题" :show-back="true" :show-home="true"></fx-nav-bar>
    </fx-group>
    <fx-group title="展示右侧按钮">
      <fx-nav-bar
        title="标题"
        :show-back="true"
        :show-home="true"
        :right-buttons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      ></fx-nav-bar>
    </fx-group>
    <fx-group title="按钮带文本">
      <fx-nav-bar
        title="标题"
        :show-back="true"
        :show-home="true"
        :right-buttons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      ></fx-nav-bar>
      <fx-nav-bar
        title="标题"
        :show-back="true"
        :only-icon="false"
        :right-buttons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      ></fx-nav-bar>
    </fx-group>
    <fx-group title="固定顶部">
      <div class="navBar-fixed">
        上下滑动观察最顶部的导航
      </div>
    </fx-group>
    <fx-group title="事件监听">
      <fx-nav-bar
        title="标题双击"
        :show-back="true"
        :show-home="true"
        :right-buttons="[{ icon: 'MenuOutlined', text: '菜单' }]"
        @back-click="onBack"
        @home-click="onBackHome"
        @title-dbclick="onTitle"
        @right-button-click="onRightButtonClick"
      >
      </fx-nav-bar>
    </fx-group>
    <fx-group title="Slot left / right">
      <fx-nav-bar
        title="标题"
        :right-buttons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      >
        <template #left>
          <div class="navBar-left"></div>
          Left Slot</template
        >
      </fx-nav-bar>
      <fx-nav-bar title="标题" :show-back="true" :show-home="true">
        <template #right><div class="navBar-right">Right Slot</div></template>
      </fx-nav-bar>
      <fx-nav-bar title="标题" :show-back="true" :show-home="true">
        <template #left
          ><div class="navBar-left">
            <fx-button type="primary" icon="LeftOutlined" size="small"
              >返回</fx-button
            >
          </div></template
        >
        <template #right
          ><div class="navBar-right">
            <fx-button type="primary" icon="MenuOutlined" size="small"
              >菜单</fx-button
            >
          </div>
        </template>
      </fx-nav-bar>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {},
  data() {
    return { text: 1 }
  },
  methods: {
    onBack() {
      this.$showToast('返回按钮点击')
    },
    onBackHome() {
      this.$showToast('首页按钮点击')
    },
    onTitle() {
      this.$showToast('标题双击')
    },
    onRightButtonClick({ icon, text, index }) {
      this.$showDialog({
        title: '右侧按钮点击',
        showCancel: false,
        content: `icon: '${icon}'\ntext: '${text}'\nindex: ${index}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/component.module.scss';

.navBar {
  &-fixed {
    padding: 12px 16px;
    font-size: 14px;
    color: $font-color;
    line-height: 20px;
    text-align: center;
  }

  &-left {
    margin-left: 16px;
  }

  &-right {
    margin-right: 16px;
  }
}
</style>
