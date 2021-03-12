<template>
  <div>
    <fx-group title="基础用法">
      <fx-search-bar></fx-search-bar>
    </fx-group>
    <fx-group title="搜索建议">
      <fx-search-bar @input="onInput"></fx-search-bar>
    </fx-group>
    <fx-group title="显示取消按钮">
      <fx-search-bar show-cancel></fx-search-bar>
    </fx-group>
    <fx-group title="设置候选项">
      <fx-search-bar :placeholders="placeholders"></fx-search-bar>
    </fx-group>
    <fx-group title="深色适配">
      <fx-search-bar
        class="search-bar-dark-style"
        show-cancel
        ghost
      ></fx-search-bar>
    </fx-group>
    <fx-group title="只读（readonly=true）">
      <fx-search-bar readonly :placeholders="placeholders"></fx-search-bar>
    </fx-group>
    <fx-group title="事件监听">
      <fx-search-bar
        show-cancel
        :placeholders="placeholders"
        @input="onInput2"
        @focus="onEvent"
        @blur="onEvent"
        @cancel="onCancel"
        @search="onSearch"
      >
      </fx-search-bar>
    </fx-group>
    <fx-group title="事件监听（readonly=true）">
      <fx-search-bar
        readonly
        :placeholders="placeholders"
        @click="onClick"
      ></fx-search-bar>
    </fx-group>
  </div>
</template>

<script>
import { placeholders } from './data'

export default {
  name: 'SearchBar',
  props: {},
  data() {
    return { text: 1, placeholders }
  },
  methods: {
    onCancel() {
      this.$showToast('取消按钮点击')
    },
    onEvent({ type }) {
      this.$showToast(type)
    },
    onInput(e, fn) {
      fn(
        e.text
          ? 'ABCD'.split('').map(v => {
              return {
                text: `${e.text} ${v}`,
                tags: ['tag1', 'tag2']
              }
            })
          : []
      )
    },
    onInput2(e, fn) {
      this.$showToast(`输入了 ${e.text}`)

      this.onInput(e, fn)
    },
    onSearch({ text }) {
      this.$showToast(`搜索了 ${text}`)
    },
    onClick(e) {
      console.log(e)
      this.$showToast(`搜索词 ${e.searchText}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.search-bar {
  &-dark-style {
    background: $danger-color;
  }
}
</style>
