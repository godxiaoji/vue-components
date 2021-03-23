<template>
  <drawer
    class="fx-action-sheet"
    :title="title"
    placement="bottom"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <ul class="fx-action-sheet_list">
      <li
        class="fx-action-sheet_item fx-horizontal-hairline"
        :class="{ disabled: !!item.disabled }"
        v-for="(item, index) in options2"
        :key="index"
        @click="onItemClick(index)"
      >
        <div
          class="fx-action-sheet_item-inner"
          :class="{ highlight: item.highlight }"
        >
          <span>{{ item.name }}</span>
          <small v-if="item.description">{{ item.description }}</small>
        </div>
      </li>
    </ul>
    <ul class="fx-action-sheet_list" v-if="showCancel">
      <li
        class="fx-action-sheet_item fx-horizontal-hairline"
        @click="onCancelClick"
      >
        <div class="fx-action-sheet_item-inner align--center">
          <span>{{ cancelText }}</span>
        </div>
      </li>
    </ul>
  </drawer>
</template>

<script>
import Drawer from '../Drawer'
import { isArray, isObject, cloneData } from '../helpers/util'
import popupExtendMixin from '../util/popup-extend-mixin'

export default {
  name: 'fx-action-sheet',
  components: { Drawer },
  mixins: [popupExtendMixin],
  props: {
    title: {
      type: String,
      default: null
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    options2() {
      if (isArray(this.options)) {
        return this.options.map(v => {
          if (isObject(v)) {
            return cloneData(v)
          }
          return {
            name: v.toString()
          }
        })
      }
      return []
    }
  },
  methods: {
    onItemClick(index) {
      const detail = {
        item: cloneData(this.options[index]),
        index
      }

      this.customConfirm(detail)
    },

    onConfirm(res) {
      this.$emit('confirm', res)
      this.afterConfirm(res)
    },

    afterConfirm() {}
  }
}
</script>
