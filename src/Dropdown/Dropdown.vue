<template>
  <div
    class="fx-dropdown fx-popup"
    :class="{ visible: visible2 }"
    :style="popupStyles"
    v-show="isShow"
  >
    <div class="fx-mask" @click="onMaskClick"></div>
    <div class="fx-dropdown_inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import popupMixin from '../util/popup-mixin'
import { selectorValidator } from '../helpers/validator'
import Exception from '../helpers/exception'
import { getElement } from '../helpers/dom'

export default {
  name: 'fx-dropdown',
  mixins: [popupMixin],
  props: {
    selector: {
      validator: selectorValidator,
      requird: true
    }
  },
  data() {
    return {
      top: -1
    }
  },
  computed: {
    popupStyles() {
      const styles = {
        zIndex: this.zIndex,
        top: this.top === -1 ? '100vh' : this.top + 'px'
      }

      return styles
    }
  },
  methods: {
    afterShow() {
      this.updatePos()
    },
    updatePos() {
      const $target = getElement(this.selector)

      if (!$target) {
        console.error(
          new Exception(
            '通过"selector"找不到对应Element.',
            Exception.TYPE.PROP_ERROR,
            'Dropdown'
          )
        )

        return
      }

      const rect = $target.getBoundingClientRect()

      this.top = rect.bottom
    },
    afterHidden() {
      this.top = -1
    }
  }
}
</script>
