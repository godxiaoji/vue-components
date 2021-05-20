<template>
  <div>
    <fx-group title="基础用法">
      <fx-steps v-model:activeIndex="stepIndex">
        <fx-step
          v-for="(item, index) in steps"
          :key="index"
          :title="item.title"
        >
          {{ item.content }}
        </fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="小点模式">
      <fx-steps v-model:activeIndex="stepIndex" dot>
        <fx-step
          v-for="(item, index) in steps"
          :key="index"
          :title="item.title"
        >
          {{ item.content }}
        </fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="自定义图标">
      <fx-steps v-model:activeIndex="stepIndex">
        <fx-step
          v-for="(item, index) in steps"
          :key="index"
          :title="item.title"
        >
          <template #step="{ finish, active }">
            <fx-icon v-if="finish" icon="CheckOutlined"></fx-icon>
            <fx-icon v-else-if="active" icon="LoadingOutlined" spin></fx-icon>
          </template>
          {{ item.content }}
        </fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="横向">
      <fx-steps v-model:activeIndex="stepIndex" horizontal>
        <fx-step
          v-for="(item, index) in steps"
          :key="index"
          :title="item.title"
        >
          {{ item.content }}
        </fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="横向（不要标题 & 小点）">
      <fx-steps :activeIndex="1" horizontal dot>
        <fx-step v-for="(item, index) in orderSteps" :key="index">{{
          item.content
        }}</fx-step>
      </fx-steps>
    </fx-group>
    <fx-group title="Slot title">
      <fx-steps>
        <fx-step title="【珠海市】快件已送达【正方云创园】，感谢您使用中通快递">
          2021-04-13 12:42:57
        </fx-step>
        <fx-step>
          <template #title>
            【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a
            >）
          </template>
          2021-04-13 11:22:16
        </fx-step>
        <fx-step title="【珠海市】快件离开【珠海中心】已发往【珠海一部】">
          2021-04-13 09:04:03
        </fx-step>
      </fx-steps>
    </fx-group>
    <fx-fixed>
      <div class="steps-next">
        <fx-button
          @click="stepIndex = (stepIndex + 1) % steps.length"
          type="primary"
        >
          下一步
        </fx-button>
      </div>
    </fx-fixed>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  data() {
    return {
      stepIndex: 1,

      steps: [
        {
          title: '已完成',
          content: '这一步过了哈'
        },
        {
          title: '进行中',
          content: '目前到这一步'
        },
        {
          title: '待处理',
          content: '还没到这一步'
        }
      ],

      orderSteps: [
        {
          content: '买家下单'
        },
        {
          content: '商家接单'
        },
        {
          content: '商家发货'
        },
        {
          content: '买家提货'
        },
        {
          content: '交易完成'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.steps {
  &-next {
    width: 100vw;
    padding: 12px 16px;
    display: flex;
    box-sizing: border-box;
  }
}
</style>
