<template>
  <div>
    <fx-group title="基础用法">
      <fx-pagination v-model:current="current" :total="total"></fx-pagination>
    </fx-group>
    <fx-group title="Slot default">
      <fx-pagination v-model:current="current2" :total="total">
        <template #default="{ current }"> 第 {{ current }} 页 </template>
      </fx-pagination>
    </fx-group>
    <fx-group title="Slot prev & next">
      <fx-pagination v-model:current="current3" :total="total">
        <template #prev> 上一页 </template>
        <template #next> 下一页 </template>
      </fx-pagination>
    </fx-group>
    <fx-group title="CSS height=32px">
      <fx-pagination
        style="height: 32px"
        v-model:current="current4"
        :total="total"
      ></fx-pagination>
    </fx-group>
    <fx-group title="事件监听 change">
      <fx-pagination
        v-model:current="current5"
        :total="total"
        @change="onChange"
      ></fx-pagination>
    </fx-group>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'Pagination',
  props: {},
  data() {
    return {
      current: 1,
      current2: 1,
      current3: 3,
      current4: 3,
      current5: 3,
      total: 5
    }
  },
  methods: {
    onChange(e) {
      console.log(e)
      Toast.showToast(`跳转到第 ${e.current} 页`)
    }
  }
}
</script>
