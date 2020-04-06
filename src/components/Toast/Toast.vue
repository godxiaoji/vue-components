<template>
  <div
    v-show="visibility"
    class="ly-toast"
    :class="{ 'has--icon': image || (icon && icon !== 'none') }"
  >
    <div class="ly-toast_mask" v-show="mask"></div>
    <div class="ly-toast_box">
      <img v-if="image" class="ly-toast_icon" :src="image" />
      <icon
        v-else-if="icon == 'success'"
        class="ly-toast_icon"
        type="success_no_circle"
      ></icon>
      <icon
        v-else-if="icon == 'loading'"
        class="ly-toast_icon loading-icon"
        type="loading"
      ></icon>
      <div class="ly-toast_text">
        <slot>{{ title }}</slot>
      </div>
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
  mounted() {},
  beforeDestroy() {}
}
</script>

<style>
@import url('../../global.css');

.ly-toast {
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

.ly-toast_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.ly-toast_box {
  min-height: 40px;
  padding: 6px 20px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}

.ly-toast_text {
  max-width: 200px;
  line-height: 28px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ly-toast.has--icon {
  height: 100px;
  width: 100px;
  margin: -50px 0 0 -50px;
}

.ly-toast.has--icon .ly-toast_box {
  padding: 0;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ly-toast.has--icon .ly-toast_icon {
  width: 48px;
  height: 48px;
  fill: #fff;
}

.ly-toast.has--icon .ly-toast_text {
  margin-top: 10px;
  height: 16px;
  line-height: 16px;
  -webkit-line-clamp: 1;
}

.ly-toast.has--icon .loading-icon {
  animation: ly-rotate-360 0.8s infinite linear both;
}
</style>
