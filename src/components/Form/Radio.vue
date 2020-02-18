<template>
  <label class="radio" :disabled="disabled">
    <input
      class="radio-input"
      type="radio"
      :name="groupName"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />
    <div class="radio-box">
      <icon class="radio-icon" type="radio"></icon>
      <icon class="radio-checked-icon" type="radio_checked"></icon>
    </div>
    <span class="radio-text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Icon from '../Icon/Icon.vue'

export default {
  name: 'app-radio',
  components: { Icon },
  props: {
    value: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    /* 只接受来自分组的name */
    groupName() {
      if (this.$parent && this.$parent.name) {
        return this.$parent.name
      }
      return ''
    }
  },
  model: {
    prop: 'checked',
    event: '_change'
  },
  watch: {
    checked() {
      const inputEl = this.getInputEl()
      const checked = this.checked

      if (checked !== inputEl.checked) {
        inputEl.checked = checked ? true : false

        this.callParent({
          target: inputEl
        })
      }
    }
  },
  created() {
    this._radio_item = true
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()
    const checked = this.checked

    if (checked != inputEl.checked) {
      inputEl.checked = checked ? true : false
    }

    if (this.isGroupParent()) {
      inputEl._app_component = this.$parent

      if (inputEl.checked) {
        this.$parent.updateValue(inputEl)
      }
    }
  },
  updated() {},
  attached() {},
  methods: {
    isGroupParent() {
      return this.$parent && this.$parent._radio_group
    },
    onChange(e) {
      this.modelChange()

      this.callParent(e)
    },
    /**
     * v-modal checked 的值跟input对齐
     */
    modelChange() {
      const inputChecked = this.getInputChecked()
      const checked = this.checked ? true : false

      if (checked !== inputChecked) {
        this.$emit('_change', inputChecked)
      }
    },
    getInputEl() {
      return this.$el && this.$el.firstElementChild
    },
    getInputChecked() {
      return this.getInputEl().checked
    },
    callParent(e) {
      if (this.isGroupParent()) {
        this.$parent.onChange(e)
      }
    },
    reset() {
      const inputEl = this.getInputEl()

      if (inputEl.checked !== false) {
        inputEl.checked = false
        this.modelChange()

        this.callParent({
          target: inputEl
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('../../global.css');

.radio {
  --color: var(--app-main-color);

  display: inline-flex;
  align-items: center;
  font-size: 14px;
  height: 1.715em;
  color: var(--app-semi-color);
  padding: 0 4px;
  text-align: left;
}

.radio-box {
  display: inline-flex;
  width: 1.429em;
  height: 1.429em;
  box-sizing: border-box;
  margin-right: 0.34em;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.radio-icon {
  width: 100%;
  height: 100%;
}

.radio-checked-icon {
  display: none;
  width: 100%;
  height: 100%;
  fill: var(--color);
}

.radio-input:not([disabled]):checked + .radio-box .radio-icon {
  display: none;
}

.radio-input:not([disabled]):checked + .radio-box .radio-checked-icon {
  display: block;
}

.radio-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.radio-text {
  display: block;
  line-height: 1;
}

.radio[disabled] {
  opacity: 0.3;
}
</style>
