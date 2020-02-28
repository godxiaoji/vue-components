<template>
  <div
    v-show="visibility"
    class="toast"
    :class="{ 'has-icon': image || (icon && icon !== 'none') }"
  >
    <div class="toast-mask" v-show="mask"></div>
    <div class="toast-box">
      <img v-if="image" class="toast-icon" :src="image" />
      <icon
        v-else-if="icon == 'success'"
        class="toast-icon"
        type="success_no_circle"
      ></icon>
      <icon
        v-else-if="icon == 'loading'"
        class="toast-icon loading-icon"
        type="loading"
      ></icon>
      <div class="toast-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
// import './toast'

export default {
  name: 'app-toast',
  components: { Icon },
  props: {
    visibility: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    mask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
  beforeDestroy() {}
}
</script>

<style>
@import url('../../global.css');

.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20px 0 0 -100px;
}

.toast .toast-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.toast .toast-box {
  min-height: 40px;
  padding: 6px 20px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}

.toast .toast-text {
  max-width: 200px;
  line-height: 28px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.toast.has-icon {
  height: 100px;
  width: 100px;
  margin: -50px 0 0 -50px;
}

.toast.has-icon .toast-box {
  padding: 0;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.toast.has-icon .toast-icon {
  width: 48px;
  height: 48px;
  fill: #fff;
}

.toast.has-icon .toast-text {
  margin-top: 10px;
  height: 16px;
  line-height: 16px;
  -webkit-line-clamp: 1;
}

.toast.has-icon .loading-icon {
  animation: app-rotate-360 0.8s infinite linear both;
}
</style>
