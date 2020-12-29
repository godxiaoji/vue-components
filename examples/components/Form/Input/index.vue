<template>
  <div>
    <fx-group title="基础用法">
      <fx-input type="text" placeholder="请输入文本" />
      <fx-input type="text" value="禁用" :disabled="true" />
    </fx-group>
    <fx-group title="与 Cell 组合">
      <fx-cell label="文本">
        <fx-input type="text" placeholder="请输入文本" />
      </fx-cell>
    </fx-group>
    <fx-group title="设置 type 类型">
      <fx-cell label="文本">
        <fx-input type="text" placeholder="请输入文本" />
      </fx-cell>
      <fx-cell label="电话">
        <fx-input type="tel" placeholder="请输入电话" />
      </fx-cell>
      <fx-cell label="整数">
        <fx-input type="digit" placeholder="请输入整数" />
      </fx-cell>
      <fx-cell label="数字">
        <fx-input type="number" placeholder="请输入数字" />
      </fx-cell>
      <fx-cell label="搜索">
        <fx-input type="search" placeholder="请输入要搜索的内容" />
      </fx-cell>
      <fx-cell label="密码">
        <fx-input type="password" placeholder="请输入密码" />
      </fx-cell>
      <!-- <fx-cell label="区域文本">
        <fx-input type="textarea" placeholder="请输入密码" />
      </fx-cell> -->
    </fx-group>
    <fx-group title="其他">
      <fx-cell label="只读">
        <fx-input type="text" value="只读文本" :readonly="true" />
      </fx-cell>
      <fx-cell label="禁用">
        <fx-input type="text" value="只读文本" :disabled="true" />
      </fx-cell>
      <fx-cell label="可清除">
        <fx-input
          type="text"
          placeholder="请输入文本"
          value="文本内容"
          :show-clear="true"
        />
      </fx-cell>
    </fx-group>
    <fx-group title="input 事件监听">
      <fx-cell label="文本">
        <fx-input
          type="text"
          placeholder="请输入文本"
          :show-clear="true"
          @input="onInput"
        />
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {},
  data() {
    return {}
  },
  methods: {
    onInput({ value }) {
      this.$showToast(`当前值为：${value}`)
    }
  }
}
</script>


