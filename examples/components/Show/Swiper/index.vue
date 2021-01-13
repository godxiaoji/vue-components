<template>
  <div>
    <fx-group title="基础用法">
      <fx-swiper class="swiper-box" :activeIndex.sync="activeIndex">
        <fx-swiper-item v-for="(item, index) in swiperList" :key="item">
          <div class="swiper-box-item" :class="{ even: index % 2 == 1 }">
            {{ item }}
          </div>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="显示面板指示点 indicator-dots=true">
      <fx-swiper class="swiper-box" indicator-dots>
        <fx-swiper-item v-for="url in imageUrls" :key="url">
          <fx-image class="swiper-image" :src="url"></fx-image>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="显示切换按钮 navigation-buttons=true">
      <fx-swiper class="swiper-box" navigation-buttons>
        <fx-swiper-item v-for="url in imageUrls" :key="url">
          <fx-image class="swiper-image" :src="url"></fx-image>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="循环展示 initial-circular=true">
      <fx-swiper class="swiper-box" indicator-dots initial-circular>
        <fx-swiper-item v-for="(item, index) in swiperList" :key="item">
          <div class="swiper-box-item" :class="{ even: index % 2 == 1 }">
            {{ item }}
          </div>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="垂直方向 initial-vertical=true">
      <fx-swiper class="swiper-box" indicator-dots initial-vertical>
        <fx-swiper-item v-for="(item, index) in swiperList" :key="item">
          <div class="swiper-box-item" :class="{ even: index % 2 == 1 }">
            {{ item }}
          </div>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="更改指示点颜色">
      <fx-swiper
        class="swiper-box"
        indicator-dots
        indicator-color="rgba(255, 255, 255, 0.5)"
        indicator-active-color="#ff4d4f"
      >
        <fx-swiper-item v-for="(item, index) in swiperList" :key="item">
          <div class="swiper-box-item" :class="{ even: index % 2 == 1 }">
            {{ item }}
          </div>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="自动轮播（切换时长设置为3000ms）">
      <fx-swiper
        class="swiper-box"
        indicator-dots
        :autoplay="autoplay"
        :interval="3000"
      >
        <fx-swiper-item v-for="url in imageUrls" :key="url">
          <fx-image class="swiper-image" :src="url"></fx-image>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="滑动过程时长（设置为2000ms）">
      <fx-swiper class="swiper-box" indicator-dots :duration="2000">
        <fx-swiper-item v-for="url in imageUrls" :key="url">
          <fx-image class="swiper-image" :src="url"></fx-image>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
    <fx-group title="事件监听（change/animated/click）">
      <fx-swiper
        class="swiper-box"
        indicator-dots
        @change="onChange"
        @animated="onAnimated"
        @click="onClick"
      >
        <fx-swiper-item v-for="(item, index) in swiperList" :key="item">
          <div class="swiper-box-item" :class="{ even: index % 2 == 1 }">
            {{ item }}
          </div>
        </fx-swiper-item>
      </fx-swiper>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {},
  data() {
    return {
      swiperList: [1, 2, 3, 4],
      imageUrls: [
        'https://cdn.fox2.cn/vfox/swiper/regular-1.jpg',
        'https://cdn.fox2.cn/vfox/swiper/regular-2.jpg',
        'https://cdn.fox2.cn/vfox/swiper/regular-3.jpg'
      ],
      activeIndex: 0,
      autoplay: true
    }
  },
  methods: {
    onChange({ activeIndex }) {
      this.$showToast(`change 到第 ${activeIndex + 1} 张`)
      console.log(`change 事件触发`, activeIndex)
    },
    onClick() {
      this.$showToast(`click 触发`)
    },
    onAnimated({ activeIndex }) {
      this.$showToast(`第 ${activeIndex + 1} 张 animated`)
      console.log(`animated 事件触发`, activeIndex)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.swiper {
  &-box {
    height: 250px;

    &-item {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 72px;
      color: #fff;
      background-color: $primary-color;

      &.even {
        background-color: $primary-border-color;
      }
    }
  }

  &-image {
    width: 100%;
    height: 250px;
  }
}
</style>
