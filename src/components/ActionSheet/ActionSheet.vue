<template>
  <drawer
    :class="[prefix + '-action-sheet']"
    ref="popup"
    placement="bottom"
    :visible.sync="visible2"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
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
      <ul :class="[prefix + '-select_list']">
        <li
          :class="[
            prefix + '-select_item',
            prefix + '-horizontal-hairline',
            { disabled: !!item.disabled }
          ]"
          v-for="(item, index) in options2"
          :key="index"
          @click="onItemClick(index)"
        >
          <div
            :class="[
              prefix + '-select_item-inner',
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
      <ul :class="[prefix + '-select_list']">
        <li
          :class="[prefix + '-select_item', prefix + '-horizontal-hairline']"
          @click="onCancelClick"
        >
          <div class="align--center" :class="[prefix + '-select_item-inner']">
            <span>{{ cancelText }}</span>
          </div>
        </li>
      </ul>
    </div>
  </drawer>
</template>

<script>
import Drawer from '../Drawer'
import { SDKKey } from '../../config'
import { isArray, isObject, cloneData } from '../../helpers/util'
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

      this.visible2 = false
    },

    afterSelect() {}
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-action-sheet {
  --action-sheet-highlight-color: #{$danger-color};

  .#{$prefix}-select {
    &_item-inner {
      height: auto;
      min-height: 56px;
      padding: 12px 16px;
      flex-direction: column;
      justify-content: center;
      font-size: 17px;
      line-height: 24px;

      small {
        font-size: 12px;
        color: $font2-color;
        line-height: 17px;
        margin-top: 4px;
      }

      &.highlight span {
        color: var(--action-sheet-highlight-color);
      }
    }
  }

  &_header {
    &::after {
      content: '';
    }
  }

  &_title {
    padding: 8px 16px;
    height: 56px;
    overflow: hidden;
    line-height: 20px;
    font-size: 14px;
    color: $font2-color;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &_footer {
    background-color: $background-color;
    padding-top: 8px;
  }
}
</style>
