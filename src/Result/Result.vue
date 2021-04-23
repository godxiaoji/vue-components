<template>
  <div class="fx-result" :class="['type--' + type2]">
    <div class="fx-result_header">
      <icon
        class="fx-result_icon"
        :class="['type--' + type2]"
        :icon="icon"
      ></icon>
      <div class="fx-result_title" v-if="title">{{ title }}</div>
      <div class="fx-result_description" v-if="description">
        {{ description }}
      </div>
    </div>
    <slot></slot>
    <div class="fx-result_footer">
      <fx-button type="primary" @click="onConfirmClick">
        {{ confirmText }}
      </fx-button>
      <fx-button v-if="showBack" type="default" @click="onCancelClick">
        {{ backText }}
      </fx-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Icon from '@/Icon'
import FxButton from '@/Button'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'

type ResultType = 'info' | 'warning' | 'success' | 'fail'

const iconMap = new Map<ResultType, string>([
  ['info', 'InfoCircleFilled'],
  ['warning', 'WarningFilled'],
  ['success', 'CheckCircleFilled'],
  ['fail', 'CloseCircleFilled']
])

const RESULT_TYPES: ResultType[] = ['info', 'warning', 'success', 'fail']

export default defineComponent({
  name: 'fx-result',
  components: { Icon, FxButton },
  props: {
    // 类型
    type: {
      type: String as PropType<ResultType>,
      validator: createEnumsValidator(RESULT_TYPES),
      default: null
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 描述
    description: {
      type: String,
      default: ''
    },
    // 展示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 返回文本文本
    backText: {
      type: String,
      default: '返回'
    },
    // 确认文本
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  emits: ['confirm', 'back'],
  setup(props, { emit }) {
    const type2 = computed(() => getEnumsValue(RESULT_TYPES, props.type))

    const icon = computed(() => iconMap.get(type2.value))

    function onConfirmClick() {
      emit('confirm', {
        type: 'confirm'
      })
    }

    function onCancelClick() {
      emit('back', {
        type: 'back'
      })
    }

    return {
      type2,
      icon,
      onConfirmClick,
      onCancelClick
    }
  }
})
</script>
