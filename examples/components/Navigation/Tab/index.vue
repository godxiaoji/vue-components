<template>
  <div>
    <fx-group title="基础用法">
      <div class="tab-box">
        <fx-tab :options="shortTabList" v-model="shortActiveName"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="竖向">
      <div class="tab-box" style="height: 220px;">
        <fx-tab
          :options="shortTabList"
          v-model="shortActiveName"
          :vertical="true"
        ></fx-tab>
      </div>
    </fx-group>
    <fx-group title="滚动（阈值 scrollThreshold = 4）">
      <div class="tab-box">
        <fx-tab :options="tabList" v-model="activeName"></fx-tab>
      </div>
    </fx-group>
    <fx-group title="竖向">
      <div class="tab-box" style="height: 220px;">
        <fx-tab
          :options="tabList"
          v-model="activeName"
          :vertical="true"
        ></fx-tab>
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {},
  data() {
    return {
      shortActiveName: 1,
      activeName: 1,
      shortTabList: [
        {
          value: 1,
          label: '空调'
        },
        {
          value: 2,
          label: '冰箱'
        },
        {
          value: 3,
          label: '洗衣机'
        },
        {
          value: 4,
          label: '热水器'
        }
      ],
      tabList: [
        {
          value: 1,
          label: '空调'
        },
        {
          value: 2,
          label: '冰箱'
        },
        {
          value: 3,
          label: '洗衣机'
        },
        {
          value: 4,
          label: '热水器'
        },
        {
          value: 5,
          label: '洗碗机'
        },
        {
          value: 6,
          label: '油烟机'
        },
        {
          value: 7,
          label: '煤气灶'
        },
        {
          value: 8,
          label: '蒸烤机'
        },
        {
          value: 9,
          label: '电饭锅'
        },
        {
          value: 10,
          label: '电磁炉'
        },
        {
          value: 11,
          label: '净水器'
        },
        {
          value: 12,
          label: '净化器'
        },
        {
          value: 13,
          label: '电风扇'
        },
        {
          value: 14,
          label: '干衣机'
        },
        {
          value: 15,
          label: '电暖气'
        },
        {
          value: 16,
          label: '加湿器'
        },
        {
          value: 17,
          label: '吸尘器'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/style/var.scss';

.tab-box {
  background-color: $background-color;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}
</style>
