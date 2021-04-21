<template>
  <div>
    <fx-group title="基础用法">
      <fx-input type="text" placeholder="请输入文本" />
      <fx-input type="text" modelValue="禁用" :disabled="true" />
      <fx-input type="text" placeholder="showLimit=true" showLimit showClear />
    </fx-group>
    <fx-group title="textarea">
      <fx-input type="textarea" placeholder="showLimit=true" showLimit />
    </fx-group>
    <fx-group title="与 Cell 组合">
      <fx-cell label="文本">
        <fx-input type="text" placeholder="请输入文本" />
      </fx-cell>
    </fx-group>
    <fx-group title="设置 type 类型">
      <fx-cell label="文本 text">
        <fx-input type="text" placeholder="请输入文本" />
      </fx-cell>
      <fx-cell label="电话 tel">
        <fx-input type="tel" placeholder="请输入电话" />
      </fx-cell>
      <fx-cell label="整数 digit">
        <fx-input type="digit" placeholder="请输入整数" />
      </fx-cell>
      <fx-cell label="数字 number">
        <fx-input type="number" placeholder="请输入数字" />
      </fx-cell>
      <fx-cell label="搜索 search">
        <fx-input type="search" placeholder="请输入要搜索的内容" />
      </fx-cell>
      <fx-cell label="密码 password">
        <fx-input type="password" placeholder="请输入密码" />
      </fx-cell>
      <fx-cell label="文本 textarea">
        <fx-input type="textarea" placeholder="请输入多行文本" />
      </fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell label="只读 readonly">
        <fx-input type="text" modelValue="只读文本" :readonly="true" />
      </fx-cell>
      <fx-cell label="禁用 disabled">
        <fx-input type="text" modelValue="只读文本" :disabled="true" />
      </fx-cell>
      <fx-cell label="可清除 showClear">
        <fx-input
          type="text"
          placeholder="请输入文本"
          modelValue="文本内容"
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
          v-model="value"
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
    return { value: '' }
  },
  methods: {
    onInput({ value }) {
      this.$showToast(`当前值为：${value}`)
    }
  }
}
</script>
