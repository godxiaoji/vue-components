<template>
  <div
    :class="[
      prefix + '-collapse-item',
      prefix + '-horizontal-hairline',
      { active }
    ]"
  >
    <cell
      :class="[prefix + '-collapse-item_header']"
      :label="title"
      :icon="icon"
      :disabled="disabled"
      clickable
      arrow-direction="down"
      @click="onClick"
    />
    <div
      :class="[prefix + '-collapse-item_body', prefix + '-horizontal-hairline']"
      style="display: none"
      ref="body"
    >
      <div :class="[prefix + '-collapse-item_content']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '../Cell'
import { SDKKey } from '../config'
import { iconValidator } from '../helpers/validator'

export default {
  name: SDKKey + '-collapse-item',
  components: { Cell },
  inject: {
    appCollapse: {
      default: null
    }
  },
  props: {
    icon: {
      validator: iconValidator,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,
      active: false
    }
  },
  created() {
    this.appCollapse && this.appCollapse.addChild(this)
  },
  beforeDestroy() {
    this.appCollapse && this.appCollapse.removeChild(this)
  },
  methods: {
    onClick() {
      if (!this.active) {
        this.show()
      } else {
        this.hide()
      }
    },
    show() {
      if (this.active) {
        return
      }
      this.active = true

      clearTimeout(this.visibleTimer)

      const $body = this.$refs.body

      $body.style.cssText = 'position: absolute; opacity: 0;'
      const contentHeight = $body.getBoundingClientRect().height
      $body.style.cssText = 'height: 0px;'

      this.visibleTimer = setTimeout(() => {
        $body.style.cssText = `height: ${contentHeight}px;`

        this.visibleTimer = setTimeout(() => {
          $body.style.cssText = null
        }, 210)
      }, 17)

      this.$emit('toggle', {
        spread: true
      })

      this.appCollapse && this.appCollapse.onChange(this)
    },
    hide() {
      if (!this.active) {
        return
      }
      this.active = false

      clearTimeout(this.visibleTimer)

      const $body = this.$refs.body
      $body.style.cssText = `height: ${$body.getBoundingClientRect().height}px;`

      this.visibleTimer = setTimeout(() => {
        $body.style.cssText = 'height: 0px;'

        this.visibleTimer = setTimeout(() => {
          $body.style.cssText = 'display: none;'
        }, 210)
      }, 17)

      this.$emit('toggle', {
        spread: false
      })

      this.appCollapse && this.appCollapse.onChange(this)
    }
  }
}
</script>
