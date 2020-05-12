<template>
  <form class="ly-form" @submit.prevent="onSubmit" @reset="onReset">
    <slot></slot>
  </form>
</template>

<script>
import { inArray } from '../../helpers/util'
import { getHandleEvent } from '../../helpers/events'

export default {
  name: 'ly-form',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    onSubmit(e) {
      const inputEls = e.target.elements
      const value = {}
      const uids = []

      inputEls.forEach(el => {
        const _ac = el._app_component
        if (
          _ac &&
          _ac._uid &&
          !inArray(_ac._uid, uids) // 主要用于排重checbox等多选的情况
        ) {
          // 获取配套表单组件
          uids.push(_ac._uid)
          if (_ac.name) {
            value[_ac.name] = _ac.hookFormValue
              ? _ac.hookFormValue()
              : _ac.formValue
          }
        } else {
          // 原生组件
          if (el.name) {
            const { type, name, checked } = el

            if (type === 'checkbox') {
              // 数组类型
              if (!value[name]) {
                value[name] = []
              }

              if (checked) {
                value[name].push(el.value)
              }
            } else if (type === 'radio') {
              if (value[name] == null) {
                value[name] = ''
              }
              // 需要判断checked
              if (checked) {
                value[name] = el.value
              }
            } else if (type === 'select-multiple') {
              // 多项选择，不能直接获取值
              const selectOptions = el.options
              const selectedValues = []
              for (let i = 0; i < selectOptions.length; i++) {
                // 如果该option被选中，则将它的value存入数组
                if (selectOptions[i].selected) {
                  selectedValues.push(selectOptions[i].value)
                }
              }
              value[name] = selectedValues
            } else if (type === 'input' || type === 'select-one' || type === 'hidden') {
              // input
              value[name] = el.value
            }
          }
        }
      })

      this.$emit(
        e.type,
        getHandleEvent(this.$el, e, {
          value
        })
      )

      return false
    },

    onReset(e) {
      const inputEls = e.target.elements
      const value = {}
      const uids = []

      inputEls.forEach(el => {
        const _ac = el._app_component

        if (
          _ac &&
          _ac._uid &&
          !inArray(_ac._uid, uids) // 主要用于排重checbox等多选的情况
        ) {
          // 获取配套表单组件
          uids.push(_ac._uid)

          if (_ac.reset) {
            _ac.reset()
          }
        } else {
          // 原生组件
        }
      })

      this.$emit(
        e.type,
        getHandleEvent(this.$el, e, {
          value
        })
      )
    }
  }
}
</script>
