<template>
  <div>
    <!-- <input type="checkbox" name="" id="test" /> -->
    <fx-group title="基础用法">
      <fx-cell label="默认">
        <fx-checkbox />
      </fx-cell>
      <fx-cell label="带文案">
        <fx-checkbox v-model:checked="checked">勾选</fx-checkbox>
      </fx-cell>
      <fx-cell label="默认激活">
        <fx-checkbox checked>勾选</fx-checkbox>
      </fx-cell>
      <fx-cell label="禁用">
        <fx-checkbox disabled>勾选</fx-checkbox>
      </fx-cell>
    </fx-group>
    <fx-group title="CheckboxGroup">
      <fx-cell label="默认">
        <fx-checkbox-group v-model="groupValue">
          <fx-checkbox v-for="item in groups" :key="item" :value="item">{{
            item
          }}</fx-checkbox>
        </fx-checkbox-group>
      </fx-cell>
      <fx-cell label="内联">
        <fx-checkbox-group inline>
          <fx-checkbox v-for="item in groups" :key="item" :value="item">{{
            item
          }}</fx-checkbox>
        </fx-checkbox-group>
      </fx-cell>
      <fx-cell label="禁用">
        <fx-checkbox-group :modelValue="['A']" disabled>
          <fx-checkbox v-for="item in groups" :key="item" :value="item">{{
            item
          }}</fx-checkbox>
        </fx-checkbox-group>
      </fx-cell>
    </fx-group>
    <fx-group title="CheckboxGroup + Cell">
      <fx-checkbox-group v-model="groupValue">
        <fx-cell v-for="item in groups" :key="item" :label="'单元格 ' + item">
          <template #icon>
            <fx-checkbox circle :value="item" />
          </template>
        </fx-cell>
      </fx-checkbox-group>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="change">
        <fx-checkbox-group @change="onChange">
          <fx-checkbox value="A">A</fx-checkbox>
          <fx-checkbox value="B">B</fx-checkbox>
          <fx-checkbox value="C">C</fx-checkbox>
        </fx-checkbox-group>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'Checkbox',
  data() {
    return { checked: false, groupValue: ['A', 'C'], groups: ['A', 'B', 'C'] }
  },
  methods: {
    onChange({ value }) {
      Toast.showToast(`Change Value: ${value}`)
    }
  }
}
</script>
