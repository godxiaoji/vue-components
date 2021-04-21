<template>
  <canvas ref="canvas" class="fx-qr-code"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import QRCode from 'qrcode'
import Exception from '@/helpers/exception'

export default defineComponent({
  name: 'fx-qr-code',
  props: {
    // 生成二维码的文本
    text: {
      type: String,
      default: '',
      required: true
    },
    // See：https://github.com/soldair/node-qrcode#qr-code-options
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const canvas = ref<HTMLElement>()

    function update() {
      QRCode.toCanvas(
        canvas.value as HTMLElement,
        props.text,
        props.options,
        function(error) {
          if (error) {
            console.error(
              new Exception(error, Exception.TYPE.PARAM_ERROR, 'QrCode')
            )
          }
        }
      )
    }

    watch(() => props.text, update)

    watch(() => props.options, update, {
      deep: true
    })

    onMounted(() => update())

    return {
      canvas
    }
  }
})
</script>
