<template>
  <div>
    <fx-group title="基础用法">
      <!-- <div class="scroll-tab-header">占位头部</div> -->
      <fx-scroll-tab
        class="scroll-tab-boxs"
        :stickyOffsetTop="offsetTop"
        :stickyOffsetBottom="offsetBottom"
        @change="onChange"
      >
        <fx-scroll-tab-item name="Dust Red">
          <div class="scroll-tab-box box-1"></div>
        </fx-scroll-tab-item>
        <fx-scroll-tab-item name="Volcano">
          <div class="scroll-tab-box box-2"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Sunset Orange">
          <div class="scroll-tab-box box-3"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Calendula Gold">
          <div class="scroll-tab-box box-4"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Sunrise Yellow">
          <div class="scroll-tab-box box-5"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Lime">
          <div class="scroll-tab-box box-6"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Polar Green">
          <div class="scroll-tab-box box-7"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Cyan">
          <div class="scroll-tab-box box-8"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Daybreak Blue">
          <div class="scroll-tab-box box-9"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Geek Blue">
          <div class="scroll-tab-box box-10"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Golden Purple">
          <div class="scroll-tab-box box-11"></div
        ></fx-scroll-tab-item>
        <fx-scroll-tab-item name="Magenta">
          <div class="scroll-tab-box box-12"></div
        ></fx-scroll-tab-item>
      </fx-scroll-tab>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'ScrollTab',
  data() {
    return {
      offsetTop: 52,
      offsetBottom: 12
    }
  },
  methods: {
    onChange(res) {
      console.log('change', res)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.scroll-tab {
  &-header {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: $title-color;
  }

  &-boxs {
    // min-height: 500px;
  }

  &-box {
    height: 1000px;

    &.box-1 {
      background: #ff4d4f;
      background-image: linear-gradient(0, #ff4d4f 0%, #5c0011 100%);
    }

    &.box-2 {
      background: #ff7a45;
      background-image: linear-gradient(0, #ff7a45 0%, #610b00 100%);
    }

    &.box-3 {
      background: #ffa940;
      background-image: linear-gradient(0, #ffa940 0%, #612500 100%);
    }

    &.box-4 {
      background: #ffc53d;
      background-image: linear-gradient(0, #ffc53d 0%, #613400 100%);
    }

    &.box-5 {
      background: #ffec3d;
      background-image: linear-gradient(0, #ffec3d 0%, #614700 100%);
    }

    &.box-6 {
      background: #bae637;
      background-image: linear-gradient(0, #bae637 0%, #254000 100%);
    }

    &.box-7 {
      background: #73d13d;
      background-image: linear-gradient(0, #73d13d 0%, #092b00 100%);
    }

    &.box-8 {
      background: #36cfc9;
      background-image: linear-gradient(0, #36cfc9 0%, #002329 100%);
    }

    &.box-9 {
      background: #40a9ff;
      background-image: linear-gradient(0, #40a9ff 0%, #002766 100%);
    }

    &.box-10 {
      background: #597ef7;
      background-image: linear-gradient(0, #597ef7 0%, #030852 100%);
    }

    &.box-11 {
      background: #9254de;
      background-image: linear-gradient(0, #9254de 0%, #120338 100%);
    }

    &.box-12 {
      background: #f759ab;
      background-image: linear-gradient(0, #f759ab 0%, #520339 100%);
    }
  }
}
</style>
