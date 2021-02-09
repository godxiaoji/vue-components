<template>
  <svg>
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import './lib/load-svg'

export default {
  name: 'fx-svg-icon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>
