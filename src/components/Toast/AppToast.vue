<template>
  <div
    v-show="isShow"
    class="toast"
    :class="{ 'has-icon': image, loading: isLoading }"
  >
    <div class="toast-mask" v-show="isShowMask"></div>
    <div class="toast-box">
      <img v-if="image" class="toast-icon" :src="image" />
      <div class="toast-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-toast',
  data() {
    return {
      isShow: false,
      image: '',
      title: '',
      isShowMask: false,
      isLoading: false
    }
  },
  methods: {
    show(options) {
      this.title = options.title
      this.image = options.image
      this.isShowMask = options.isShowMask
      this.isLoading = options.isLoading
      this.isShow = true

      // 定时隐藏
      if (options.duration > 0) {
        this.timer = setTimeout(() => {
          this.hide()
        }, options.duration)
      }

      return Promise.resolve()
    },

    hide() {
      clearTimeout(this.timer)

      this.isShow = false
      this.image = ''
      this.title = ''
      this.isShowMask = false
      this.isLoading = false

      return Promise.resolve()
    }
  },
  created() {
    this.timer = null

    window._toastFns = {
      show: options => {
        this.show(options)
      },

      hide: () => {
        this.hide()
      }
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  z-index: var(--default-z-index);
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
}

.toast.has-icon .toast-text {
  margin-top: 10px;
  height: 16px;
  line-height: 16px;
  -webkit-line-clamp: 1;
}

.toast.has-icon.loading .toast-icon {
  animation: app-rotate-360 0.8s infinite linear both;
}
</style>
