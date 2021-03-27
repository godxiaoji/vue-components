<template>
  <fx-group title="基础用法">
    <div class="order-box">
      <fx-order v-model:items="items">
        <template #default="{ item }">
          <div class="order-item" :class="[item.type]">
            {{ item.disibledDrag ? '禁止拖动' : '' }}
          </div>
        </template>
      </fx-order>
    </div>
  </fx-group>
  <fx-group title="设置列数">
    <div class="order-box">
      <fx-order v-model:items="items2" :columnNumber="4">
        <template #default="{ item }">
          <div class="order-item" :class="[item.type]"></div>
        </template>
      </fx-order>
    </div>
  </fx-group>
  <fx-group title="允许删除">
    <div class="order-box">
      <fx-order v-model:items="items3" :deletable="true">
        <template #default="{ item }">
          <div class="order-item" :class="[item.type]"></div>
        </template>
      </fx-order>
    </div>
  </fx-group>
</template>

<script>
import { cloneData } from '@/helpers/util'

const items = [
  { id: 1, type: 'primary' },
  { id: 2, type: 'success' },
  { id: 3, type: 'warning' },
  { id: 4, type: 'danger' }
]

export default {
  name: 'Order',
  props: {},
  data() {
    return {
      items: cloneData(items),
      items2: cloneData(items),
      items3: cloneData(items)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.order {
  &-box {
    padding: 13px;
    background-color: #fff;
  }

  &-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 17px;

    &.primary {
      background-color: $primary-color;
    }

    &.success {
      background-color: $success-color;
    }

    &.warning {
      background-color: $warning-color;
    }

    &.danger {
      background-color: $danger-color;
    }
  }
}
</style>
