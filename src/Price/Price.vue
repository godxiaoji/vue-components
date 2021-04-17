<template>
  <div class="fx-price">
    <slot></slot>
    <span class="fx-price_symbol" v-if="symbol">{{ symbol }}</span>
    <span class="fx-price_integer">{{ priceStr.split('.')[0] }}</span>
    <span class="fx-price_decimal" v-if="decimalDigits > 0"
      >.{{ priceStr.split('.')[1] }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { isNumeric, thousands } from '@/helpers/util'

export default defineComponent({
  name: 'fx-price',
  props: {
    // 金额
    price: {
      type: [Number, String],
      validator: isNumeric,
      default: 0,
      required: true
    },
    // 货币符号
    symbol: {
      type: String,
      default: null
    },
    // 是否千分位展示
    thousands: {
      type: Boolean,
      default: false
    },
    // 小数位数
    decimalDigits: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const priceStr = computed(() => {
      let priceStr = Number(0).toFixed(props.decimalDigits)

      if (isNumeric(props.price)) {
        priceStr = parseFloat(props.price as string).toFixed(
          props.decimalDigits
        )
      }

      if (props.thousands) {
        priceStr = thousands(priceStr)
      }

      return priceStr
    })

    return {
      priceStr
    }
  }
})
</script>
