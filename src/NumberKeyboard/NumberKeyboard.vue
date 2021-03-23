<template>
  <drawer
    class="fx-number-keyboard"
    placement="bottom"
    :visible="visible"
    :showMask="false"
    :title="title"
    :showConfirm="showHeaderConfirm"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div @click.stop="noop">
      <div class="fx-number-keyboard_body" :class="bodyClasses">
        <ul class="fx-number-keyboard_list">
          <li
            class="fx-number-keyboard_item"
            :class="['span-' + (item.span || 1)]"
            v-for="(item, index) in numberList"
            :key="index"
          >
            <div class="fx-number-keyboard_button" @click="onNumberClick(item)">
              <icon v-if="item.icon" :icon="item.icon"></icon>
              <template v-else>{{ item.text }}</template>
            </div>
          </li>
        </ul>
        <div
          class="fx-number-keyboard_right-column"
          v-if="type === 'rightColumn'"
        >
          <div class="fx-number-keyboard_backspace">
            <div
              class="fx-number-keyboard_button"
              @click="onNumberClick({ type: 'backspace' })"
            >
              <icon icon="BackspaceOutlined"></icon>
            </div>
          </div>
          <div class="fx-number-keyboard_confirm">
            <div
              class="fx-number-keyboard_confirm-button"
              @click="onConfirmClick"
            >
              完成
            </div>
          </div>
        </div>
      </div>
    </div>
  </drawer>
</template>

<script>
import Icon from '../Icon'
import Drawer from '../Drawer'
import { inArray, isStringArray, isString } from '../helpers/util'
import popupExtendMixin from '../util/popup-extend-mixin'

const TYPE_NAMES = ['default', 'rightColumn']

export default {
  name: 'fx-number-keyboard',
  components: { Drawer, Icon },
  mixins: [popupExtendMixin],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    },
    // 键盘模式
    type: {
      type: String,
      default: 'default'
    },
    // 自定义键盘额外的键
    customKey: {
      type: [Array, String],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      cacheValue: ''
    }
  },
  computed: {
    bodyClasses() {
      return [
        `type--${inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]}`,
        { 'has--header': this.showHeaderConfirm || this.title }
      ]
    },
    numberList() {
      const list = []

      for (let i = 1; i <= 9; i++) {
        list.push({
          text: i.toString(),
          type: 'text'
        })
      }

      const customKey = isString(this.customKey)
        ? [this.customKey]
        : isStringArray(this.customKey)
        ? this.customKey
        : []

      if (this.type === 'rightColumn') {
        if (customKey.length > 1) {
          list.push(
            {
              text: customKey[0],
              type: 'text'
            },
            { text: '0', type: 'text' },
            {
              text: customKey[1],
              type: 'text'
            }
          )
        } else if (customKey.length > 0) {
          list.push(
            { text: '0', type: 'text', span: 2 },
            {
              text: customKey[0],
              type: 'text'
            }
          )
        } else {
          list.push({ text: '0', type: 'text', span: 3 })
        }
      } else {
        if (customKey.length > 0) {
          list.push(
            {
              text: customKey[0],
              type: 'text'
            },
            { text: '0', type: 'text' }
          )
        } else {
          list.push(
            { text: '完成', type: 'confirm', icon: 'KeyboardOutlined' },
            { text: '0', type: 'text' }
          )
        }

        list.push({
          text: '删除',
          type: 'backspace',
          icon: 'BackspaceOutlined'
        })
      }

      return list
    },

    showHeaderConfirm() {
      return (
        this.type !== 'rightColumn' &&
        (isString(this.customKey) ||
          (isStringArray(this.customKey) && this.customKey.length > 0))
      )
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  methods: {
    noop() {},

    afterShown() {
      this.cacheValue = (isString(this.modelValue) && this.modelValue) || ''
    },

    onNumberClick(item) {
      if (item.type === 'text') {
        this.cacheValue += item.text
        this.$emit('input', {
          key: item.text
        })
        this.$emit('update:modelValue', this.cacheValue)
      } else if (item.type === 'backspace') {
        const deleteKey = this.cacheValue.substr(-1)
        this.cacheValue = this.cacheValue.substr(0, this.cacheValue.length - 1)
        this.$emit('delete', { deleteKey })
        this.$emit('update:modelValue', this.cacheValue)
      } else if (item.type === 'confirm') {
        this.customConfirm({})
      }
    },

    onConfirm() {
      const detail = {
        confirm: true,
        value: this.cacheValue
      }

      this.cacheValue = ''

      this.$emit('close', detail)
      this.afterConfirm(detail)
    },

    onConfirmClick() {
      this.customConfirm({})
    },

    onCancel(res) {
      const detail = Object.assign(
        {
          cancel: true,
          value: this.cacheValue
        },
        res
      )

      this.cacheValue = ''

      this.$emit('close', detail)
      this.afterCancel(detail)
    },

    afterConfirm() {}
  }
}
</script>
