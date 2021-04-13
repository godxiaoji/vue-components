<template>
  <div>
    <fx-group title="基础用法">
      <fx-steps v-model:activeIndex="activeIndex">
        <fx-step title="成功获得0.01元收益" content="搞半天就这点？"></fx-step>
        <fx-step title="十天后到账" content="0.01元还要十天到账？"></fx-step>
        <fx-step title="爱要不要" content="不要了，滚。"></fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="小点样式">
      <fx-steps v-model:activeIndex="activeIndex" dot>
        <fx-step title="成功获得0.01元收益" content="搞半天就这点？"></fx-step>
        <fx-step title="十天后到账" content="0.01元还要十天到账？"></fx-step>
        <fx-step title="爱要不要" content="不要了，滚。"></fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="自定义图标">
      <fx-steps v-model:activeIndex="activeIndex">
        <fx-step
          icon="DownOutlined"
          title="成功获得0.01元收益"
          content="搞半天就这点？"
        ></fx-step>
        <fx-step
          icon="DownOutlined"
          activeIcon="HeartOutlined"
          title="十天后到账"
          content="0.01元还要十天到账？"
        ></fx-step>
        <fx-step
          icon="DownOutlined"
          title="爱要不要"
          content="不要了，滚。"
        ></fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="Slot">
      <fx-steps dot>
        <fx-step content="2021-04-13 12:42:57">
          <template #title>
            【珠海市】快件已送达【正方云创园】，如有疑问请电联：<a
              href="tel:10000"
              >10000</a
            >，感谢您使用中通快递
          </template>
        </fx-step>
        <fx-step content="2021-04-13 11:22:16">
          <template #title>
            【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a
            >）
          </template>
        </fx-step>
        <fx-step
          title="【珠海市】快件离开【珠海中心】已发往【珠海一部】"
          content="2021-04-13 09:04:03"
        ></fx-step>
      </fx-steps>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {},
  data() {
    return {
      activeIndex: 1
    }
  }
}
</script>
