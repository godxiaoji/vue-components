<template>
  <drawer
    :class="[prefix + '-action-sheet']"
    placement="bottom"
    :visible="visible"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div
      :class="[
        prefix + '-action-sheet_header',
        prefix + '-horizontal-hairline'
      ]"
      v-if="title"
    >
      <div :class="[prefix + '-action-sheet_title']" v-if="title">
        {{ title }}
      </div>
    </div>
    <div :class="[prefix + '-action-sheet_body']">
      <ul :class="[prefix + '-action-sheet_list']">
        <li
          :class="[
            prefix + '-action-sheet_item',
            prefix + '-horizontal-hairline',
            { disabled: !!item.disabled }
          ]"
          v-for="(item, index) in options2"
          :key="index"
          @click="onItemClick(index)"
        >
          <div
            :class="[
              prefix + '-action-sheet_item-inner',
              { highlight: item.highlight }
            ]"
          >
            <span>{{ item.name }}</span>
            <small v-if="item.description">{{ item.description }}</small>
          </div>
        </li>
      </ul>
    </div>
    <div :class="[prefix + '-action-sheet_footer']" v-if="showCancel">
      <ul :class="[prefix + '-action-sheet_list']">
        <li
          :class="[
            prefix + '-action-sheet_item',
            prefix + '-horizontal-hairline'
          ]"
          @click="onCancelClick"
        >
          <div
            class="align--center"
            :class="[prefix + '-action-sheet_item-inner']"
          >
            <span>{{ cancelText }}</span>
          </div>
        </li>
      </ul>
    </div>
  </drawer>
</template>

<script>
import Drawer from '../Drawer'
import { SDKKey } from '../config'
import { isArray, isObject, cloneData } from '../helpers/util'
import popupExtendMixin from '../util/popup-extend-mixin'

export default {
  name: SDKKey + '-action-sheet',
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
  data() {
    return {
      prefix: SDKKey
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

      this.$emit('select', detail)
      this.afterSelect(detail)

      this.onUpdateVisible(false)
    },

    afterSelect() {}
  }
}
</script>
