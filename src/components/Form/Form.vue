<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <slot></slot>
  </form>
</template>

<script>
import { inArray } from '../../helpers/util'
import { getHandleEvent } from '../../helpers/events'

export default {
  name: 'app-form',
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
