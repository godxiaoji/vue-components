<template>
  <div class="fx-collapse-item fx-horizontal-hairline" :class="{ active }">
    <cell
      class="fx-collapse-item_header"
      :label="title"
      :icon="icon"
      :disabled="disabled"
      isLink
      arrow-direction="down"
      @click="onClick"
    />
    <div
      class="fx-collapse-item_body fx-horizontal-hairline"
      style="display: none"
      ref="body"
    >
      <div class="fx-collapse-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '../Cell'
import { iconValidator } from '../helpers/validator'

export default {
  name: 'fx-collapse-item',
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
