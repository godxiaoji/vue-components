<template>
  <div
    :class="[
      prefix + '-popover',
      prefix + '-pop-menu',
      prefix + '-popup',
      { visible: visible2, 'no--mask': !showMask }
    ]"
    :style="popupStyles"
    v-show="isShow"
  >
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div :class="[prefix + '-popover_inner']" ref="inner" :style="innerStyles">
      <i :class="[prefix + '-popover_arrow']" :style="arrowStyles"></i>
      <div :class="[prefix + '-popover_content']">
        <ul
          :class="[prefix + '-pop-menu_list', prefix + '-pop-menu_list']"
          v-if="options2 && options2.length > 0"
        >
          <li
            :class="[
              prefix + '-pop-menu_item',
              prefix + '-horizontal-hairline',
              { disabled: !!item.disabled }
            ]"
            v-for="(item, index) in options2"
            :key="index"
            @click="onItemClick(index)"
          >
            <div
              :class="[
                prefix + '-pop-menu_item-inner',
                { 'has--icon': item.icon }
              ]"
            >
              <icon v-if="item.icon" :icon="item.icon" />
              <span>{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Popover from './Popover.vue'
import Icon from '../Icon'
import { cloneData, isArray, isObject } from '../helpers/util'
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-pop-menu',
  extends: Popover,
  components: { Icon },
  props: {
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
      const item = this.options[index]

      if (!item || item.disabled) {
        return
      }

      const detail = {
        item: cloneData(item),
        index
      }

      this.$emit('select', detail)
      this.afterSelect(detail)

      this.hide()
    },
    afterSelect() {}
  }
}
</script>
