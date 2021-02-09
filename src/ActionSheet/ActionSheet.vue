<template>
  <drawer
    class="fx-action-sheet"
    placement="bottom"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div class="fx-action-sheet_header fx-horizontal-hairline" v-if="title">
      <div class="fx-action-sheet_title" v-if="title">
        {{ title }}
      </div>
    </div>
    <div class="fx-action-sheet_body">
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
    </div>
    <div class="fx-action-sheet_footer" v-if="showCancel">
      <ul class="fx-action-sheet_list">
        <li
          class="fx-action-sheet_item fx-horizontal-hairline"
          @click="onCancelClick"
        >
          <div class="fx-action-sheet_item-inner align--center">
            <span>{{ cancelText }}</span>
          </div>
        </li>
      </ul>
    </div>
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
  emits: ['select'],
  methods: {
    onItemClick(index) {
      const detail = {
        item: cloneData(this.options[index]),
        index
      }

      this.$emit('select', detail)
      this.afterSelect(detail)

      this.onUpdateVisible(false)
    },

    afterSelect() {}
  }
}
</script>
