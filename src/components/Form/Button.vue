<template>
  <button
    class="ly-button"
    :class="[typeClassName, sizeClassName]"
    :disabled="disabled"
    :type="realFormType"
    @click="onClick"
  >
    <icon class="ly-button_loading-icon" v-if="loading" type="loading"></icon>
    <slot>按钮</slot>
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { inArray } from '../../helpers/util'
import { BaseEvent } from '../../helpers/events'

const SIZE_NAMES = ['default', 'mini', 'large']
const TYPE_NAMES = ['default', 'primary', 'warn']
const FORM_TYPE_NAMES = ['button', 'submit', 'reset']

export default {
  name: 'ly-button',
  components: { Icon },
  props: {
    size: {
      type: String,
      default: SIZE_NAMES[0]
    },
    type: {
      type: String,
      default: TYPE_NAMES[0]
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: FORM_TYPE_NAMES[0]
    }
  },
  data() {
    return {}
  },
  computed: {
    // 计算属性的 getter
    typeClassName() {
      return (
        'type--' + (inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0])
      )
    },
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    },
    realFormType() {
      return inArray(this.formType, FORM_TYPE_NAMES)
        ? this.formType
        : FORM_TYPE_NAMES[0]
    }
  },
  ready() {},
  mounted() {
    this.$el._app_type = 'button'
  },
  updated() {},
  attached() {},
  methods: {
    onClick(e) {
      this.$emit(e.type, new BaseEvent(e))
    }
  }
}
</script>

<style>
@import url('../../global.css');

.ly-button {
  --font-color: var(--ly-semi-color);
  --border-color: var(--ly-light-color);
  --background-color: #fff;
  --icon-size: 20px;
  --icon-color: var(--ly-semi-color);

  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 64px;
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 30px;
  border-width: 1px;
  border-style: solid;
  background: none;
}

.ly-button.size--mini {
  min-width: 48px;
  height: 24px;
  padding: 0 8px;
  line-height: 22px;
  font-size: 12px;
  --icon-size: 16px;
}

.ly-button.size--large {
  min-width: 72px;
  height: 40px;
  padding: 0 16px;
  line-height: 38px;
  font-size: 16px;
  --icon-size: 22px;
}

.ly-button:not(:disabled):hover {
  opacity: 0.8;
}

.ly-button:not(:disabled):active {
  opacity: 0.6;
}

.ly-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.ly-button.type--primary {
  --font-color: #fff;
  --border-color: var(--ly-main-color);
  --background-color: var(--ly-main-color);
  --icon-color: #fff;
}

.ly-button.type--warn {
  --font-color: #fff;
  --border-color: var(--ly-warn-color);
  --background-color: var(--ly-warn-color);
  --icon-color: #fff;
}

.ly-button {
  color: var(--font-color);
  background-color: var(--background-color);
  border-color: var(--border-color);
}

.ly-button .ly-button_loading-icon {
  display: inline-block;
  width: 1.429em;
  height: 1.429em;
  line-height: 1;
  margin: -0.2em 0.34em 0 0;
  vertical-align: middle;
  animation: ly-rotate-360 0.8s infinite linear both;
  fill: var(--icon-color);
}
</style>
