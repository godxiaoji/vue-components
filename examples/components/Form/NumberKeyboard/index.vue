<template>
  <div>
    <fx-group title="基础键盘">
      <fx-cell label="默认键盘" isLink @click="visible1 = true">
        <fx-number-keyboard
          :visible.sync="visible1"
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        ></fx-number-keyboard>
      </fx-cell>
      <fx-cell
        label="带小数点（customKey='.'）"
        isLink
        @click="visible2 = true"
      >
        <fx-number-keyboard
          :visible.sync="visible2"
          customKey="."
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        ></fx-number-keyboard>
      </fx-cell>
      <fx-cell label="身份证（customKey='X'）" isLink @click="visible3 = true">
        <fx-number-keyboard
          :visible.sync="visible3"
          customKey="X"
          @input="onInput"
          @delete="onDelete"
          @confirm="onClose"
        ></fx-number-keyboard>
      </fx-cell>
    </fx-group>
    <fx-group title="带右侧栏键盘">
      <fx-cell label="默认键盘" isLink @click="visible4 = true">
        <fx-number-keyboard
          :visible.sync="visible4"
          type="rightColumn"
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        ></fx-number-keyboard>
      </fx-cell>
      <fx-cell
        label="1个自定义值（customKey=['.']）"
        isLink
        @click="visible5 = true"
      >
        <fx-number-keyboard
          :visible.sync="visible5"
          type="rightColumn"
          customKey="."
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        ></fx-number-keyboard>
      </fx-cell>
      <fx-cell
        label="2个自定义值（customKey=['00', '.']）"
        isLink
        @click="visible6 = true"
      >
        <fx-number-keyboard
          :visible.sync="visible6"
          type="rightColumn"
          :customKey="['00', '.']"
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        ></fx-number-keyboard>
      </fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell label="设置标题" isLink @click="visible7 = true">
        <fx-number-keyboard
          title="键盘标题"
          :visible.sync="visible7"
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        ></fx-number-keyboard>
      </fx-cell>
      <fx-form-item
        name="number"
        label="双向绑定"
        @click.native="visible8 = true"
      >
        <fx-input v-model="value" readonly />
        <fx-number-keyboard
          :visible.sync="visible8"
          v-model="value"
        ></fx-number-keyboard>
      </fx-form-item>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'NumberKeyboard',
  props: {},
  data() {
    return {
      value: '',

      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false
    }
  },
  methods: {
    onInput({ key }) {
      this.$showToast(key)
    },

    onDelete() {
      this.$showToast('删除')
    },

    onClose(res) {
      console.log('close', res)

      this.$showToast(`输入值为：${res.value}`)
    }
  }
}
</script>
